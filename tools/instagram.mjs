// Robô do Instagram
// Busca as publicações mais recentes da barraca direto no Instagram (API oficial da Meta) e guarda
// as fotos dentro do próprio site (pasta img/insta e arquivo insta.json). A faixa "Quem vem, volta"
// mostra essas fotos, que passam a ser arquivos do site.
//
// É opcional. Roda sozinho no GitHub (arquivo .github/workflows/instagram.yml) e só faz alguma coisa
// se existir a chave de acesso da conta, guardada no cofre de segredos do repositório com o nome IG_TOKEN.
// A chave nunca é escrita em arquivo do site nem aparece nos registros. Duas vezes por semana o robô
// renova a chave no Instagram, para ela não vencer. Sem a chave, ele tira as fotos do Instagram que
// estiverem guardadas e a faixa volta a mostrar as fotos do site: apagar o segredo é o jeito de desligar.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const RAIZ = process.cwd();
const PASTA = 'img/insta';              // onde as fotos ficam
const ARQUIVO = 'insta.json';           // lista que a página inicial lê
const COFRE = 'tools/instagram.cofre';  // chave renovada, embaralhada (só abre com o segredo IG_TOKEN)
const MAXIMO = 12;                      // quantas publicações mostrar
const LIMITE = 8 * 1024 * 1024;         // tamanho máximo de cada foto (8 MB)
const TIPOS = { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' };
const CAMPOS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,children{media_type,media_url,thumbnail_url}';

const aviso = (t) => console.log(process.env.GITHUB_ACTIONS ? `::warning::${t}` : `AVISO: ${t}`);
const espera = (ms) => new Promise((ok) => setTimeout(ok, ms));
const texto = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);

// só endereços https (o 127.0.0.1 existe apenas para o teste no computador)
function enderecoBom(u) {
  try {
    const x = new URL(u);
    return x.protocol === 'https:' || (x.protocol === 'http:' && (x.hostname === '127.0.0.1' || x.hostname === 'localhost'));
  } catch { return false; }
}
function local(u) { try { const x = new URL(u); return x.hostname === '127.0.0.1' || x.hostname === 'localhost'; } catch { return false; } }
const API = local(process.env.IG_API || '') ? process.env.IG_API.replace(/\/$/, '') : 'https://graph.instagram.com';

// ---------- cofre: a chave renovada fica embaralhada com AES-256; a senha é o próprio segredo IG_TOKEN
const forca = { N: 32768, r: 8, p: 1, maxmem: 96 * 1024 * 1024 };
function fecha(obj, senha) {
  const sal = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', crypto.scryptSync(senha, sal, 32, forca), iv);
  const dados = Buffer.concat([c.update(JSON.stringify(obj), 'utf8'), c.final()]);
  return JSON.stringify({ v: 1, sal: sal.toString('base64'), iv: iv.toString('base64'), selo: c.getAuthTag().toString('base64'), dados: dados.toString('base64') }) + '\n';
}
function abre(txt, senha) {
  const o = JSON.parse(txt);
  const d = crypto.createDecipheriv('aes-256-gcm', crypto.scryptSync(senha, Buffer.from(o.sal, 'base64'), 32, forca), Buffer.from(o.iv, 'base64'));
  d.setAuthTag(Buffer.from(o.selo, 'base64'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(o.dados, 'base64')), d.final()]).toString('utf8'));
}

// ---------- pedidos
async function pega(url, ms) {             // para fotos e feeds comuns
  let erro;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(ms), redirect: 'follow', headers: { 'user-agent': 'cumbucobeach-site' } });
      if (!r.ok) throw new Error('resposta ' + r.status);
      return r;
    } catch (e) { erro = new Error(e.message && e.message.startsWith('resposta') ? e.message : 'sem resposta'); await espera(1500 * (i + 1)); }
  }
  throw erro;
}
// pedido à API do Instagram: o endereço leva a chave, então nunca é mostrado
async function api(caminho, params) {
  const u = new URL(API + caminho);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  let erro;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(20000) });
      let j = null; try { j = await r.json(); } catch { /* resposta sem JSON */ }
      if (r.ok && j && !j.error) return { ok: true, j };
      if (r.status >= 400 && r.status < 500) return { ok: false, codigo: Number(j && j.error && j.error.code) || r.status };
      erro = new Error('resposta ' + r.status);
    } catch { erro = new Error('sem resposta'); }
    await espera(1500 * (i + 1));
  }
  throw erro;
}

// ---------- leitura das publicações (formato da API do Instagram e formato de feed com "posts")
function lerFeed(j) {
  const lista = Array.isArray(j) ? j : (j && (j.posts || j.data)) || [];
  const vistos = new Set();
  const saida = [];
  for (const p of lista) {
    if (!p || typeof p !== 'object') continue;
    const id = String(p.id ?? '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
    if (!id || vistos.has(id)) continue;
    const tipo = p.mediaType || p.media_type;
    const filhos = Array.isArray(p.children) ? p.children : (p.children && Array.isArray(p.children.data) ? p.children.data : []);
    const s = p.sizes || (filhos[0] && filhos[0].sizes) || {};
    const tam = s.large || s.medium || s.full || s.small || {};
    let foto = tam.mediaUrl;
    if (!foto && tipo === 'VIDEO') foto = p.thumbnailUrl || p.thumbnail_url;
    if (!foto && tipo === 'CAROUSEL_ALBUM') {            // álbum: a primeira foto; se começar com vídeo, a capa dele
      const f = filhos.find((x) => x && (x.media_type || x.mediaType) === 'IMAGE' && (x.media_url || x.mediaUrl));
      const v = filhos.find((x) => x && (x.thumbnail_url || x.thumbnailUrl));
      foto = (f && (f.media_url || f.mediaUrl)) || (v && (v.thumbnail_url || v.thumbnailUrl));
    }
    if (!foto && tipo !== 'VIDEO') foto = p.mediaUrl || p.media_url;
    if (!foto || !enderecoBom(foto)) continue;
    const link = String(p.permalink || '');
    vistos.add(id);
    saida.push({
      id, foto,
      link: /^https:\/\/(www\.)?instagram\.com\//.test(link) ? link : '',
      legenda: texto(p.altText || p.prunedCaption || p.caption, 180),
      data: texto(p.timestamp, 40),
      tipo: tipo === 'VIDEO' ? 'video' : tipo === 'CAROUSEL_ALBUM' ? 'album' : 'foto',
    });
    if (saida.length >= MAXIMO) break;
  }
  return saida;
}

function jaGuardada(id) {
  for (const ext of Object.values(TIPOS)) {
    const a = `${PASTA}/${id}.${ext}`;
    try { if (fs.statSync(path.join(RAIZ, a)).size > 0) return a; } catch { /* não existe */ }
  }
  return '';
}
async function baixa(p) {
  const tem = jaGuardada(p.id);
  if (tem) return tem;                                   // a foto de uma publicação não muda: não baixa de novo
  const r = await pega(p.foto, 30000);
  const ext = TIPOS[String(r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()];
  if (!ext) throw new Error('não é uma imagem aceita');
  const dados = Buffer.from(await r.arrayBuffer());
  if (!dados.length || dados.length > LIMITE) throw new Error('tamanho fora do esperado');
  const a = `${PASTA}/${p.id}.${ext}`;
  fs.mkdirSync(path.join(RAIZ, PASTA), { recursive: true });
  fs.writeFileSync(path.join(RAIZ, a), dados);
  return a;
}

// ---------- caminho oficial: chave da conta guardada no segredo IG_TOKEN
function horaDeRenovar() {
  if (process.env.IG_RENOVAR === '1') return true;
  if (process.env.IG_RENOVAR === '0') return false;
  const d = new Date();                                  // segunda e quinta, na primeira rodada do dia
  return (d.getUTCDay() === 1 || d.getUTCDay() === 4) && d.getUTCHours() < 6;
}
async function doInstagram(segredo) {
  const cofre = path.join(RAIZ, COFRE);
  let guardada = '';
  try { guardada = String(abre(fs.readFileSync(cofre, 'utf8'), segredo).chave || ''); } catch { /* sem cofre, ou cofre de outra chave */ }
  let chave = guardada || segredo;
  const pedido = (c) => api('/me/media', { fields: CAMPOS, limit: String(MAXIMO), access_token: c });
  let r = await pedido(chave);
  if (!r.ok && guardada && guardada !== segredo) {       // a chave renovada não vale mais: volta para a do segredo
    r = await pedido(segredo);
    if (r.ok) { chave = segredo; guardada = ''; try { fs.unlinkSync(cofre); } catch { /* já não existia */ } }
  }
  if (!r.ok) {
    aviso(r.codigo === 190
      ? 'A chave do Instagram venceu ou foi cancelada. Gere outra no painel da Meta e troque o segredo IG_TOKEN. As fotos atuais ficam como estão.'
      : `O Instagram recusou o pedido (código ${r.codigo}). As fotos atuais ficam como estão.`);
    return null;
  }
  if (horaDeRenovar()) {
    try {
      const n = await api('/refresh_access_token', { grant_type: 'ig_refresh_token', access_token: chave });
      const nova = n.ok ? String(n.j.access_token || '') : '';
      if (!nova) aviso('Não consegui renovar a chave agora. Tento de novo na próxima vez.');
      else {
        if (nova === segredo) { try { fs.unlinkSync(cofre); } catch { /* nada a apagar */ } }
        else if (nova !== guardada) { fs.mkdirSync(path.dirname(cofre), { recursive: true }); fs.writeFileSync(cofre, fecha({ chave: nova, em: new Date().toISOString() }, segredo)); }
        console.log(`Chave renovada: vale por mais ${Math.round((Number(n.j.expires_in) || 0) / 86400)} dias.`);
      }
    } catch { aviso('Não consegui renovar a chave agora. Tento de novo na próxima vez.'); }
  }
  return r.j;
}

// sem chave: tira as fotos do Instagram guardadas, e a faixa do site volta a mostrar as fotos dele
function limpa() {
  let tinha = false;
  try {
    const a = JSON.parse(fs.readFileSync(path.join(RAIZ, ARQUIVO), 'utf8'));
    if (a && Array.isArray(a.fotos) && a.fotos.length) {
      fs.writeFileSync(path.join(RAIZ, ARQUIVO), JSON.stringify({ atualizado: null, perfil: texto(a.perfil, 60), fotos: [] }, null, 2) + '\n');
      tinha = true;
    }
  } catch { /* sem lista */ }
  try {
    for (const arq of fs.readdirSync(path.join(RAIZ, PASTA))) {
      if (/^[A-Za-z0-9_-]+\.(webp|jpg|png)$/.test(arq)) { fs.unlinkSync(path.join(RAIZ, PASTA, arq)); tinha = true; }
    }
  } catch { /* sem pasta */ }
  try { fs.unlinkSync(path.join(RAIZ, COFRE)); tinha = true; } catch { /* sem cofre */ }
  console.log(tinha
    ? 'Sem a chave do Instagram (segredo IG_TOKEN): tirei as fotos guardadas e a faixa volta às fotos do site.'
    : 'Sem a chave do Instagram (segredo IG_TOKEN): nada a fazer. A faixa segue com as fotos do site.');
}

async function principal() {
  const segredo = String(process.env.IG_TOKEN || '').trim();
  let j, nome = '';
  if (segredo) {
    try { j = await doInstagram(segredo); } catch (e) { aviso(`Não consegui falar com o Instagram agora (${e.message}). As fotos atuais ficam como estão.`); return; }
    if (!j) return;
  } else {
    const feed = String(process.env.INSTA_FEED || '').trim();      // só para teste no computador
    if (!feed) { limpa(); return; }
    if (!enderecoBom(feed)) { aviso('O endereço do feed precisa começar com https://'); return; }
    try { j = await (await pega(feed, 20000)).json(); } catch (e) { aviso(`Não consegui ler o feed agora (${e.message}). As fotos atuais ficam como estão.`); return; }
  }
  const posts = lerFeed(j);
  nome = texto((j && j.username) || (j && Array.isArray(j.data) && j.data[0] && j.data[0].username), 60);
  if (!posts.length) { aviso('Não veio nenhuma publicação. As fotos atuais ficam como estão.'); return; }

  const fotos = [];
  for (const p of posts) {
    try {
      const arquivo = await baixa(p);
      fotos.push({ id: p.id, arquivo, link: p.link, legenda: p.legenda, data: p.data, tipo: p.tipo });
    } catch (e) { aviso(`Pulei a publicação ${p.id}: ${e.message}`); }
  }
  if (!fotos.length) { aviso('Nenhuma foto pôde ser baixada. As fotos atuais ficam como estão.'); return; }

  let antes = null;
  try { antes = JSON.parse(fs.readFileSync(path.join(RAIZ, ARQUIVO), 'utf8')); } catch { /* primeira vez */ }
  if (antes && JSON.stringify(antes.fotos || []) === JSON.stringify(fotos)) { console.log(`Nada novo: ${fotos.length} fotos, as mesmas de antes.`); return; }

  const perfil = nome || texto(antes && antes.perfil, 60);
  fs.writeFileSync(path.join(RAIZ, ARQUIVO), JSON.stringify({ atualizado: new Date().toISOString(), perfil, fotos }, null, 2) + '\n');

  // tira da pasta as fotos que saíram da lista (só mexe nos arquivos que o próprio robô cria)
  const usados = new Set(fotos.map((f) => path.basename(f.arquivo)));
  for (const arq of fs.readdirSync(path.join(RAIZ, PASTA))) {
    if (/^[A-Za-z0-9_-]+\.(webp|jpg|png)$/.test(arq) && !usados.has(arq)) fs.unlinkSync(path.join(RAIZ, PASTA, arq));
  }
  console.log(`Fotos atualizadas: ${fotos.length}.`);
}

principal().catch(() => { aviso('Erro inesperado no robô. As fotos atuais ficam como estão.'); });
