/* modelo 8: efeitos da página inicial (rolagem, cursor, logo, fotos). Sem bibliotecas. */
var FX=(function(){
var $=CB.$,$$=CB.$$,T=CB.T,reduce=CB.reduce;
var fine=matchMedia('(pointer:fine)').matches;
function wide(){return innerWidth>992}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}

/* abertura */
var ld=$('#ld');
function ready(){document.body.classList.add('ready');if(ld)ld.classList.add('done')}
if(reduce)ready(); else setTimeout(ready,1350);

/* separa um texto em palavras que sobem */
function words(el){
  var i=0;
  function wrap(w){var o=document.createElement('span');o.className='w';var s=document.createElement('span');s.textContent=w;s.style.setProperty('--i',i++);o.appendChild(s);return o}
  function split(node,into){
    node.nodeValue.split(/(\s+)/).forEach(function(w){if(!w)return;into.appendChild(/^\s+$/.test(w)?document.createTextNode(' '):wrap(w))});
  }
  [].slice.call(el.childNodes).forEach(function(n){
    if(n.nodeType===3){var f=document.createDocumentFragment();split(n,f);el.replaceChild(f,n)}
    else if(n.nodeType===1&&n.hasAttribute('data-nome')){var t=document.createTextNode(n.textContent);n.textContent='';split(t,n)}
  });
}

function init(cfg){
  if(reduce){return}
  var frames=[];

  /* títulos */
  var h1=$('.hero h1'); if(h1)words(h1);
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.2});
  $$('main h2').forEach(function(h){words(h);io.observe(h)});

  /* selo giratório */
  var tx=$('#spin-tx'), spinT=$('.spin__t'), ang=0;
  if(tx)tx.textContent=(T('Reserve sua mesa')+' • '+T('Pé na areia')+' • '+cfg.nome+' • ').toUpperCase();

  /* faixas: andam sozinhas e aceleram com a rolagem */
  var rows=$$('.marq__t').map(function(el,k){el.classList.add('js-m');return {el:el,dir:k%2?1:-1,x:0,half:el.scrollWidth/2}});
  rows.forEach(function(r){if(r.dir>0)r.x=-r.half});

  /* sol do dia */
  var sun=$('#day-sun'), dh=$('#day-h'), track=$('.day__track');

  /* frase que acende */
  var say=$('#say-p'), saySec=$('#say'), sayPics=$$('#say-pics figure'), sws=[];
  if(say){var parts=say.textContent.trim().split(/\s+/);say.textContent='';parts.forEach(function(w,i){var s=document.createElement('span');s.className='sw';s.textContent=w;say.appendChild(s);say.appendChild(document.createTextNode(' '));sws.push(s)})}

  /* números */
  var st=$('#stats');
  if(st){
    var total=cfg.tipos.reduce(function(a,t){return a+(+t.qtd||0)},0);
    [[total,'espaços para reservar'],[cfg.tipos.length,'tipos de ambiente'],[7,'dias por semana'],[8,'horas de praia por dia']].forEach(function(d){
      var el=document.createElement('div');el.className='stat';el.innerHTML='<b data-n="'+d[0]+'">0</b><span>'+CB.esc(T(d[1]))+'</span>';st.appendChild(el);
    });
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return; cio.unobserve(e.target);
      var b=e.target, n=+b.dataset.n, t0=performance.now();
      (function tick(now){var p=clamp((now-t0)/1200,0,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)})(t0);
    })},{threshold:.6});
    $$('b[data-n]',st).forEach(function(b){cio.observe(b)});
  }

  /* ambientes: rolagem horizontal presa */
  var fabEl=$('#fab');
  var hz=$('.hz'), ht=$('.hz__track'), hbar=$('#hz-bar'), hmax=0;
  function hzSize(){
    if(!hz)return;
    if(wide()){hz.classList.remove('hz--native');hmax=Math.max(0,ht.scrollWidth-innerWidth);hz.style.height=(hmax+innerHeight)+'px'}
    else{hz.classList.add('hz--native');hz.style.height='';ht.style.transform='';hmax=0}
  }
  hzSize(); addEventListener('resize',function(){hzSize();rows.forEach(function(r){r.half=r.el.scrollWidth/2})});
  setTimeout(hzSize,600);

  /* fotos: revelar e deslizar por dentro */
  var pars=[];
  var heroFigs=$$('.mosaic figure[data-speed]');

  /* fechamento: letras que ondulam e título que cresce */
  var vem=$('#vem');
  if(vem){var t=vem.textContent;vem.textContent='';t.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i);s.textContent=c===' '?' ':c;vem.appendChild(s)})}

  /* posição do mouse (para a foto que segue) */
  var cx=innerWidth/2, cy=innerHeight/2, tx2=cx, ty2=cy;
  var peek=$('#peek'), pimg=peek&&peek.querySelector('img'), px=cx, py=cy;
  if(fine){
    addEventListener('pointermove',function(e){tx2=e.clientX;ty2=e.clientY},{passive:true});
    /* ocasiões: a foto segue o cursor */
    /* a foto aparece sobre o nome e some perto do botão de reservar */
    $$('.occ__i').forEach(function(a){
      a.addEventListener('pointermove',function(e){
        var r=a.getBoundingClientRect(), perto=(e.target.closest&&e.target.closest('.occ__go'))||e.clientX>r.left+r.width*.58;
        if(perto){peek.classList.remove('on');return}
        if(pimg.getAttribute('src')!==a.dataset.img)pimg.src=a.dataset.img; peek.classList.add('on');
      });
      a.addEventListener('pointerleave',function(){peek.classList.remove('on')});
    });
    /* cartões que inclinam */
    function tilt(host,sel){
      host.addEventListener('pointermove',function(e){
        var c=e.target.closest(sel); if(!c)return; var r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
        c.classList.add('tilt','live'); c.style.transform='rotateY('+((x-.5)*12).toFixed(2)+'deg) rotateX('+((.5-y)*10).toFixed(2)+'deg) translateZ(8px)';
        c.style.setProperty('--sx',(x*100)+'%'); c.style.setProperty('--sy',(y*100)+'%');
      });
      host.addEventListener('pointerout',function(e){var c=e.target.closest(sel);if(c&&!c.contains(e.relatedTarget)){c.classList.remove('live');c.style.transform=''}});
    }
    $$('.dishes').forEach(function(h){tilt(h,'.dish')});
    /* botões magnéticos */
    $$('.hero .btn,.quote .btn,.final .btn,#plan-go').forEach(function(b){
      b.classList.add('mag');
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.classList.add('live');b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.35).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*.45).toFixed(1)+'px)'});
      b.addEventListener('pointerleave',function(){b.classList.remove('live');b.style.transform=''});
    });
  }

  /* um único laço de animação */
  var lastY=scrollY, vel=0;
  (function frame(){
    var y=scrollY, vh=innerHeight, docH=document.documentElement.scrollHeight-vh;
    vel+=((y-lastY)-vel)*.18; lastY=y;
    /* selo */
    ang+=.25+Math.abs(vel)*.12; if(spinT)spinT.style.transform='rotate('+ang.toFixed(2)+'deg)';
    /* faixas */
    rows.forEach(function(r){
      if(!r.half)return; r.x+=r.dir*(.7+Math.abs(vel)*.5);
      if(r.x<=-r.half)r.x+=r.half; if(r.x>0)r.x-=r.half;
      r.el.style.transform='translate3d('+r.x.toFixed(1)+'px,0,0) skewX('+clamp(vel*-.35,-9,9).toFixed(2)+'deg)';
    });
    /* sol do dia */
    if(sun&&docH>0){
      var p=clamp(y/docH,0,1), hr=9+p*8, hh=Math.floor(hr), half=(hr-hh)>=.5;
      if(wide()){sun.style.top=(p*100)+'%';sun.style.left='50%'}else{sun.style.left=(p*100)+'%';sun.style.top='50%'}
      dh.textContent=hh+'h'+(half&&hh<17?'30':'');
    }
    /* topo: fotos em velocidades diferentes */
    if(y<vh*1.4)heroFigs.forEach(function(f){f.style.translate='0 '+(y*parseFloat(f.dataset.speed)).toFixed(1)+'px'});
    /* frase */
    if(say){var r=saySec.getBoundingClientRect(), sp=clamp(-r.top/Math.max(1,saySec.offsetHeight-vh),0,1), n=Math.round(clamp(sp/.82,0,1)*sws.length), pi=Math.min(sayPics.length-1,Math.floor(sp*sayPics.length*.999));
      sws.forEach(function(s,i){s.classList.toggle('on',i<n);s.classList.toggle('hot',i===n-1&&n<sws.length)});
      sayPics.forEach(function(f,i){f.classList.toggle('on',i===pi);f.classList.toggle('past',i<pi)})}
    /* ambientes */
    if(hz&&hmax>0){var hr2=hz.getBoundingClientRect(), hp=clamp(-hr2.top/(hz.offsetHeight-vh),0,1);
      ht.style.transform='translate3d('+(-hp*hmax).toFixed(1)+'px,0,0)'; hbar.style.transform='scaleX('+hp.toFixed(3)+')'}
    if(hz&&fabEl){var hb=hz.getBoundingClientRect();fabEl.classList.toggle('hz-on',hmax>0&&hb.top<vh*.5&&hb.bottom>vh*.6)}
    /* fotos */
    pars.forEach(function(im){var b=im.parentNode.getBoundingClientRect();if(b.bottom<0||b.top>vh)return;im.style.transform='scale(1.16) translateY('+(((b.top+b.height/2-vh/2)/vh)*-7).toFixed(2)+'%)'});
    /* fechamento */
    if(vem){var vr=vem.getBoundingClientRect();if(vr.top<vh&&vr.bottom>0){var vp=clamp(1-(vr.top-vh*.2)/(vh*.8),0,1);vem.style.transform='scale('+(.72+vp*.28).toFixed(3)+')'}}
    /* cursor e foto que segue */
    if(fine){
      if(peek){px+=(tx2-px)*.12;py+=(ty2-py)*.12;peek.style.transform='translate3d('+px.toFixed(1)+'px,'+py.toFixed(1)+'px,0) rotate('+clamp((tx2-px)*.06,-10,10).toFixed(2)+'deg)'}}
    requestAnimationFrame(frame);
  })();
}
return {init:init};
})();
