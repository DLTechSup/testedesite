# Barraca Cumbuco Beach, modelo 8 (modelo 7 com a página inicial cheia de efeitos)

- `index.html`: página inicial.
- `reservar.html`: página só de reservas (monta a mensagem e abre o WhatsApp (85) 98177-7390).
- `admin.html`: configurações do site (link "Área do administrador" no rodapé).

## O que dá para mudar em `admin.html`
- Geral: nome da barraca e palavras da faixa que passa.
- Topo da página: as três fotos do início.
- Áreas de reserva: título, descrição e várias fotos de cada ambiente (Área, Tenda, Salão) e de cada espaço (Área 1, Tenda 2...).
- Cozinha e drinks: foto, nome e ingredientes de cada item.
- Fotos e Instagram: fotos da faixa "Quem vem, volta" e o passo a passo do Instagram automático, que é opcional.
- Cópia: exportar, importar e voltar ao padrão.

## Fotos: onde ficam e o que acontece se o Supabase pausar
- As fotos do site são arquivos da pasta `img/`. Quem entrega esses arquivos é a hospedagem do site (GitHub), não o Supabase. Por isso elas continuam aparecendo mesmo com o Supabase pausado.
- **Para trocar uma foto de vez**, substitua o arquivo em `img/` mantendo o mesmo nome (JPG, por volta de 1400 px no lado maior). É o jeito que nunca depende do Supabase.
- Fotos trocadas pela página de configurações (`admin.html`) ficam salvas só no aparelho onde foram trocadas, até a nuvem ser ligada (abaixo).

| Arquivo em `img/` | Onde aparece |
| --- | --- |
| `tenda-laranja.jpg`, `casal-coco.jpg`, `peixe-camarao.jpg` | Topo da página inicial |
| `casal-coco.jpg`, `coco-praia.jpg` | Ambiente Área |
| `tenda-azul.jpg`, `tenda-laranja.jpg` | Ambiente Tenda |
| `moca-palapa.jpg`, `entrada-menino.jpg` | Ambiente Salão |
| `peixada.jpg`, `peixe-delicia.jpg`, `peixe-camarao.jpg`, `peixe-frito.jpg`, `camarao-crocante.jpg`, `carne-farofa.jpg` | Cozinha (página inicial) e cardápio |
| `gin-tonica.jpg`, `caipirinha.jpg`, `drink-sunset.jpg`, `cervejas.jpg`, `skol-bolinhos.jpg`, `coco-praia.jpg` | Drinks (página inicial) e cardápio |
| todas as acima e `entrada-menina.jpg` | Faixa de fotos "Quem vem, volta" |

## Supabase: o site não depende dele para funcionar
- A reserva monta a mensagem e abre o WhatsApp da barraca. Isso não passa pelo Supabase, então funciona com ele ligado, pausado ou desligado.
- A ligação com a nuvem fica no começo de `js/site.js`, no bloco `NUVEM` (endereço do projeto, chave pública e a tabela `site_config`, com as colunas `id` e `dados`). Vazio, o site usa o conteúdo padrão e o que foi salvo no aparelho.
- Com a nuvem ligada, se o Supabase estiver pausado, lento ou fora do ar:
  1. o site espera no máximo 2,5 segundos;
  2. usa a última cópia do conteúdo guardada no aparelho do visitante;
  3. se for a primeira visita, usa o conteúdo padrão, com as fotos da pasta `img/`;
  4. foto guardada no Supabase que não carregar é trocada pela foto padrão do mesmo lugar. Prato ou drink novo, que não existe no conteúdo padrão, fica com o cartão da logo (`img/sem-foto.jpg`), nunca com a foto de outro item. O mesmo cartão aparece em item cadastrado sem foto.
- O que deixa de valer enquanto ele estiver pausado: aviso do dia, agenda, espaços ocupados e fotos trocadas pelo painel que ainda não estejam na cópia do aparelho. A barraca confirma a reserva pelo WhatsApp do mesmo jeito.
- `NUVEM.gravar` e `NUVEM.reserva` são os pontos para o painel com login gravar as configurações e registrar a reserva. O registro acontece depois de abrir o WhatsApp e nunca trava o envio.

## Instagram automático (opcional)
- Do jeito que o site vai, a faixa "Quem vem, volta" mostra as fotos do próprio site (as da aba "Fotos e Instagram" das configurações). Nada precisa ser feito.
- Quem quiser pode ligar o Instagram automático: aí a faixa passa a mostrar sozinha as 12 publicações mais recentes de @cumbucobeachbrasil, no lugar das fotos do site. O passo a passo completo está em `admin.html`, aba "Fotos e Instagram".
- A ligação é direta com o Instagram (Meta), sem serviço de terceiros. A conta autoriza uma vez no painel da Meta, que entrega uma chave. Essa chave fica só no cofre de segredos do repositório, com o nome `IG_TOKEN`; ela nunca entra em arquivo do site.
- Um robô do próprio GitHub (`.github/workflows/instagram.yml` e `tools/instagram.mjs`) roda de 6 em 6 horas, lê as publicações direto no Instagram e guarda as fotos dentro do site: pasta `img/insta` e lista em `insta.json`. As fotos passam a ser arquivos do site e continuam aparecendo mesmo que o Instagram fique fora do ar.
- A chave do Instagram vale 60 dias. O robô renova sozinho, duas vezes por semana. Se o Instagram devolver uma chave diferente na renovação, o robô guarda essa chave nova embaralhada (AES-256) em `tools/instagram.cofre`; ela só abre com o segredo `IG_TOKEN`. Por isso trate o `IG_TOKEN` como senha para sempre, mesmo depois de vencido.
- Não apague as pastas `.github` e `tools` ao enviar o site: sem elas o robô não existe. Sem o segredo `IG_TOKEN` o robô não faz nada.
- Para desligar: apague o segredo `IG_TOKEN`. Na rodada seguinte o robô tira as fotos do Instagram guardadas e a faixa volta às fotos do site. Outra forma é trocar `insta:{on:true}` por `insta:{on:false}` em `js/site.js`.
- Se o repositório ficar 60 dias sem nenhuma alteração, o GitHub pode desligar o agendamento e avisa por e-mail; é só reativar na aba Actions.

## Importante
- As alterações ficam salvas no aparelho onde foram feitas. Para valerem para todos os visitantes é preciso ligar a nuvem (bloco `NUVEM` em `js/site.js`).
- A página de configurações ainda não tem senha. Coloque login antes de publicar com o banco ligado.
- O mapa é uma ilustração com o pin da logo; ao clicar abre o Google Maps no endereço.

## Para confirmar com o cliente
- Ingredientes ("o que vai") dos pratos e drinks: escritos a partir das fotos.
- Fotos e textos dos ambientes, principalmente o Salão.

## Novidades do modelo 7
- Idiomas: botões PT, EN e ES no topo. O site abre no idioma do aparelho do visitante. As traduções ficam em `js/i18n.js` (a chave é o texto em português). Texto novo digitado no painel aparece como foi escrito; para traduzir, acrescente a frase nesse arquivo.
- A mensagem de reserva vai sempre em português para a barraca.
- Aviso do dia e agenda de eventos (aba "Aviso e agenda"). Eventos passados somem sozinhos.
- Preço opcional em cada prato e drink.
- Espaços ocupados por data (aba "Espaços ocupados"): o espaço fica indisponível na reserva naquele dia.
- Dados para o Google e para o compartilhamento do link no `<head>` do `index.html`. Depois de definir o domínio, troque `img/tenda-laranja.jpg` em `og:image` pelo endereço completo (https://seudominio/...).
- Ao ligar no seu Supabase, lembre de guardar também: aviso, eventos, bloqueios e o preço dos itens.

## Efeitos do modelo 8 (só na página inicial)
Ficam em `css/fx.css` e `js/fx.js`, sem bibliotecas externas. Para voltar ao visual calmo do modelo 7, basta remover essas duas linhas do `index.html`.
Quem usa o aparelho com "reduzir movimento" ligado vê o site sem os efeitos.

## Cardápio completo (página `cardapio.html`)
É a mesma página do cardápio feita em separado, agora dentro do site: mesmo visual do cardápio impresso (papel, coqueiros, mar, kites, placa e o sol da logo), com caminho de volta para o Início e botão Reservar.

- Arquivos: `cardapio.html`, `css/cardapio.css`, `js/cardapio.js` e `js/dados.js`.
- **Itens, descrições e preços** ficam em `js/dados.js`, iguais aos do PDF (96 itens). Cada linha é `["NOME", "R$ 00,00", "descrição"]`. As traduções para inglês e espanhol ficam no mesmo arquivo, em `tr`.
- Os itens são só para leitura: o pedido é feito na barraca. Só as fotos ampliam.
- Busca (aceita sem acento e no plural), categorias que acompanham a rolagem, tamanho da letra, compartilhar, QR Code e o botão "Baixar cardápio agora" (`cardapio.pdf`).
- `cardapio.pdf` é o mesmo cardápio em páginas do tamanho da tela do celular (19 páginas), com as fotos dos pratos e drinks (sem fotos de pessoas), botão "Reservar mesa", Instagram, endereço e "Como chegar". Ele não se atualiza sozinho: depois de mudar item ou preço em `js/dados.js`, precisa ser gerado de novo.
- O QR Code fica na página do cardápio e abre direto na primeira categoria (Entradas), sem passar pela capa. A página inicial não tem mais QR Code.
- **Chamada do cardápio na página inicial** (depois dos pratos e drinks): título, a contagem de opções e as 11 partes do cardápio com o desenho de cada uma. Tocar em uma parte abre o cardápio direto nela; os botões "Ver cardápio online" e "Baixar cardápio" continuam ali. As partes e a contagem saem de `js/dados.js`, então acompanham qualquer mudança no cardápio. No computador as 11 ficam em uma linha, no tablet são 6 por linha e no celular a fileira rola de lado.
- O idioma escolhido vale para o site inteiro. Em inglês e espanhol o nome e a descrição traduzidos ficam em destaque e o português aparece menor embaixo.
- O nome da barraca no rodapé do cardápio segue o que estiver nas configurações (`admin.html`).
- Links úteis: `cardapio.html#opcoes` abre com o botão de baixar em destaque; `cardapio.html#peixes`, `#bebidas`, `#whiskies` etc. abrem direto na categoria.
- O QR Code é gerado sozinho com o endereço da página. Depois de publicar no domínio definitivo ele já aponta para lá e pode ser impresso para as mesas.
- A etiqueta "Pratos para 2 pessoas" vem do ícone de duas pessoas do cardápio impresso. Se não for esse o sentido, apague `duas:true` em `js/dados.js`.
- `css/menu.css` ficou só com os blocos de chamada do cardápio usados na página inicial e na de reservas.

## Sol
Em todo o site o sol é o da logo, com os raios na volta inteira (página inicial e cardápio).

## Caranguejo do cardápio (versão 9)

O caranguejo segura a placa do cardápio e anda pelos cantos de baixo da tela, na página inicial e na de reservas. Às vezes ele sai de trás de um botão ou de um título grande. Tocar nele abre o cardápio. Tudo dele está em `js/caranguejo.js`; as frases em inglês e espanhol ficam em `js/i18n.js`.

- Aparece de mansinho espiando num canto ("Psiu!"), entra, finge que vai embora ("Brincadeira! Tô aqui!") e mostra a placa ("Olha o cardápio!").
- No computador, fica no canto, inteiro dentro da tela, oferecendo o cardápio de tempos em tempos ("Bateu fome? Me toca!"). No meio do tempo ele sai do canto e aparece por trás de um botão ou de um título (ou só espia na beirada, "Achou!"). Depois de uns 40 segundos some e aparece do outro lado.
- No celular e no tablet, ele faz visitas: aparece, interage com o que está na tela e vai embora; uns 7 a 12 segundos depois volta, cada vez de um jeito e do outro lado (num canto, por trás de um botão, andando por cima de um título ou só espiando). Num teste de 2 minutos lendo a página, ficou cerca de 36 segundos inteiro na tela, 11 espiando e o resto fora.
- Pouso no botão: ele sobe por trás do botão (por exemplo, "Ver cardápio online", "Reservar nesse horário" ou o "Guardar minha mesa" do celular), mostra a placa e fala. Se a pessoa rolar a página ou não tocar nele em alguns segundos, ele volta para trás do botão.
- Pouso no título: ele sai de trás das letras de um título grande ("Qual é a ocasião?", "Áreas: pé na areia", "Dia a dois"…), anda de lado por cima delas ("Licença, tô passando!"), oferece o cardápio e volta para trás das letras. Rolar a página também faz ele voltar na hora.
- O "x" redondo acima dele fecha o caranguejo ("Tá bom, tchau!"). Fechado, ele não aparece mais em nenhuma página durante aquela visita; numa nova visita, volta.
- Se ele estiver escondido ou espiando e a pessoa passar o mouse ou tocar nele, ele anda para frente e aparece de corpo inteiro ("Oi! Quer ver o cardápio?"); com ele inteiro na tela, o toque abre o cardápio.
- Reage à parte do site que a pessoa está olhando: aponta para as ocasiões, os ambientes, a foto do "Monte o seu dia" e o mapa; nos pratos, joga uma cordinha e puxa o prato mais perto; em "E tem muito mais no cardápio", puxa o quadro e fala quantas opções existem.
- Incentiva quem está fazendo a reserva: comenta o dia, o número de pessoas, o lugar, o horário e o nome escolhidos, avisa quando está tudo pronto, ajuda quando falta algum dado e comemora quando a reserva vai para o WhatsApp.
- Não atrapalha: os pousos são rápidos e não acontecem enquanto a pessoa preenche um formulário; no resto do tempo fica nos cantos de baixo; quando a pessoa mexe em algo perto dele, vai para o outro lado ou se esconde na beirada só até aquilo sair de perto, e o balão sobe para não cobrir o que foi tocado. No celular, sai da tela enquanto o teclado está aberto e fica em cima do botão "Guardar minha mesa".
- Quem usa "reduzir movimento" no aparelho vê o caranguejo parado no canto, sem andar.
- Para tirar o caranguejo, apague a linha `<script src="js/caranguejo.js"></script>` do fim de `index.html` e de `reservar.html`.

## Cardápio em PDF: celular e computador

- `cardapio.pdf`: formato do celular (uma coluna, páginas do tamanho da tela).
- `cardapio-a4.pdf`: A4 deitado, com três colunas por página, capa com fotos dos pratos e a mesma arte do PDF do celular.
- O botão "Baixar cardápio" escolhe sozinho: em computador (tela grande com mouse) baixa o A4; no celular e no tablet, baixa o do celular.
- Logo abaixo das opções do topo e no rodapé fica a linha "Prefere outro formato?", que baixa o outro PDF (no computador oferece o do celular; no celular e no tablet, o A4 deitado). Assim a pessoa pode escolher.
- Os dois são gerados a partir de `js/dados.js`; se o cardápio mudar, os dois PDFs precisam ser gerados de novo.

