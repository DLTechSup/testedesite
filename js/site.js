/* Cumbuco Beach: dados e funções usados pelas três páginas (início, reservas, configurações) */
var CB=(function(){
var WA='5585981777390';
var I=function(n){return 'img/'+n+'.jpg'};
var SEMFOTO=I('sem-foto'); /* cartão com a logo, para item sem foto */
var HORAS=['9h','10h','11h','12h','13h','14h','14h30'];
var MIN={'9h':540,'10h':600,'11h':660,'12h':720,'13h':780,'14h':840,'14h30':870};

/* conteúdo padrão: vale até o administrador mudar na página de configurações */
var DEF={
  v:1,
  nome:'Cumbuco Beach',
  hero:[I('tenda-laranja'),I('casal-coco'),I('peixe-camarao')],
  faixa:['Música','Sol','Mar','Comida boa','Alegria','Pé na areia','Cerveja gelada','Água de coco','Peixada','Sombra boa','Brisa do mar','Família','Amigos','Camarão crocante','Caipirinha'],
  tipos:[
    {id:'Área',titulo:'Áreas: pé na areia',desc:'Para quem quer sentir a praia de perto: mesa na areia, brisa e o barulho do mar.',qtd:4,fotos:[I('casal-coco'),I('coco-praia')]},
    {id:'Tenda',titulo:'Tendas: seu canto com sombra',desc:'Privacidade, sombra e vista para o mar. A escolha de quem quer ficar a tarde inteira.',qtd:3,fotos:[I('tenda-azul'),I('tenda-laranja')]},
    {id:'Salão',titulo:'Salões: conforto o dia todo',desc:'Mesas cobertas, boas para grupos, famílias e quem prefere ficar à vontade.',qtd:3,fotos:[I('moca-palapa'),I('entrada-menino')]}
  ],
  espacos:{},
  cardapio:{
    coz:[
      {nome:'Peixada',comp:'Peixe, batata, cenoura, ovo cozido, pimentão, pirão, arroz',foto:I('peixada')},
      {nome:'Peixe à delícia',comp:'Filé de peixe, molho cremoso, queijo gratinado, arroz',foto:I('peixe-delicia')},
      {nome:'Peixe com camarão',comp:'Peixe frito inteiro, camarões, salada, limão',foto:I('peixe-camarao')},
      {nome:'Peixe frito com fritas',comp:'Peixe frito, camarões, batata frita, arroz',foto:I('peixe-frito')},
      {nome:'Camarão crocante',comp:'Camarões empanados, batata palha',foto:I('camarao-crocante')},
      {nome:'Carne com farofa',comp:'Carne em cubos, farofa, batata frita, salada',foto:I('carne-farofa')}
    ],
    dri:[
      {nome:'Gin tônica',comp:'Gin, água tônica, limão, gelo',foto:I('gin-tonica')},
      {nome:'Caipirinha',comp:'Cachaça, limão, açúcar, gelo',foto:I('caipirinha')},
      {nome:'Drink tropical',comp:'',foto:I('drink-sunset')},
      {nome:'Cervejas geladas',comp:'Skol, Brahma, Budweiser, Petra, Original',foto:I('cervejas')},
      {nome:'Cerveja com bolinhos',comp:'Cerveja gelada, porção de bolinhos',foto:I('skol-bolinhos')},
      {nome:'Água de coco',comp:'Coco verde gelado',foto:I('coco-praia')}
    ]
  },
  galeria:['tenda-laranja','coco-praia','peixe-frito','gin-tonica','entrada-menino','peixada','casal-coco','skol-bolinhos','tenda-azul','caipirinha','camarao-crocante','drink-sunset','entrada-menina','cervejas'].map(I),
  /* Instagram automático (opcional). Com on:true, se o robô do GitHub (tools/instagram.mjs) tiver guardado fotos em insta.json e img/insta,
     a faixa "Quem vem, volta" mostra essas fotos; sem elas, mostra as fotos do site. on:false deixa sempre as fotos do site. */
  insta:{on:true},
  aviso:{on:false,texto:''},
  eventos:[],
  bloqueios:[]
};
function clone(o){return JSON.parse(JSON.stringify(o))}
function merge(s){
  var c=merge0(s);ATUAL=c;return c;
}
function merge0(s){
  var c=clone(DEF); if(!s||typeof s!=='object')return c;
  ['nome','hero','faixa','tipos','espacos','galeria','eventos','bloqueios'].forEach(function(k){if(s[k]!=null)c[k]=s[k]});
  if(s.cardapio){c.cardapio.coz=s.cardapio.coz||c.cardapio.coz;c.cardapio.dri=s.cardapio.dri||c.cardapio.dri}
  if(s.insta&&s.insta.on===false)c.insta.on=false;
  if(s.aviso){c.aviso.on=!!s.aviso.on;c.aviso.texto=s.aviso.texto||''}
  return c;
}

/* ---------- nuvem (Supabase), opcional ----------
   O site funciona inteiro sem ela: as fotos padrão são arquivos da pasta img/ e a reserva vai pelo WhatsApp.
   Preenchida, o conteúdo das configurações passa a vir do Supabase para todos os visitantes.
   Se o Supabase estiver pausado, lento ou fora do ar, o site NÃO para: usa a última cópia guardada
   neste aparelho e, se não houver, o conteúdo padrão deste arquivo. Foto que não carregar é trocada
   pela foto padrão do mesmo lugar. */
var NUVEM={
  url:'',               // https://SEU-PROJETO.supabase.co
  chave:'',             // chave pública (anon)
  tabela:'site_config', // tabela com uma linha: id (texto) e dados (jsonb)
  coluna:'dados', id:'principal',
  espera:2500,          // tempo máximo de espera, em milissegundos
  gravar:null,          // function(cfg){...} do painel com login: grava as configurações na nuvem
  reserva:null          // function(reserva){...}: registra a reserva na nuvem (o WhatsApp abre antes, sempre)
};
var estado='local';     // de onde veio o conteúdo: local, nuvem, copia ou padrao
function ligada(){return !!(NUVEM.url&&NUVEM.chave&&window.fetch)}
function prazo(p,ms){return new Promise(function(res,rej){var t=setTimeout(function(){rej(new Error('demorou'))},ms);p.then(function(v){clearTimeout(t);res(v)},function(e){clearTimeout(t);rej(e)})})}
function nuvemLer(){
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort()},NUVEM.espera+500);
  return fetch(NUVEM.url.replace(/\/+$/,'')+'/rest/v1/'+NUVEM.tabela+'?id=eq.'+encodeURIComponent(NUVEM.id)+'&select='+NUVEM.coluna,
    {headers:{apikey:NUVEM.chave,Authorization:'Bearer '+NUVEM.chave},signal:ctl?ctl.signal:undefined})
    .then(function(r){if(!r.ok)throw new Error('sem resposta');return r.json()})
    .then(function(l){clearTimeout(t);var c=l&&l[0]&&l[0][NUVEM.coluna];if(!c||typeof c!=='object')throw new Error('vazio');return c});
}

/* armazenamento neste aparelho (IndexedDB, com reserva em localStorage): é também a cópia de segurança da nuvem */
function idb(){return new Promise(function(res,rej){try{var r=indexedDB.open('cumbucobeach',1);r.onupgradeneeded=function(){r.result.createObjectStore('kv')};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}}catch(e){rej(e)}})}
function get(){return idb().then(function(db){return new Promise(function(res,rej){var q=db.transaction('kv').objectStore('kv').get('cfg');q.onsuccess=function(){res(q.result||null)};q.onerror=function(){rej(q.error)}})}).catch(function(){try{return JSON.parse(localStorage.getItem('cb_cfg')||'null')}catch(e){return null}})}
function put(c){return idb().then(function(db){return new Promise(function(res,rej){var t=db.transaction('kv','readwrite');t.objectStore('kv').put(c,'cfg');t.oncomplete=function(){res(true)};t.onerror=function(){rej(t.error)}})}).catch(function(){localStorage.setItem('cb_cfg',JSON.stringify(c));return true})}
function load(){
  if(!ligada())return get().then(function(c){estado='local';return merge(c)});
  var rem=nuvemLer().then(function(c){put(c).catch(function(){});return c});
  rem.catch(function(){});
  return get().then(function(c){
    /* com cópia no aparelho espera pouco pela nuvem; sem cópia espera o tempo cheio antes de usar o padrão */
    return prazo(rem,c?1500:NUVEM.espera).then(function(r){estado='nuvem';return r},function(){estado=c?'copia':'padrao';return c});
  }).then(merge);
}
function save(c){
  return put(c).then(function(){return typeof NUVEM.gravar==='function'?NUVEM.gravar(c):true});
}
/* registra a reserva na nuvem sem nunca atrapalhar o envio pelo WhatsApp */
function registrar(v){
  if(typeof NUVEM.reserva!=='function')return;
  try{var p=NUVEM.reserva(v);if(p&&p.catch)p.catch(function(){})}catch(e){}
}

/* foto que não carrega (Supabase pausado, link quebrado) é trocada pela foto padrão do mesmo lugar */
var ATUAL=null;
function reservaDe(src){
  var c=ATUAL,g=DEF.galeria,i,j,k,t,d;
  if(c){
    if((i=c.hero.indexOf(src))>=0)return DEF.hero[i%DEF.hero.length];
    for(i=0;i<c.tipos.length;i++){
      j=(c.tipos[i].fotos||[]).indexOf(src);
      if(j>=0){d=(DEF.tipos.filter(function(x){return x.id===c.tipos[i].id})[0]||DEF.tipos[i%DEF.tipos.length]).fotos;return d[j%d.length]}
    }
    for(k in c.espacos){
      j=(c.espacos[k]||[]).indexOf(src);
      if(j>=0){t=DEF.tipos.filter(function(x){return k.indexOf(x.id)===0})[0]||DEF.tipos[0];return t.fotos[j%t.fotos.length]}
    }
    for(k in {coz:1,dri:1}){
      /* prato ou drink: só volta para a foto padrão se for o mesmo item; item novo fica com o cartão da logo, nunca com a foto de outro */
      for(i=0;i<c.cardapio[k].length;i++)if(c.cardapio[k][i].foto===src){d=DEF.cardapio[k][i];return d&&d.nome===c.cardapio[k][i].nome?d.foto:SEMFOTO}
    }
    if((i=c.galeria.indexOf(src))>=0)return g[i%g.length];
    for(i=0;i<(c.eventos||[]).length;i++)if(c.eventos[i].foto===src)return g[(i*3+1)%g.length];
  }
  if(!/^https?:/i.test(src))return null; /* arquivo do próprio site: não troca */
  for(i=0,j=0;i<src.length;i++)j=(j*31+src.charCodeAt(i))%9973;
  return g[j%g.length];
}
document.addEventListener('error',function(e){
  var im=e.target,s,f;
  if(!im||im.tagName!=='IMG'||im.hasAttribute('data-sem-reserva'))return;
  s=im.getAttribute('src')||'';
  if(!s||s.indexOf('data:')===0||im._reserva===s)return; /* a própria foto reserva falhou: para por aqui */
  f=reservaDe(s);
  if(f&&f!==s){im._reserva=f;im.src=f}
},true);
function reset(){return idb().then(function(db){return new Promise(function(res){var t=db.transaction('kv','readwrite');t.objectStore('kv').delete('cfg');t.oncomplete=function(){res(true)}})}).catch(function(){try{localStorage.removeItem('cb_cfg')}catch(e){}return true})}

var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* idiomas: o texto em português é a chave; js/i18n.js traz inglês e espanhol */
var LANGS=['pt','en','es'];
function pickLang(){try{var l=localStorage.getItem('cb_lang');if(LANGS.indexOf(l)>=0)return l}catch(e){}var n=(navigator.language||'pt').slice(0,2).toLowerCase();return n==='en'||n==='es'?n:'pt'}
var LG=pickLang(), DICT=(window.CB_I18N||{})[LG]||{}, LOC={pt:'pt-BR',en:'en-US',es:'es'}[LG];
function T(s){
  if(LG==='pt'||s==null)return s; var str=String(s), k=str.replace(/\s+/g,' ').trim(); if(!k)return s;
  var r=DICT[k]; if(r==null)return s;
  return (/^\s/.test(str)?' ':'')+r+(/\s$/.test(str)?' ':'');
}
function walk(root){
  if(LG==='pt')return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||(p.closest&&p.closest('[data-noi18n]')))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}}),n,list=[];
  while((n=w.nextNode()))list.push(n);
  list.forEach(function(n){var t=T(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t});
  $$('[placeholder]',root).forEach(function(el){el.placeholder=T(el.placeholder)});
  $$('[aria-label]',root).forEach(function(el){el.setAttribute('aria-label',T(el.getAttribute('aria-label')))});
}
function setLang(l){try{localStorage.setItem('cb_lang',l)}catch(e){}location.reload()}
function lugar(n){return String(n||'').replace(/^(Área|Tenda|Salão)/,function(m){return T(m)})}
document.documentElement.lang={pt:'pt-BR',en:'en',es:'es'}[LG];

/* hora e data de Fortaleza */
function partes(){
  var f=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Fortaleza',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()),o={};
  f.forEach(function(p){o[p.type]=p.value});
  return {iso:o.year+'-'+o.month+'-'+o.day,t:(+o.hour)*60+(+o.minute),y:+o.year,m:+o.month,d:+o.day};
}
function amanha(p){var d=new Date(Date.UTC(p.y,p.m-1,p.d+1));return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0')}
function dur(min){var h=Math.floor(min/60),m=min%60;return (h?h+'h ':'')+m+'min'}
function br(s){if(!s)return '';var p=s.split('-');return p[2]+'/'+p[1]+'/'+p[0]}
function defIso(){var p=partes();return p.t>=870?amanha(p):p.iso}
function comp(s){return String(s||'').split(/[\n,;]+/).map(function(x){return x.trim()}).filter(Boolean)}
function fotosDe(cfg,amb,esp){
  var e=esp&&cfg.espacos&&cfg.espacos[esp]; if(e&&e.length)return e;
  var t=cfg.tipos.filter(function(x){return x.id===amb})[0]; return t?t.fotos:[];
}

/* fotos que trocam: várias fotos no mesmo quadro, com setas */
function slider(el,fotos,alt){
  el.innerHTML=''; el.classList.add('sl'); var i=0, ims=[];
  (fotos||[]).forEach(function(s,k){var im=new Image();im.src=s;im.alt=k?'':(alt||'');im.decoding='async';if(!k)im.className='on';el.appendChild(im);ims.push(im)});
  if(ims.length>1){
    var cnt=document.createElement('span');cnt.className='sl__n';cnt.textContent='1/'+ims.length;
    var go=function(d){ims[i].classList.remove('on');i=(i+d+ims.length)%ims.length;ims[i].classList.add('on');cnt.textContent=(i+1)+'/'+ims.length};
    [['‹',-1,'Foto anterior','sl__p'],['›',1,'Próxima foto','sl__x']].forEach(function(b){var bt=document.createElement('button');bt.type='button';bt.className=b[3];bt.textContent=b[0];bt.setAttribute('aria-label',b[2]);bt.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();go(b[1])});el.appendChild(bt)});
    el.appendChild(cnt);
  }
}

/* o que toda página tem: nome, aviso de aberto/fechado, topo, entradas, links internos */
function chrome(cfg){
  walk(document.body);
  $$('[data-nome]').forEach(function(el){el.textContent=cfg.nome});
  var lg=$('#lang');
  if(lg){lg.innerHTML='';
    /* no menu do topo, em celular e tablet, o idioma vira um botão só (o idioma atual) que abre as três opções; assim cabem Cardápio e Reservar */
    var ops=lg;
    if(lg.closest('#nav')){
      var at=document.createElement('button');at.type='button';at.className='lang__atual';at.setAttribute('aria-expanded','false');
      at.setAttribute('aria-label',{pt:'Idioma: Português',en:'Language: English',es:'Idioma: Español'}[LG]);
      at.innerHTML=LG.toUpperCase()+'<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var fecha=function(){lg.classList.remove('aberto');at.setAttribute('aria-expanded','false')};
      at.addEventListener('click',function(e){e.stopPropagation();at.setAttribute('aria-expanded',lg.classList.toggle('aberto'))});
      document.addEventListener('click',function(e){if(!lg.contains(e.target))fecha()});
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lg.classList.contains('aberto')){fecha();at.focus()}});
      ops=document.createElement('span');ops.className='lang__ops';lg.appendChild(at);lg.appendChild(ops);
    }
    LANGS.forEach(function(l){var b=document.createElement('button');b.type='button';b.textContent=l.toUpperCase();b.setAttribute('aria-pressed',l===LG);b.setAttribute('aria-label',{pt:'Português',en:'English',es:'Español'}[l]);b.addEventListener('click',function(){if(l!==LG)setLang(l)});ops.appendChild(b)})}
  document.title=document.title.replace('Cumbuco Beach',cfg.nome);
  var st=$('#status');
  function status(){
    if(!st)return; var t=partes().t,lab=st.lastElementChild;
    if(t>=540&&t<1020){st.classList.add('open');lab.textContent=T('Aberto agora, fecha às 17h')+' ('+dur(1020-t)+')'}
    else{st.classList.remove('open');lab.textContent=T(t<540?'Abrimos hoje às 9h':'Fechado agora, abrimos às 9h')}
  }
  status(); setInterval(status,30000);
  /* o menu do topo (com os botões Cardápio e Reservar) fica sempre visível, em qualquer tela, mesmo rolando a página */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(!a)return;
    var id=a.getAttribute('href').slice(1), el=id?document.getElementById(id):null; if(!el)return;
    e.preventDefault(); el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  });
  reveal();
}
function reveal(){
  $$('.stagger').forEach(function(g){$$('.rv',g).forEach(function(el,i){el.style.setProperty('--d',(i*90)+'ms')})});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
    $$('.rv:not(.in)').forEach(function(el){io.observe(el)});
  } else {$$('.rv').forEach(function(el){el.classList.add('in')})}
}
function ultima(){try{return JSON.parse(localStorage.getItem('cb_ultima_reserva')||'null')}catch(e){return null}}

return {WA:WA,SEMFOTO:SEMFOTO,DEF:DEF,HORAS:HORAS,MIN:MIN,load:load,save:save,reset:reset,merge:merge,nuvem:NUVEM,registrar:registrar,origem:function(){return estado},clone:clone,$:$,$$:$$,esc:esc,reduce:reduce,partes:partes,amanha:amanha,dur:dur,br:br,defIso:defIso,comp:comp,fotosDe:fotosDe,slider:slider,chrome:chrome,T:T,walk:walk,lang:LG,loc:LOC,lugar:lugar,reveal:reveal,ultima:ultima};
})();
