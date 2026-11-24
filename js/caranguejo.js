/* O caranguejo do cardápio.
   Espia de mansinho num canto, finge que vai embora, mostra a placa, some e aparece do outro lado.
   Reage à parte do site que a pessoa está olhando (aponta e puxa os pratos) e incentiva quem está fazendo a reserva.
   Tocar nele abre o cardápio. Só aparece onde não cobre textos nem fotos: num canto livre, ou saindo de trás de um título, de um botão ou de uma foto
   quando o espaço em cima deles está vazio. No fim da página, surfa nas letras do "Vem pra cá!".
   No celular ele faz visitas: aparece, interage e vai embora. O "x" acima dele fecha (não volta durante a visita). */
(function(){
  'use strict';
  if(window.__cj||!window.Promise||!Element.prototype.animate)return; window.__cj=1;
  /* fechado pela pessoa: não volta durante esta visita */
  try{if(sessionStorage.getItem('cj_fechado')==='1')return}catch(e){}
  var CB=window.CB||{}, LG=CB.lang||'pt', T=CB.T||function(s){return s};
  function F(s,k,v){return T(s).replace('{'+k+'}',v)}
  var CSS=".cj{position:fixed;left:0;bottom:var(--cj-chao,calc(14px + env(safe-area-inset-bottom)));z-index:70;width:var(--cj-w,150px);display:block;text-decoration:none;color:inherit;pointer-events:none;-webkit-tap-highlight-color:transparent;outline:0;transition:bottom .45s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1)} .cj[data-lado=direita]{left:auto;right:0} .cj.cj-sai,.cj.cj-desce{transform:translateY(140%)} .cj.cj-desce{transition:transform .22s ease-in} .cj-mover{position:relative;display:block;will-change:transform} .cj-sobe{position:relative;display:block} .cj-link{display:block;color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent;outline:0} .cj.cj-pousa{position:absolute;bottom:auto;right:auto;transition:none;--cj-w:128px} .cj.cj-pousa.cj-fixo{position:fixed} .cj.cj-pousa:not(.cj-fixo){z-index:40} .cj.cj-onda .cj-sobe{transform-origin:50% 98%} .cj.cj-pousa .cj-svg{filter:none} .cj.cj-oculto{visibility:hidden} .cj-x{position:absolute;top:-36px;right:-4px;z-index:2;display:grid;place-items:center;width:30px;height:30px;margin:0;padding:0;border:2.5px solid #17434B;border-radius:50%;background:#FFFBF0;color:#17434B;cursor:pointer;pointer-events:auto;box-shadow:0 4px 10px rgba(23,67,75,.22);transition:opacity .2s,transform .3s cubic-bezier(.34,1.56,.64,1)} .cj-x::before{content:\"\";position:absolute;inset:-9px;border-radius:50%} .cj-x svg{display:block;width:12px;height:12px} .cj-x:hover{background:#17434B;color:#FFFBF0} .cj-x:focus-visible{outline:3px solid #17434B;outline-offset:3px} .cj.anda .cj-x,.cj.cj-esp .cj-x,.cj.cj-pousa:not(.cj-em-pe) .cj-x,.cj.cj-fechando .cj-x,.cj.cj-semx .cj-x,.cj.cj-onda .cj-x{opacity:0;transform:scale(.5);pointer-events:none} .cj-svg{display:block;width:100%;height:auto;overflow:visible;filter:drop-shadow(0 8px 14px rgba(23,67,75,.2))} .cj-svg .cj-pulo{pointer-events:visiblePainted;cursor:pointer} .cj-svg .cj-alvo{pointer-events:none} .cj.cj-esp .cj-svg .cj-alvo{pointer-events:all} .cj-link:focus-visible .cj-svg{outline:3px solid #17434B;outline-offset:4px;border-radius:24px} .cj-t{display:none}.cj[data-lg=pt] .cj-t-pt,.cj[data-lg=en] .cj-t-en,.cj[data-lg=es] .cj-t-es{display:inline} .cj-pata,.cj-garra-e,.cj-garra-d,.cj-braco,.cj-mand-d,.cj-corpo,.cj-pulo,.cj-sombra,.cj-olhos{transform-box:view-box} .cj-olho{transform-box:fill-box;transform-origin:center} .cj.anda .cj-a{animation:cj-pa .3s ease-in-out infinite alternate} .cj.anda .cj-b{animation:cj-pa .3s ease-in-out -.3s infinite alternate} .cj.anda .cj-corpo{animation:cj-bob .15s ease-in-out infinite alternate} .cj.anda.lento .cj-a,.cj.anda.lento .cj-b{animation-duration:.55s} .cj.anda.lento .cj-b{animation-delay:-.55s} .cj.anda.lento .cj-corpo{animation-duration:.275s} @keyframes cj-pa{from{transform:rotate(-15deg)}to{transform:rotate(13deg)}} @keyframes cj-bob{to{transform:translateY(-12px)}} .cj-olho{animation:cj-pisca 4.6s infinite} @keyframes cj-pisca{0%,90%,96%,100%{transform:scaleY(1)}93%{transform:scaleY(.1)}} .cj-olhos{transform:translate(var(--cj-ox,0px),var(--cj-oy,0px));transition:transform .35s ease} .cj-garra-e{transform-origin:170px 300px;animation:cj-placa 2.8s ease-in-out infinite alternate} @keyframes cj-placa{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}} .cj-garra-d{transform-origin:450px 330px;animation:cj-aceno 5.2s ease-in-out infinite;transition:transform .4s cubic-bezier(.34,1.56,.64,1)} @keyframes cj-aceno{0%,68%,100%{transform:rotate(0)}74%{transform:rotate(-16deg)}80%{transform:rotate(7deg)}86%{transform:rotate(-11deg)}93%{transform:rotate(0)}} .cj-mand-d{transform-origin:529px 305px;animation:cj-belisca 5.2s ease-in-out infinite} @keyframes cj-belisca{0%,70%,100%{transform:rotate(0)}73%{transform:rotate(-28deg)}76%{transform:rotate(0)}79%{transform:rotate(-28deg)}82%{transform:rotate(0)}} .cj-braco{transform-origin:170px 320px;transition:transform .45s cubic-bezier(.34,1.56,.64,1)} .cj-link:hover .cj-braco,.cj-link:focus-visible .cj-braco{transform:translateY(-34px) rotate(-5deg)} .cj.chama .cj-braco,.cj.mostra .cj-braco{animation:cj-ergue 1.1s cubic-bezier(.34,1.56,.64,1)} .cj.mostra .cj-braco{animation-duration:1.6s} @keyframes cj-ergue{0%{transform:none}30%{transform:translateY(-50px) rotate(-7deg)}45%{transform:translateY(-50px) rotate(5deg)}60%{transform:translateY(-50px) rotate(-5deg)}75%{transform:translateY(-42px) rotate(2deg)}100%{transform:none}} .cj-pulo{transform-origin:310px 535px} .cj.chama .cj-pulo,.cj.mostra .cj-pulo{animation:cj-salta .7s cubic-bezier(.34,1.56,.64,1)} .cj.festa .cj-pulo{animation:cj-salta .6s cubic-bezier(.34,1.56,.64,1) 3} @keyframes cj-salta{0%{transform:none}25%{transform:scale(1.06,.9)}55%{transform:translateY(-60px) scale(.96,1.06)}80%{transform:scale(1.04,.95)}100%{transform:none}} .cj-sombra{transform-origin:310px 536px} .cj.chama .cj-sombra,.cj.mostra .cj-sombra{animation:cj-sombra .7s cubic-bezier(.34,1.56,.64,1)} @keyframes cj-sombra{55%{transform:scale(.7);opacity:.08}} .cj.aponta .cj-garra-d,.cj.puxa .cj-garra-d{animation:none;transform:rotate(var(--cj-ang,30deg))} .cj.aponta .cj-mand-d{animation:cj-belisca 1.3s ease-in-out -.95s 2} .cj.puxa .cj-pulo{animation:cj-puxa 1.5s ease-in-out} @keyframes cj-puxa{0%,100%{transform:none}20%,52%,84%{transform:translateX(calc(var(--cj-sentido,1)*-16px)) rotate(calc(var(--cj-sentido,1)*-7deg))}36%,68%{transform:translateX(calc(var(--cj-sentido,1)*-6px)) rotate(calc(var(--cj-sentido,1)*-2deg))}} .cj-corda{position:fixed;inset:0;z-index:69;width:100%;height:100%;pointer-events:none;overflow:visible} .cj-corda path{fill:none;stroke:#7A4A22;stroke-width:4.5;stroke-linecap:round} .cj-puxado{animation:cj-puxao 1.5s ease-in-out} @keyframes cj-puxao{0%,100%{translate:0 0;rotate:0deg}20%,52%,84%{translate:var(--cj-dx,-14px) 3px;rotate:var(--cj-rot,-1.5deg)}36%,68%{translate:calc(var(--cj-dx,-14px)*.4) 1px;rotate:0deg}} .cj-fala{position:absolute;left:94%;bottom:62%;width:max-content;max-width:min(210px,calc(100vw - var(--cj-w,150px) - 30px));padding:9px 13px;border:3px solid #17434B;border-radius:16px;background:#FFFBF0;color:#17434B; font:600 15px/1.25 Fredoka,system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;box-shadow:0 8px 18px rgba(23,67,75,.18);opacity:0;transform:translateY(8px) scale(.85);transform-origin:0 100%;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1);pointer-events:none} .cj-fala::before{content:\"\";position:absolute;left:-11px;bottom:12px;border:8px solid transparent;border-right:11px solid #17434B;border-left:0} .cj-fala::after{content:\"\";position:absolute;left:-6px;bottom:14px;border:6px solid transparent;border-right:8px solid #FFFBF0;border-left:0} .cj.cj-inv .cj-fala{left:auto;right:94%;transform-origin:100% 100%} .cj.cj-inv .cj-fala::before{left:auto;right:-11px;border-right:0;border-left:11px solid #17434B} .cj.cj-inv .cj-fala::after{left:auto;right:-6px;border-right:0;border-left:8px solid #FFFBF0} .cj.cj-fcima .cj-fala{left:50%;right:auto;bottom:calc(100% + 14px);translate:-50% 0;transform-origin:50% 100%} .cj.cj-fcima .cj-fala::before{left:50%;right:auto;bottom:-11px;margin-left:-8px;border:8px solid transparent;border-top:11px solid #17434B;border-bottom:0} .cj.cj-fcima .cj-fala::after{left:50%;right:auto;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top:8px solid #FFFBF0;border-bottom:0} .cj-fala.on{opacity:1;transform:none} @media (max-width:62rem){.cj{--cj-w:112px}.cj.cj-pousa{--cj-w:80px}.cj-fala{font-size:14px;padding:7px 11px}} @media (max-width:400px){.cj{--cj-w:100px}.cj.cj-pousa{--cj-w:76px}} @media (prefers-reduced-motion:reduce){.cj *,.cj-puxado{animation:none!important;transition:none!important}} @media print{.cj,.cj-corda{display:none}}", SVG="<svg class=\"cj-svg\" viewBox=\"-10 -200 640 750\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\"> <ellipse class=\"cj-sombra\" pointer-events=\"none\" cx=\"310\" cy=\"536\" rx=\"250\" ry=\"20\" fill=\"#0B2A3A\" opacity=\".18\"/> <g class=\"cj-pulo\"><rect class=\"cj-alvo\" x=\"10\" y=\"-190\" width=\"600\" height=\"730\" rx=\"60\" fill=\"transparent\"/><g class=\"cj-corpo\"> <g class=\"cj-patas\"><g class=\"cj-pata cj-a\" style=\"transform-origin:190px 425px\"><path d=\"M190 425L120 405L92 488\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g class=\"cj-pata cj-b\" style=\"transform-origin:212px 436px\"><path d=\"M212 436L140 440L124 512\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g class=\"cj-pata cj-a\" style=\"transform-origin:238px 442px\"><path d=\"M238 442L186 468L178 528\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g class=\"cj-pata cj-b\" style=\"transform-origin:430px 425px\"><path d=\"M430 425L500 405L528 488\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g class=\"cj-pata cj-a\" style=\"transform-origin:408px 436px\"><path d=\"M408 436L480 440L496 512\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g class=\"cj-pata cj-b\" style=\"transform-origin:382px 442px\"><path d=\"M382 442L434 468L442 528\" fill=\"none\" stroke=\"#C74400\" stroke-width=\"19\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g> <path d=\"M129.6 445A180.4 180.4 0 0 1 490.4 445Z\" fill=\"#E85202\"/> <path class=\"cj-boca\" d=\"M282 330q28 26 56 0\" fill=\"none\" stroke=\"#901B1E\" stroke-width=\"10\" stroke-linecap=\"round\"/> <g class=\"cj-olhos\"><g class=\"cj-olho\"><circle cx=\"267.7\" cy=\"226.1\" r=\"21.4\" fill=\"#E00C04\"/><circle cx=\"274\" cy=\"219\" r=\"6.5\" fill=\"#fff\"/></g> <g class=\"cj-olho\"><circle cx=\"352.4\" cy=\"226.1\" r=\"21.4\" fill=\"#E00C04\"/><circle cx=\"359\" cy=\"219\" r=\"6.5\" fill=\"#fff\"/></g></g> <g class=\"cj-braco\"><g class=\"cj-garra-e\"><path class=\"cj-mand-e\" d=\"M175 193L72 297C72.8 298.2 72.7 300.8 77 304C81.3 307.2 90.2 313.5 98 316C105.8 318.5 114.3 320.2 124 319C133.7 317.8 146.8 313.8 156 309C165.2 304.2 172.8 297.5 179 290C185.2 282.5 190.3 273.0 193 264C195.7 255.0 195.5 243.7 195 236C194.5 228.3 193.3 225.2 190 218C186.7 210.8 177.5 197.2 175 193Z\" fill=\"#901B1E\" stroke=\"#901B1E\" stroke-width=\"5\" stroke-linejoin=\"round\"/><g class=\"cj-placa\"><path d=\"M196 196L292 -18\" stroke=\"#9A5B2E\" stroke-width=\"15\" stroke-linecap=\"round\"/><g transform=\"rotate(-6 300 -95)\"><rect x=\"110\" y=\"-180\" width=\"380\" height=\"170\" rx=\"28\" fill=\"#FFF6E3\" stroke=\"#E00C04\" stroke-width=\"12\"/><g class=\"cj-t cj-t-pt\"><g fill=\"#E00C04\" transform=\"translate(150.0 -78) scale(0.0615 -0.0615)\"><path transform=\"translate(0 0)\" d=\"M379.875 -17.875Q338.375 -17.875 289.875 -4.8125Q241.375 8.25 193.5625 35.8125Q145.75 63.375 106.4375 106.5625Q67.125 149.75 43.5625 209.0625Q20 268.375 20 345.25Q20 419.375 43.5625 476.75Q67.125 534.125 106.0 576.125Q144.875 618.125 192.6875 644.6875Q240.5 671.25 289.875 684.25Q339.25 697.25 382.5 697.375Q433.375 697.375 471.875 685.25Q510.375 673.125 534.5625 659.9375Q558.75 646.75 565.125 642.5Q584.125 630.25 600.875 615.5Q617.625 600.75 617.875 576.625Q618.125 564 613.0 551.125Q607.875 538.25 597.875 524.5Q579.875 499.125 563.8125 487.375Q547.75 475.625 532 475.625Q519.5 475.625 508.125 481.625Q496.75 487.625 480.5 498.125Q473.625 503 461.5 509.9375Q449.375 516.875 428.8125 522.8125Q408.25 528.75 375.875 528.75Q345.625 528.75 312.5 517.8125Q279.375 506.875 251.0 484.125Q222.625 461.375 205.125 425.4375Q187.625 389.5 187.625 340.25Q187.625 290.125 205.5625 254.5625Q223.5 219 251.875 196.25Q280.25 173.5 313.375 162.5625Q346.5 151.625 375.875 151.625Q403.875 151.625 423.5625 156.6875Q443.25 161.75 458.4375 170.0625Q473.625 178.375 484.875 185.75Q495.875 193.5 508.125 199.5Q520.375 205.5 532.875 205.5Q548.625 205.5 564.25 192.9375Q579.875 180.375 597 154.125Q607 138.75 612.125 125.3125Q617.25 111.875 617 100.125Q616.75 76.875 600.0 62.5625Q583.25 48.25 564.25 36.875Q557 32.75 534.0625 19.0625Q511.125 5.375 472.625 -6.25Q434.125 -17.875 379.875 -17.875Z\"/><path transform=\"translate(637 0)\" d=\"M688.875 107.25Q702.625 79.875 703.5625 60.5625Q704.5 41.25 691.6875 26.5625Q678.875 11.875 650.5 -2.75Q606.5 -23.75 582.5625 -15.625Q558.625 -7.5 537.625 37.125L354.375 415.875L173 36.5Q151.125 -6.5 127.1875 -14.5625Q103.25 -22.625 60 -1.75Q31.625 11.875 18.4375 26.6875Q5.25 41.5 6.375 61.125Q7.5 80.75 21.375 108.625L278.375 641.875Q289.375 663.875 310.875 677.1875Q332.375 690.5 355.375 690.5Q371.875 690.5 386.0625 684.5625Q400.25 678.625 412.125 667.625Q424 656.625 431.375 640.875ZM191.375 144.875 260.375 287.625H449.5L518.375 144.875Z\"/><path transform=\"translate(1347 0)\" d=\"M125 -8.375Q84.25 -8.375 66.8125 3.8125Q49.375 16 45.5625 35.6875Q41.75 55.375 41.75 76V607.25Q41.75 627.75 45.6875 646.875Q49.625 666 67.0625 678.25Q84.5 690.5 126 690.5H330.25Q370.125 690.5 413.5625 675.1875Q457 659.875 494.5 628.5Q532 597.125 555.5625 550.0625Q579.125 503 579.125 438.625Q579.125 394.5 566.0625 354.875Q553 315.25 527.1875 282.6875Q501.375 250.125 464.25 226.0625Q427.125 202 378.875 189.75H209.25V75Q209.25 54.375 205.375 35.1875Q201.5 16 184.0625 3.8125Q166.625 -8.375 125 -8.375ZM545.625 13.5Q504.625 -17.125 480.5625 -10.9375Q456.5 -4.75 429.375 31.875L249.375 282.875L439.125 307L565.5 131.125Q583.875 104.375 588.8125 85.875Q593.75 67.375 583.5 50.875Q573.25 34.375 545.625 13.5ZM209.25 356.125H334Q345.25 356.125 359.0 360.4375Q372.75 364.75 384.4375 374.6875Q396.125 384.625 403.875 400.5Q411.625 416.375 411.625 439.625Q411.625 464.375 400.6875 483.125Q389.75 501.875 371.0 512.375Q352.25 522.875 328.25 522.875H209.25Z\"/><path transform=\"translate(1954 0)\" d=\"M117.375 -8.375Q78.625 -8.375 61.1875 3.5Q43.75 15.375 38.9375 34.625Q34.125 53.875 34.125 76V608.125Q34.125 628.625 38.0625 647.8125Q42 667 59.5 679.25Q77 691.5 118.375 690.625L294.5 690.5Q366 690.5 428.5625 663.9375Q491.125 637.375 538.75 590.25Q586.375 543.125 613.125 480.0Q639.875 416.875 639.875 344.625Q639.875 270.375 613.0625 206.1875Q586.25 142 538.625 93.875Q491 45.75 427.9375 18.6875Q364.875 -8.375 291.5 -8.375ZM201.625 159.25H294.5Q344.125 159.25 384.625 183.25Q425.125 207.25 448.6875 248.125Q472.25 289 472.25 340.5Q472.25 392.125 448.6875 433.5Q425.125 474.875 384.5625 498.875Q344 522.875 293.5 522.875H201.625Z\"/><path transform=\"translate(2615 0)\" d=\"M688.875 107.25Q702.625 79.875 703.5625 60.5625Q704.5 41.25 691.6875 26.5625Q678.875 11.875 650.5 -2.75Q606.5 -23.75 582.5625 -15.625Q558.625 -7.5 537.625 37.125L354.375 415.875L173 36.5Q151.125 -6.5 127.1875 -14.5625Q103.25 -22.625 60 -1.75Q31.625 11.875 18.4375 26.6875Q5.25 41.5 6.375 61.125Q7.5 80.75 21.375 108.625L278.375 641.875Q289.375 663.875 310.875 677.1875Q332.375 690.5 355.375 690.5Q371.875 690.5 386.0625 684.5625Q400.25 678.625 412.125 667.625Q424 656.625 431.375 640.875ZM191.375 144.875 260.375 287.625H449.5L518.375 144.875ZM278.25 713.875Q260.625 713.25 248.3125 726.75Q236.0 740.25 226.625 769.25Q214.625 807.75 222.0625 826.6875Q229.5 845.625 262.625 855.875L442.625 909.75Q460.125 910.375 472.5 896.75Q484.875 883.125 493.25 854.125Q506.125 817.375 497.75 798.0625Q489.375 778.75 457.875 768.5Z\"/><path transform=\"translate(3325 0)\" d=\"M123.875 -8.375Q83.125 -8.375 65.6875 3.8125Q48.25 16 44.4375 35.6875Q40.625 55.375 40.625 76V607.125Q40.625 627.625 44.5625 646.8125Q48.5 666 66.0 678.25Q83.5 690.5 124.875 690.5H327.125Q366.75 690.5 410.1875 675.125Q453.625 659.75 491.625 628.1875Q529.625 596.625 553.3125 549.625Q577 502.625 577 438.5Q577 375.25 553.3125 328.3125Q529.625 281.375 491.5625 250.3125Q453.5 219.25 410.0625 203.875Q366.625 188.5 326.125 188.5H208.25V75Q208.25 54.375 204.375 35.1875Q200.5 16 183.0625 3.8125Q165.625 -8.375 123.875 -8.375ZM208.25 356.125H327.125Q344.625 356.125 363.8125 364.125Q383 372.125 396.6875 390.5625Q410.375 409 410.375 439.625Q410.375 464.125 399.3125 482.875Q388.25 501.625 369.4375 512.25Q350.625 522.875 326.125 522.875H208.25Z\"/><path transform=\"translate(3921 0)\" d=\"M117.125 -9.25Q76.375 -9.25 58.9375 2.9375Q41.5 15.125 37.6875 34.8125Q33.875 54.5 33.875 75.125V607.125Q33.875 627.75 37.75 646.9375Q41.625 666.125 59.0625 678.3125Q76.5 690.5 118.125 690.5Q159.75 690.5 176.75 678.3125Q193.75 666.125 197.5625 646.9375Q201.375 627.75 201.375 606.125V74.125Q201.375 53.5 197.5 34.3125Q193.625 15.125 176.1875 2.9375Q158.75 -9.25 117.125 -9.25Z\"/><path transform=\"translate(4156 0)\" d=\"M366 -19.5Q293.40705128205127 -19.5 230.01602564102564 7.9375Q166.625 35.375 118.6875 84.25Q70.75 133.125 43.375 197.3409926470588Q16 261.5569852941176 16 334.9466911764706Q16 410.375 42.473958333333336 476.37280701754383Q68.94791666666667 542.3706140350877 115.78645833333334 592.1228070175439Q162.625 641.875 224.74760536398466 669.875Q286.8702107279693 697.875 357.72078544061304 697.875Q430.625 697.875 494.0314814814815 670.5375Q557.437962962963 643.2 604.9928240740741 594.09375Q652.5476851851852 544.9875 679.6488425925926 479.68125Q706.75 414.375 706.75 338.7147435897436Q706.75 265.09935897435895 680.3125 200.17467948717947Q653.875 135.25 606.7358490566038 85.68954248366013Q559.5966981132076 36.12908496732026 498.1108490566038 8.31454248366013Q436.625 -19.5 366 -19.5ZM360.8831395348837 148.125Q397.875 148.125 430.4375 162.75Q463 177.375 487.4375 203.0Q511.875 228.625 525.5 263.6470264317181Q539.125 298.66905286343615 539.125 338.977422907489Q539.125 378.625 525.0625 413.25Q511 447.875 486.5 474.375Q462 500.875 429.9906542056075 515.5625Q397.98130841121497 530.25 361.4906542056075 530.25Q325 530.25 292.875 515.5625Q260.75 500.875 236.25 474.4375Q211.75 448 197.6875 413.18393640350877Q183.625 378.36787280701753 183.625 338.67105263157896Q183.625 299.625 197.76458333333335 264.82594086021504Q211.90416666666667 230.0268817204301 236.32708333333335 203.76344086021504Q260.75 177.5 292.6395348837209 162.8125Q324.52906976744185 148.125 360.8831395348837 148.125Z\"/></g></g><g class=\"cj-t cj-t-en\"><g fill=\"#E00C04\" transform=\"translate(214.7 -78) scale(0.0615 -0.0615)\"><path transform=\"translate(0 0)\" d=\"M117.25 -8.375Q77.625 -8.375 60.1875 3.4375Q42.75 15.25 38.8125 34.5Q34.875 53.75 34.875 76V607.25Q34.875 627.75 38.8125 646.4375Q42.75 665.125 60.25 677.375Q77.75 689.625 119.25 689.625Q147.625 689.625 161.1875 686.0Q174.75 682.375 181.125 676.75Q187.5 671.125 194.25 663.375L410.375 378.625H400.125L615.875 663Q625.125 673.25 633.25 678.75Q641.375 684.25 655.0 686.9375Q668.625 689.625 693.375 689.625Q734 689.625 751.4375 677.375Q768.875 665.125 772.8125 645.875Q776.75 626.625 776.75 605.25V74Q776.75 53.625 772.8125 34.4375Q768.875 15.25 751.375 3.4375Q733.875 -8.375 692.375 -8.375Q651.875 -8.375 634.4375 3.875Q617 16.125 613.0625 35.8125Q609.125 55.5 609.125 76V396.25L476 211.25Q472.125 206.375 464.625 197.25Q457.125 188.125 443.375 180.9375Q429.625 173.75 405.25 173.75Q380.875 173.75 366.8125 180.9375Q352.75 188.125 345.3125 196.8125Q337.875 205.5 333.625 211.5L201.5 395.375V74Q201.5 53.625 197.5625 34.4375Q193.625 15.25 176.1875 3.4375Q158.75 -8.375 117.25 -8.375Z\"/><path transform=\"translate(812 0)\" d=\"M127.625 -9.25Q86.875 -9.25 69.4375 2.9375Q52 15.125 48.1875 34.8125Q44.375 54.5 44.375 75.125V607.125Q44.375 654.75 63.1875 672.625Q82 690.5 130.625 690.5H502.625Q524.125 690.5 542.875 686.625Q561.625 682.75 573.75 665.3125Q585.875 647.875 585.875 606.125Q585.875 565.375 573.6875 547.9375Q561.5 530.5 542.3125 526.6875Q523.125 522.875 501.625 522.875H211.875V414.125H407.625Q429.125 414.125 445.6875 410.6875Q462.25 407.25 472.25 392.4375Q482.25 377.625 482.25 341.125Q482.25 306.5 472.25 291.25Q462.25 276 444.75 273.0625Q427.25 270.125 405.625 270.125H211.875V158.375H502.625Q524.125 158.375 542.875 154.5Q561.625 150.625 573.75 133.1875Q585.875 115.75 585.875 74.125Q585.875 33.375 573.6875 15.9375Q561.5 -1.5 542.3125 -5.375Q523.125 -9.25 501.625 -9.25Z\"/><path transform=\"translate(1418 0)\" d=\"M116.375 -9.125Q76.75 -9.125 59.375 3.125Q42 15.375 38.0625 34.625Q34.125 53.875 34.125 75.25V609.375Q34.125 629.75 38.125 647.9375Q42.125 666.125 60.125 677.875Q78.125 689.625 118.75 689.625Q159.125 689.625 174.0 679.8125Q188.875 670 201.125 654.125L472.125 285.5V609.375Q472.125 629.75 476.5 647.9375Q480.875 666.125 498.375 677.875Q515.875 689.625 556.5 689.625Q597.875 689.625 614.875 677.375Q631.875 665.125 635.75 645.875Q639.625 626.625 639.625 605.25V74.25Q639.625 53.75 635.5625 34.5625Q631.5 15.375 613.875 3.125Q596.25 -9.125 554.75 -9.125Q523.75 -9.125 507.4375 -3.9375Q491.125 1.25 479.625 16.5L200.75 389.5V74.25Q200.75 53.75 196.8125 34.5625Q192.875 15.375 175.375 3.125Q157.875 -9.125 116.375 -9.125Z\"/><path transform=\"translate(2094 0)\" d=\"M339.125 -18.875Q264.625 -18.875 207.9375 10.4375Q151.25 39.75 112.6875 88.5625Q74.125 137.375 54.75 197.0625Q35.375 256.75 35.375 317.5V607.125Q35.375 628.625 39.25 647.8125Q43.125 667 60.5625 679.1875Q78 691.375 119.625 691.375Q161.375 691.375 178.8125 679.1875Q196.25 667 200.125 647.8125Q204 628.625 204 606.125V317.5Q204 278.875 216.8125 240.3125Q229.625 201.75 259.75 175.625Q289.875 149.5 342.125 149.5Q383.875 149.5 414.375 170.375Q444.875 191.25 461.625 229.375Q478.375 267.5 478.375 318.5V612.25Q478.375 632.625 482.6875 650.3125Q487 668 504.5 679.6875Q522 691.375 562.75 691.375Q604.375 691.375 621.375 678.75Q638.375 666.125 642.1875 646.9375Q646 627.75 646 606.125V315.5Q646 253.875 626.1875 194.6875Q606.375 135.5 567.3125 87.1875Q528.25 38.875 471.0625 10.0Q413.875 -18.875 339.125 -18.875Z\"/></g></g><g class=\"cj-t cj-t-es\"><g fill=\"#E00C04\" transform=\"translate(198.3 -78) scale(0.0615 -0.0615)\"><path transform=\"translate(0 0)\" d=\"M379.875 -17.875Q338.375 -17.875 289.875 -4.8125Q241.375 8.25 193.5625 35.8125Q145.75 63.375 106.4375 106.5625Q67.125 149.75 43.5625 209.0625Q20 268.375 20 345.25Q20 419.375 43.5625 476.75Q67.125 534.125 106.0 576.125Q144.875 618.125 192.6875 644.6875Q240.5 671.25 289.875 684.25Q339.25 697.25 382.5 697.375Q433.375 697.375 471.875 685.25Q510.375 673.125 534.5625 659.9375Q558.75 646.75 565.125 642.5Q584.125 630.25 600.875 615.5Q617.625 600.75 617.875 576.625Q618.125 564 613.0 551.125Q607.875 538.25 597.875 524.5Q579.875 499.125 563.8125 487.375Q547.75 475.625 532 475.625Q519.5 475.625 508.125 481.625Q496.75 487.625 480.5 498.125Q473.625 503 461.5 509.9375Q449.375 516.875 428.8125 522.8125Q408.25 528.75 375.875 528.75Q345.625 528.75 312.5 517.8125Q279.375 506.875 251.0 484.125Q222.625 461.375 205.125 425.4375Q187.625 389.5 187.625 340.25Q187.625 290.125 205.5625 254.5625Q223.5 219 251.875 196.25Q280.25 173.5 313.375 162.5625Q346.5 151.625 375.875 151.625Q403.875 151.625 423.5625 156.6875Q443.25 161.75 458.4375 170.0625Q473.625 178.375 484.875 185.75Q495.875 193.5 508.125 199.5Q520.375 205.5 532.875 205.5Q548.625 205.5 564.25 192.9375Q579.875 180.375 597 154.125Q607 138.75 612.125 125.3125Q617.25 111.875 617 100.125Q616.75 76.875 600.0 62.5625Q583.25 48.25 564.25 36.875Q557 32.75 534.0625 19.0625Q511.125 5.375 472.625 -6.25Q434.125 -17.875 379.875 -17.875Z\"/><path transform=\"translate(637 0)\" d=\"M688.875 107.25Q702.625 79.875 703.5625 60.5625Q704.5 41.25 691.6875 26.5625Q678.875 11.875 650.5 -2.75Q606.5 -23.75 582.5625 -15.625Q558.625 -7.5 537.625 37.125L354.375 415.875L173 36.5Q151.125 -6.5 127.1875 -14.5625Q103.25 -22.625 60 -1.75Q31.625 11.875 18.4375 26.6875Q5.25 41.5 6.375 61.125Q7.5 80.75 21.375 108.625L278.375 641.875Q289.375 663.875 310.875 677.1875Q332.375 690.5 355.375 690.5Q371.875 690.5 386.0625 684.5625Q400.25 678.625 412.125 667.625Q424 656.625 431.375 640.875ZM191.375 144.875 260.375 287.625H449.5L518.375 144.875Z\"/><path transform=\"translate(1347 0)\" d=\"M125 -8.375Q84.25 -8.375 66.8125 3.8125Q49.375 16 45.5625 35.6875Q41.75 55.375 41.75 76V607.25Q41.75 627.75 45.6875 646.875Q49.625 666 67.0625 678.25Q84.5 690.5 126 690.5H330.25Q370.125 690.5 413.5625 675.1875Q457 659.875 494.5 628.5Q532 597.125 555.5625 550.0625Q579.125 503 579.125 438.625Q579.125 394.5 566.0625 354.875Q553 315.25 527.1875 282.6875Q501.375 250.125 464.25 226.0625Q427.125 202 378.875 189.75H209.25V75Q209.25 54.375 205.375 35.1875Q201.5 16 184.0625 3.8125Q166.625 -8.375 125 -8.375ZM545.625 13.5Q504.625 -17.125 480.5625 -10.9375Q456.5 -4.75 429.375 31.875L249.375 282.875L439.125 307L565.5 131.125Q583.875 104.375 588.8125 85.875Q593.75 67.375 583.5 50.875Q573.25 34.375 545.625 13.5ZM209.25 356.125H334Q345.25 356.125 359.0 360.4375Q372.75 364.75 384.4375 374.6875Q396.125 384.625 403.875 400.5Q411.625 416.375 411.625 439.625Q411.625 464.375 400.6875 483.125Q389.75 501.875 371.0 512.375Q352.25 522.875 328.25 522.875H209.25Z\"/><path transform=\"translate(1954 0)\" d=\"M555.25 691.375Q573.25 691.375 588.875 688.375Q604.5 685.375 614.875 670.5625Q625.25 655.75 625.25 620.125Q625.25 585.5 614.8125 570.25Q604.375 555 588.25 552.0625Q572.125 549.125 554.125 549.125H404.625V72.375Q404.625 51.75 400.75 33.0Q396.875 14.25 379.875 2.5Q362.875 -9.25 321.25 -9.25Q281.375 -9.25 263.9375 2.9375Q246.5 15.125 243.125 33.9375Q239.75 52.75 239.75 73.375V549.125H89Q71.875 549.125 55.75 552.5Q39.625 555.875 29.1875 570.6875Q18.75 585.5 18.75 621Q18.75 655.75 29.125 670.5625Q39.5 685.375 56.0625 688.375Q72.625 691.375 89.625 691.375Z\"/><path transform=\"translate(2598 0)\" d=\"M688.875 107.25Q702.625 79.875 703.5625 60.5625Q704.5 41.25 691.6875 26.5625Q678.875 11.875 650.5 -2.75Q606.5 -23.75 582.5625 -15.625Q558.625 -7.5 537.625 37.125L354.375 415.875L173 36.5Q151.125 -6.5 127.1875 -14.5625Q103.25 -22.625 60 -1.75Q31.625 11.875 18.4375 26.6875Q5.25 41.5 6.375 61.125Q7.5 80.75 21.375 108.625L278.375 641.875Q289.375 663.875 310.875 677.1875Q332.375 690.5 355.375 690.5Q371.875 690.5 386.0625 684.5625Q400.25 678.625 412.125 667.625Q424 656.625 431.375 640.875ZM191.375 144.875 260.375 287.625H449.5L518.375 144.875Z\"/></g></g><path d=\"M-120 0c40-18 80-18 120 0s80 18 120 0\" transform=\"translate(300 -44) scale(.9)\" fill=\"none\" stroke=\"#039BE5\" stroke-width=\"11\" stroke-linecap=\"round\"/><path d=\"M-120 0c40-18 80-18 120 0s80 18 120 0\" transform=\"translate(300 -150) scale(.55)\" fill=\"none\" stroke=\"#039BE5\" stroke-width=\"12\" stroke-linecap=\"round\" opacity=\"0\"/></g></g><path d=\"M294 66A160 160 0 1 0 72 297Z\" fill=\"#E00C04\"/></g></g> <g class=\"cj-garra-d\"><path class=\"cj-mand-d\" d=\"M529 305L453 230C451.0 234.7 442.7 249.5 441 258C439.3 266.5 441.2 274.3 443 281C444.8 287.7 447.7 292.8 452 298C456.3 303.2 463.0 308.7 469 312C475.0 315.3 482.0 317.0 488 318C494.0 319.0 498.2 320.2 505 318C511.8 315.8 525.0 307.2 529 305Z\" fill=\"#901B1E\" stroke=\"#901B1E\" stroke-width=\"5\" stroke-linejoin=\"round\"/><path d=\"M370 138A115 115 0 1 1 529 304Z\" fill=\"#E00C04\"/></g> </g></g></svg>";
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);
  var a=document.createElement('div'); a.className='cj';
  a.setAttribute('data-lg',LG); a.setAttribute('data-lado','esquerda');
  a.innerHTML='<span class="cj-mover"><span class="cj-sobe"><a class="cj-link" href="cardapio.html">'+SVG+'</a><span class="cj-fala" aria-hidden="true"></span>'+
    '<button class="cj-x" type="button"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></span></span>';
  document.body.appendChild(a);
  var mover=a.firstChild, sobeEl=mover.firstChild, lk=a.querySelector('.cj-link'), bx=a.querySelector('.cj-x'), fala=a.querySelector('.cj-fala'), svg=lk.querySelector('svg');
  lk.setAttribute('aria-label',T('Abrir cardápio')); bx.setAttribute('aria-label',T('Fechar o caranguejo'));
  var calmo=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mouse=window.matchMedia&&matchMedia('(hover: hover) and (pointer: fine)').matches;
  var x=0, anim=null, tok=0, ultimaReacao=0, ultimaAuto=0, emCima=false, ja={}, pousado=false, fechado=false;
  /* celular e tablet: ele faz visitas (aparece, interage e vai embora); no computador fica mais tempo no canto */
  function curto(){return innerWidth<=992||!mouse}
  function nada(){}
  function lado(){return a.getAttribute('data-lado')}
  function sinal(){return lado()==='direita'?-1:1}
  function pos(n){var w=a.offsetWidth;return sinal()*({fora:-(w+50),borda:-w*.67,espia:-w*.55,quase:-w*.32,canto:12})[n]}
  function espera(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function agoraX(){var m=getComputedStyle(mover).transform;if(!m||m==='none')return x;var v=m.match(/matrix\(([^)]+)\)/);return v?parseFloat(v[1].split(',')[4])||0:x}
  function poe(v){if(anim){anim.cancel();anim=null}x=v;mover.style.transform='translateX('+v+'px)';marcaEsp()}
  /* escondido em parte: a área toda dele recebe o toque e o mouse, para ele poder sair da beirada */
  function marcaEsp(){var r=mover.getBoundingClientRect();a.classList.toggle('cj-esp',r.left<-6||r.right>innerWidth+6)}
  function vai(ate,vel,lento){
    var de=anim?agoraX():x; if(anim){anim.cancel();anim=null}
    mover.style.transform='translateX('+de+'px)'; x=ate;
    if(Math.abs(ate-de)<1){return Promise.resolve()}
    a.classList.add('anda'); a.classList.toggle('lento',!!lento);
    var an=anim=mover.animate([{transform:'translateX('+de+'px)'},{transform:'translateX('+ate+'px)'}],{duration:Math.max(250,Math.abs(ate-de)/vel*1000),easing:'linear',fill:'forwards'});
    function fim(){if(anim===an){a.classList.remove('anda','lento');mover.style.transform='translateX('+ate+'px)';anim=null;an.cancel();marcaEsp()}}
    return an.finished.then(fim,fim);
  }
  /* balão: abre para o lado em que há espaço */
  var tFala;
  /* o balão vai para o lado (ou para cima) onde não cobre texto nem foto */
  function diz(txt,ms,estrito){
    clearTimeout(tFala); fala.textContent=txt; fala.style.bottom='';
    var ops=lado()==='direita'?['cj-inv','','cj-fcima']:['','cj-inv','cj-fcima'], melhor=ops[0], menor=1e12, area=1;
    for(var i=0;i<ops.length;i++){
      a.classList.remove('cj-inv','cj-fcima'); if(ops[i])a.classList.add(ops[i]);
      var f=fala.getBoundingClientRect(), ex=f.width*.1, ey=f.height*.1, R={l:f.left-ex,r:f.right+ex,t:f.top-ey,b:f.bottom+ey};
      var sai=R.l<4||R.r>innerWidth-4||R.t<navH()+4||R.b>innerHeight-4, v=cobre(R)+(sai?1e9:0);
      area=(R.r-R.l)*(R.b-R.t);
      if(v===0){melhor=ops[i];menor=0;break}
      if(v<menor){menor=v;melhor=ops[i]}
    }
    a.classList.remove('cj-inv','cj-fcima'); if(melhor)a.classList.add(melhor);
    /* se em todo lugar o balão fosse cobrir bastante coisa, ele não fala (só faz o gesto) */
    if(menor>(estrito?0:area*.03)){fala.classList.remove('on');return}
    fala.classList.add('on'); tFala=setTimeout(function(){fala.classList.remove('on')},ms||2600);
  }
  function gesto(c,ms){a.classList.remove(c);void a.offsetWidth;a.classList.add(c);setTimeout(function(){a.classList.remove(c)},ms||1200)}
  /* chão: em cima do botão "Guardar minha mesa" quando ele está embaixo dele */
  var fab=document.getElementById('fab');
  function chaoDe(L){
    if(fab&&fab.classList.contains('on')&&!fab.classList.contains('hz-on')){
      var cheio=innerWidth<=992, cs=getComputedStyle(fab), btn=fab.firstElementChild;
      if(cheio||L==='direita')return (parseFloat(cs.bottom)||0)+(btn?btn.offsetHeight:52)+4;
    }
    return 14;
  }
  function chao(){var b=chaoDe(lado());if(b===14)a.style.removeProperty('--cj-chao');else a.style.setProperty('--cj-chao',b+'px')}
  if(fab&&window.MutationObserver)new MutationObserver(chao).observe(fab,{attributes:true,attributeFilter:['class']});
  var largura=innerWidth;
  addEventListener('resize',function(){
    if(pousado){if(innerWidth!==largura){largura=innerWidth;interrompe()}return}
    largura=innerWidth;chao();if(!anim)poe(pos(Math.abs(x-pos('canto'))<8?'canto':x===0?'canto':'fora'))});
  /* para onde ele olha e aponta */
  function centroGarra(){var r=svg.getBoundingClientRect(),k=r.width/640;return {x:r.left+(450+10)*k,y:r.top+(250+200)*k}}
  function mira(el){
    var r=el.getBoundingClientRect(), g=centroGarra();
    var tx=Math.max(8,Math.min(innerWidth-8,r.left+r.width/2)), ty=Math.max(8,Math.min(innerHeight-8,r.top+Math.min(r.height/2,innerHeight*.4)));
    var ang=Math.atan2(ty-g.y,tx-g.x)*180/Math.PI, rot=Math.max(-70,Math.min(80,ang+90));
    a.style.setProperty('--cj-ang',rot.toFixed(1)+'deg');
    var d=Math.hypot(tx-g.x,ty-g.y)||1; a.style.setProperty('--cj-ox',((tx-g.x)/d*7).toFixed(1)+'px'); a.style.setProperty('--cj-oy',((ty-g.y)/d*6).toFixed(1)+'px');
    return {tx:tx,ty:ty,g:g,r:r};
  }
  function solta(){setTimeout(function(){a.style.removeProperty('--cj-ox');a.style.removeProperty('--cj-oy')},400)}
  function aponta(el){if(!el)return gesto('chama');mira(el);gesto('aponta',2700);solta()}
  var corda=null;
  function puxa(el){
    if(!el)return gesto('chama');
    var m=mira(el), dirX=m.r.left+m.r.width/2<m.g.x?1:-1;
    a.style.setProperty('--cj-sentido',dirX===1?'-1':'1');
    gesto('puxa',1600);
    var px=dirX===1?m.r.right-14:m.r.left+14, py=Math.max(10,Math.min(m.r.bottom-18,m.r.top+m.r.height*.6,innerHeight*.72));
    if(!corda){corda=document.createElementNS('http://www.w3.org/2000/svg','svg');corda.setAttribute('class','cj-corda');corda.setAttribute('aria-hidden','true');corda.innerHTML='<path/>';document.body.appendChild(corda)}
    var p=corda.firstChild, sx=m.g.x, sy=m.g.y, mx=(sx+px)/2, my=Math.max(sy,py)+16;
    p.setAttribute('d','M'+sx+' '+sy+'Q'+mx+' '+my+' '+px+' '+py);
    var L=p.getTotalLength(); p.style.strokeDasharray=L; corda.style.display='';
    p.animate([{strokeDashoffset:L,opacity:1},{strokeDashoffset:0,opacity:1,offset:.22},{strokeDashoffset:0,opacity:1,offset:.85},{strokeDashoffset:0,opacity:0}],{duration:1700,easing:'ease-out',fill:'forwards'});
    el.style.setProperty('--cj-dx',(dirX*-1*14)+'px'); el.style.setProperty('--cj-rot',(dirX*-1.5)+'deg');
    el.classList.remove('cj-puxado'); void el.offsetWidth; el.classList.add('cj-puxado');
    setTimeout(function(){el.classList.remove('cj-puxado')},1600); solta();
  }
  /* o passeio: espia de mansinho, finge que vai embora, mostra a placa, some e aparece do outro lado */
  function ok(t){return t===tok}
  /* o passeio: espia de mansinho, entra, finge que vai embora, mostra a placa e fica no canto, inteiro, oferecendo o cardápio;
     depois de um tempo some e aparece do outro lado */
  var OFERTAS=['Bateu fome? Me toca!','O cardápio tá aqui!','Olha o cardápio!'], nOf=0;
  function oferta(){return T(OFERTAS[nOf++%OFERTAS.length])}
  var modo='fora', tAparece=0;   /* fora | canto | espia | pouso | onda */
  function outroLado(){return lado()==='direita'?'esquerda':'direita'}
  function cancela(e){if(e&&e.getAnimations)e.getAnimations().forEach(function(n){n.cancel()})}

  /* ===== espaço livre: ele só aparece onde não cobre textos nem fotos ===== */
  var obsCache=null, obsT=0;
  function obstaculos(){
    var agora=Date.now(); if(obsCache&&agora-obsT<200)return obsCache;
    var vh=innerHeight, vw=innerWidth, out=[], rg=document.createRange(), vis=new Map(), n;
    function add(r,el){if(r.width<2||r.height<2||r.bottom<-40||r.top>vh+40||r.right<0||r.left>vw)return;out.push({l:r.left,t:r.top,r:r.right,b:r.bottom,el:el})}
    var tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while((n=tw.nextNode())){
      if(!/\S/.test(n.nodeValue))continue; var p=n.parentElement;
      if(!p||a.contains(p)||/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(p.tagName))continue;
      var v=vis.get(p); if(v===undefined){var pr=p.getBoundingClientRect();v=pr.width>0&&pr.bottom>-40&&pr.top<vh+40&&getComputedStyle(p).visibility!=='hidden';vis.set(p,v)}
      if(!v)continue; rg.selectNodeContents(n); var rs=rg.getClientRects(); for(var i=0;i<rs.length;i++)add(rs[i],p);
    }
    [].forEach.call(document.querySelectorAll('img,video,iframe,canvas,input,select,textarea,button,.btn'),function(el){
      if(a.contains(el))return; var r=el.getBoundingClientRect(); if(el.tagName==='IMG'&&(r.width<40||r.height<40))return; add(r,el)});
    obsCache=out; obsT=agora; return out;
  }
  function livre(R,ign){
    var o=obstaculos();
    for(var i=0;i<o.length;i++){var q=o[i]; if(ign&&(ign===q.el||ign.contains(q.el)))continue; if(q.r>R.l&&q.l<R.r&&q.b>R.t&&q.t<R.b)return false}
    return true;
  }
  function cobre(R){var o=obstaculos(),s=0;for(var i=0;i<o.length;i++){var q=o[i],w=Math.min(q.r,R.r)-Math.max(q.l,R.l),h=Math.min(q.b,R.b)-Math.max(q.t,R.t);if(w>0&&h>0)s+=w*h}return s}
  /* o corpo dele com os pés em (x,y) e largura w; e o lugar do "x" de fechar */
  function corpo(x,y,w){var h=w*750/640;return {l:x+w*.06,r:x+w*.94,t:y-h*.97,b:y-2}}
  function xRect(x,y,w){var h=w*750/640;return {l:x+w-30,r:x+w+4,t:y-h-38,b:y-h-4}}
  function largCanto(){return innerWidth<=400?100:innerWidth<=992?112:150}
  function largPouso(){return innerWidth<=400?76:innerWidth<=992?80:128}
  function navH(){return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav'))||72}
  function cantoXY(L){var w=largCanto();return {x:L==='direita'?innerWidth-w-12:12,y:innerHeight-chaoDe(L),w:w}}
  function cantoLivre(L){var c=cantoXY(L);return livre(corpo(c.x,c.y,c.w))}
  function ladoLivre(){var L=lado(),o=outroLado();return cantoLivre(L)?L:cantoLivre(o)?o:null}
  function espiaLivre(L){var c=cantoXY(L),R=corpo(c.x,c.y,c.w);if(L==='direita'){R.l=innerWidth-c.w*.45;R.r=innerWidth}else{R.l=0;R.r=c.w*.45}return livre(R)}
  /* o "x" de fechar só aparece se não for cobrir nada */
  function marcaX(){var q=bx.getBoundingClientRect(),cx=(q.left+q.right)/2,cy=(q.top+q.bottom)/2;a.classList.toggle('cj-semx',!livre({l:cx-17,r:cx+17,t:cy-17,b:cy+17}))}
  /* erguer a placa só se ela não for cobrir nada em cima dele */
  function mostra(ms){var r=lk.getBoundingClientRect();gesto(livre({l:r.left+r.width*.15,r:r.left+r.width*.8,t:r.top-r.height*.32,b:r.top+2})?'mostra':'chama',ms||1700)}

  /* ===== o passeio ===== */
  function depois(t,ms){espera(ms).then(function(){if(ok(t))ciclo(t)})}
  function sair(t,vel){modo='fora';fala.classList.remove('on');return vai(pos('fora'),vel||170).then(function(){if(!ok(t))throw 0})}
  /* anda até o canto do lado L (se estiver do outro lado, sai e entra por L) */
  function irPara(t,L,vel){
    var p=Promise.resolve();
    if(lado()!==L){p=(modo==='fora'?p:vai(pos('fora'),vel||320)).then(function(){if(!ok(t))throw 0;a.setAttribute('data-lado',L);poe(pos('fora'))})}
    return p.then(function(){if(!ok(t))throw 0;chao();modo='canto';return vai(pos('canto'),vel||150)}).then(function(){if(!ok(t))throw 0;marcaX()});
  }
  var nVis=0, VEZ=['pouso','canto','pouso','espia'];
  function ciclo(t){
    if(fechado||!ok(t))return;
    if(document.hidden||a.classList.contains('cj-sai')||modo==='onda')return depois(t,1500);
    var L=ladoLivre(), sp;
    if(nVis===0){
      if(L){nVis++;a.setAttribute('data-lado',L);poe(pos('fora'));return entrada(t).then(function(){if(curto())return visitaFim(t,1800);estadia(t,true)})['catch'](nada)}
      sp=achaLugar();if(sp){nVis++;return pousa(t,sp).then(function(){longe(t)})['catch'](nada)}
      return depois(t,1500);
    }
    if(!curto()){
      if(L){nVis++;return estadia(t,false,L)}
      sp=achaLugar();if(sp){nVis++;return pousa(t,sp).then(function(){longe(t)})['catch'](nada)}
      return depois(t,1500);
    }
    /* celular: cada visita é de um jeito; se o jeito da vez não tiver lugar livre, tenta outro */
    var ordem=[VEZ[(nVis-1)%VEZ.length],'pouso','canto','espia'];
    for(var i=0;i<ordem.length;i++){
      if(ordem[i]==='pouso'){sp=achaLugar();if(sp){nVis++;pousa(t,sp).then(function(){longe(t)})['catch'](nada);return}}
      else if(ordem[i]==='canto'&&L){nVis++;irPara(t,L).then(function(){mostra();diz(oferta(),2600);return visitaFim(t,3000)})['catch'](nada);return}
      else if(ordem[i]==='espia'){var E=espiaLivre(lado())?lado():espiaLivre(outroLado())?outroLado():null;
        if(E){nVis++;a.setAttribute('data-lado',E);poe(pos('fora'));espiaVolta(t).then(function(){longe(t)})['catch'](nada);return}}
    }
    depois(t,1800);
  }
  /* celular: depois de um tempinho no canto, vai embora */
  function visitaFim(t,ms){
    return espera(ms).then(function sai(){if(!ok(t))throw 0;if(document.hidden||emCima||Date.now()-ultimaReacao<2500)return espera(1200).then(sai)})
     .then(function(){return sair(t)}).then(function(){longe(t)})['catch'](nada);
  }
  /* a entrada: espia de mansinho, entra, finge que vai embora e mostra a placa */
  function entrada(t){
    return Promise.resolve().then(function(){chao();modo='canto';return vai(pos('espia'),55,true)}).then(function(){if(!ok(t))throw 0;diz(T('Psiu!'),1400);return espera(1500)})
       .then(function(){if(!ok(t))throw 0;return vai(pos('canto'),150)}).then(function(){if(!ok(t))throw 0;marcaX();return espera(1400)})
       .then(function(){if(!ok(t))throw 0;return vai(pos('quase'),170)}).then(function(){if(!ok(t))throw 0;return espera(600)})
       .then(function(){if(!ok(t))throw 0;return vai(pos('canto'),240)}).then(function(){if(!ok(t))throw 0;marcaX();gesto('chama');diz(T('Brincadeira! Tô aqui!'),2000);return espera(2400)})
       .then(function(){if(!ok(t))throw 0;mostra();diz(T('Olha o cardápio!'),2800);return espera(3200)});
  }
  /* fica um tempo fora da tela, deixando a pessoa à vontade, e volta pelo outro lado */
  function longe(t){
    if(!ok(t)||fechado)return; modo='fora';
    a.setAttribute('data-lado',outroLado());poe(pos('fora'));chao();
    espera(curto()?7000+Math.random()*5000:2500+Math.random()*2500).then(function(){if(ok(t))ciclo(t)});
  }
  function espiaVolta(t){chao();modo='espia';return vai(pos('espia'),70,true).then(function(){if(!ok(t))throw 0;diz(T('Psiu!'),1600);return espera(2800)}).then(function(){if(!ok(t))throw 0;return sair(t,120)})}
  /* no computador: fica no canto (enquanto ele estiver livre) oferecendo o cardápio, e às vezes sai para um pouso */
  function estadia(t,chegou,L){
    var voltas=0, p=chegou?Promise.resolve():irPara(t,L||lado());
    return p.then(function fica(){return espera(6500).then(function(){
        if(!ok(t))throw 0;
        if(document.hidden||emCima||ocupadoComForm()||Date.now()-ultimaReacao<9000)return fica();
        if(++voltas>3)return;
        if(voltas===2){var sp=achaLugar();
          if(sp)return sair(t,150).then(function(){return pousa(t,sp)}).then(function(){if(!ok(t))throw 0;var L2=ladoLivre();if(!L2)throw 'sem';return irPara(t,L2)})
            .then(function(){if(!ok(t))throw 0;gesto('chama');diz(T('Achou!'),1800);return espera(1800)}).then(fica);
          if(espiaLivre(lado()))return vai(pos('espia'),110,true).then(function(){if(!ok(t))throw 0;modo='espia';return espera(3200)})
            .then(function(){if(!ok(t))throw 0;if(!cantoLivre(lado()))throw 'sem';return irPara(t,lado())}).then(function(){if(!ok(t))throw 0;gesto('chama');diz(T('Achou!'),1800);return espera(1800)}).then(fica);
        }
        /* oferece o cardápio: dá uns passinhos para dentro (se ali estiver livre), ergue a placa e fala */
        var c=cantoXY(lado()), passo=livre(corpo(c.x+sinal()*28,c.y,c.w))?28:0;
        return vai(pos('canto')+sinal()*passo,70,true).then(function(){if(!ok(t))throw 0;mostra();diz(oferta(),2600);return espera(2500)})
          .then(function(){if(!ok(t))throw 0;return vai(pos('canto'),70,true)}).then(fica);
      })})
     .then(function(){if(!ok(t))throw 0;return espera(4000)})
     .then(function sai(){if(!ok(t))throw 0;if(document.hidden||emCima||ocupadoComForm()||Date.now()-ultimaReacao<12000)return espera(2000).then(sai)})
     .then(function(){return sair(t,150)}).then(function(){longe(t)})
     ['catch'](function(e){if(e==='sem'&&ok(t))sair(t,200).then(function(){longe(t)})['catch'](nada)});
  }
  /* algo da página passou por baixo dele no canto: sai e volta depois num lugar livre */
  function vigia(){
    if(fechado||modo!=='canto'||pousado||emCima)return;
    if(cantoLivre(lado()))return;
    /* desce rápido para fora da tela (em vez de atravessar o que chegou), e volta depois num lugar livre */
    var t=++tok; clearTimeout(tReage); modo='fora'; fala.classList.remove('on'); if(anim){anim.cancel();anim=null;a.classList.remove('anda','lento')}
    a.classList.add('cj-desce');
    espera(260).then(function(){poe(pos('fora'));a.classList.remove('cj-desce');if(ok(t))longe(t)});
  }
  /* rolando a página com ele no canto: confere logo se ainda está livre */
  var tRola=0; addEventListener('scroll',function(){if(modo!=='canto'||Date.now()-tRola<150)return;tRola=Date.now();obsT=0;vigia()},{passive:true});

  /* ===== pouso: sai de trás de um título, de um botão ou de uma foto, num lugar onde não cobre nada ===== */
  var PISOS_T='h1,h2,h3,.occ__n,p.script', PISOS_B='a.btn,button.btn', ultPouso=null, nPouso=0, rolou=false, y0=0;
  /* a primeira linha do título: onde ficam as letras de cima */
  function linha(el){
    var rg=document.createRange();rg.selectNodeContents(el);
    var rs=[].slice.call(rg.getClientRects()).filter(function(r){return r.width>6&&r.height>6});if(!rs.length)return null;
    var fs=parseFloat(getComputedStyle(el).fontSize)||32, topo=Math.min.apply(null,rs.map(function(r){return r.top}));
    var l1=rs.filter(function(r){return r.top<topo+fs*.5}), l=Math.min.apply(null,l1.map(function(r){return r.left})), d=Math.max.apply(null,l1.map(function(r){return r.right})), hh=Math.max.apply(null,l1.map(function(r){return r.height}));
    return {l:l,r:d,y:topo+hh*.27};
  }
  /* botão preso na tela (como o "Guardar minha mesa" do celular): o pouso fica preso na tela também */
  function preso(el){for(var e=el;e&&e!==document.body;e=e.parentElement)if(getComputedStyle(e).position==='fixed')return true;return false}
  /* não pousa em algo que ainda está se mexendo (entrando na tela, por exemplo): a posição mudaria depois */
  function mexendo(el){
    if(!document.getAnimations)return false;
    return document.getAnimations().some(function(n){
      var e=n.effect&&n.effect.target; if(!e||!e.contains||n.playState!=='running'||(a.contains(e)))return false;
      var inf=n.effect.getTiming&&n.effect.getTiming().iterations===Infinity;
      return e.contains(el)||(!inf&&el.contains(e));
    });
  }
  function achaLugar(op){
    op=op||{};
    if(fechado||document.hidden||a.classList.contains('cj-sai'))return null;
    var w=largPouso(), h=w*750/640, topo=navH()+8, vw=innerWidth, vh=innerHeight, lista=[];
    function piso(el,kind,g,fixo){
      if(!g||g.r-g.l<24||g.y-h<topo||g.y>vh-6)return;
      var xa=Math.max(6,g.l-w*(kind==='texto'?.15:.1)), xb=Math.min(vw-w-6,g.r-w*(kind==='texto'?.85:.9));
      if(xb<xa){var xc=(g.l+g.r)/2-w/2;if(xc<6||xc>vw-w-6)return;xa=xb=xc}
      var dentro=false, ini=0, xx;
      for(xx=xa;xx<=xb+.5;xx+=8){
        var ok1=livre(corpo(xx,g.y,w),el);
        if(ok1&&!dentro){dentro=true;ini=xx} if(!ok1&&dentro){dentro=false;lista.push({el:el,kind:kind,y:g.y,a:ini,b:xx-8,fixo:fixo})}
      }
      if(dentro)lista.push({el:el,kind:kind,y:g.y,a:ini,b:Math.min(xb,xx-8),fixo:fixo});
    }
    function serve(el){if(!el.offsetParent||el.closest('nav,header,.cj'))return null;var r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh||r.width<24)return null;
      var cs=getComputedStyle(el);if(parseFloat(cs.opacity)<.9||cs.visibility==='hidden'||mexendo(el))return null;return r}
    [].forEach.call(document.querySelectorAll(PISOS_T),function(el){if(el.id==='vem'||parseFloat(getComputedStyle(el).fontSize)<22||!serve(el))return;piso(el,'texto',linha(el),false)});
    [].forEach.call(document.querySelectorAll(PISOS_B),function(el){var r=serve(el);if(r)piso(el,'botao',{l:r.left,r:r.right,y:r.top},preso(el))});
    [].forEach.call(document.querySelectorAll('img'),function(el){if(/logo|selo|placa|folha|ic-/.test(el.getAttribute('src')||''))return;var r=serve(el);if(!r||r.width<120||r.height<80)return;piso(el,'foto',{l:r.left,r:r.right,y:r.top},preso(el))});
    if(!lista.length)return null;
    var sp;
    if(op.perto&&op.perto.getBoundingClientRect){
      /* reação: o lugar livre mais perto do que ele vai mostrar */
      var q=op.perto.getBoundingClientRect(),cx=q.left+q.width/2,cy=q.top+Math.min(q.height/2,vh*.4);
      lista.forEach(function(s){s.x=Math.max(s.a,Math.min(s.b,cx-w/2));s.d=Math.hypot(s.x+w/2-cx,(s.y-h/2)-cy)});
      lista.sort(function(p,q){return p.d-q.d});sp=lista[0];sp.x0=sp.x1=sp.x;
    }else{
      var pref=['texto','foto','botao'][nPouso++%3], cand=lista.filter(function(s){return s.el!==ultPouso});if(!cand.length)cand=lista;
      var mesmo=cand.filter(function(s){return s.kind===pref});if(mesmo.length)cand=mesmo;
      sp=cand[Math.floor(Math.random()*cand.length)];
      if(sp.kind==='texto'&&sp.b-sp.a>=40){var L=Math.min(sp.b-sp.a,curto()?200:300),i0=sp.a+Math.random()*(sp.b-sp.a-L);sp.x0=i0;sp.x1=i0+L;if(Math.random()<.5){var s2=sp.x0;sp.x0=sp.x1;sp.x1=s2}}
      else sp.x0=sp.x1=sp.a+(sp.b-sp.a)*Math.random();
    }
    sp.x0=Math.round(sp.x0);sp.x1=Math.round(sp.x1);ultPouso=sp.el;
    sp.xLivre=livre(xRect(sp.x0,sp.y,w))&&livre(xRect(sp.x1,sp.y,w));
    var href=sp.el.getAttribute&&sp.el.getAttribute('href')||'';
    sp.oi=sp.x0!==sp.x1?'Licença, tô passando!':'Psiu!';
    sp.txt=sp.kind==='botao'&&/reservar/.test(href)?'Vai, garante a sua mesa!':OFERTAS[nOf++%OFERTAS.length];
    return sp;
  }
  /* sobe (ou desce) por trás da linha: o corte acompanha o movimento */
  function sobe(t,de,ate,ms){
    var pe=lk.offsetHeight*.02, c=function(v){return 'inset(-400px -400px '+(v+pe).toFixed(1)+'px -400px)'};
    var o={duration:ms,easing:de>ate?'cubic-bezier(.2,.9,.3,1.12)':'cubic-bezier(.55,0,.8,.2)',fill:'forwards'};
    var a1=sobeEl.animate([{transform:'translateY('+de+'px)'},{transform:'translateY('+ate+'px)'}],o), a2=lk.animate([{clipPath:c(de)},{clipPath:c(ate)}],o);
    function fim(){if(!ok(t))return;sobeEl.style.transform='translateY('+ate+'px)';lk.style.clipPath=c(ate);a1.cancel();a2.cancel()}
    return a2.finished.then(fim,fim).then(function(){if(!ok(t))throw 0});
  }
  function pousa(t,sp){
    if(!ok(t)||fechado)return Promise.reject(0);
    cancela(sobeEl);cancela(lk);
    pousado=true; modo='pouso'; rolou=false; y0=scrollY; fala.classList.remove('on');
    a.setAttribute('data-lado','esquerda'); a.classList.add('cj-pousa'); a.classList.toggle('cj-fixo',!!sp.fixo); a.classList.toggle('cj-semx',!sp.xLivre);
    var h=lk.offsetHeight, fundo=h+6, anda=sp.x1-sp.x0, dx=sp.fixo?0:scrollX, dy=sp.fixo?0:scrollY;
    a.style.left=(sp.x0+dx)+'px'; a.style.top=(sp.y+dy-h*.98)+'px';
    poe(0); sobeEl.style.transform='translateY('+fundo+'px)'; lk.style.clipPath='inset(-400px -400px '+(fundo+h*.02).toFixed(1)+'px -400px)';
    return sobe(t,fundo,0,700)
     .then(function(){a.classList.add('cj-em-pe');
        if(sp.reacao){if(sp.acao)sp.acao();else gesto('chama');diz(sp.txt,sp.ms||3000);return espera(3600)}
        gesto('chama');diz(T(sp.oi),anda?2600:1600);return espera(1300)})
     .then(function(){if(!ok(t))throw 0;if(sp.reacao||rolou||!anda)return;return vai(anda,curto()?52:66,true)})
     .then(function(){if(!ok(t))throw 0;if(rolou||sp.reacao)return;mostra();diz(T(sp.txt),2800);var ini=Date.now(),lim=sp.kind==='botao'?6500:3200;
        return (function fica(){if(!ok(t))throw 0;if(rolou||(Date.now()-ini>lim&&!emCima))return;return espera(200).then(fica)})()})
     .then(function(){if(!ok(t))throw 0;fala.classList.remove('on');a.classList.remove('cj-em-pe');return sobe(t,0,fundo,rolou?380:520)})
     .then(function(){if(!ok(t))throw 0;desfazPouso()});
  }
  function desfazPouso(){
    if(!pousado)return; pousado=false; modo='fora';
    cancela(sobeEl);cancela(lk);
    if(anim){anim.cancel();anim=null}
    a.classList.remove('cj-pousa','cj-fixo','cj-onda','cj-em-pe','anda','lento','cj-semx'); a.style.left=''; a.style.top=''; a.style.removeProperty('--cj-w');
    sobeEl.style.transform=''; lk.style.clipPath=''; fala.classList.remove('on'); poe(pos('fora'));
  }
  function interrompe(){var t=++tok;clearTimeout(tReage);desfazPouso();longe(t)}
  /* rolou a página: ele para de andar e volta para trás do título, do botão ou da foto */
  addEventListener('scroll',function(){
    /* preso na tela (no "Guardar minha mesa"): a página passaria por baixo dele, então some na hora */
    if(pousado&&modo==='pouso'&&a.classList.contains('cj-fixo')&&Math.abs(scrollY-y0)>8){interrompe();return}
    if(!pousado||modo==='onda'||rolou||Math.abs(scrollY-y0)<50)return; rolou=true;
    if(anim){var xx=agoraX();anim.cancel();anim=null;a.classList.remove('anda','lento');x=xx;mover.style.transform='translateX('+xx+'px)'}
  },{passive:true});

  /* ===== "Vem pra cá!": ele surfa nas letras, subindo e descendo com a onda do nome ===== */
  var vem=document.getElementById('vem'), tOnda=0;
  function onda(){
    if(!vem||fechado||calmo||modo==='onda'||document.hidden||Date.now()-tOnda<25000)return;
    tOnda=Date.now(); ultimaReacao=Date.now(); var t=++tok; clearTimeout(tReage);
    var p=pousado?(desfazPouso(),Promise.resolve()):(modo==='canto'||modo==='espia')?sair(t,320):Promise.resolve();
    p.then(function(){if(!ok(t))throw 0;return surfa(t)}).then(function(){if(ok(t))longe(t)})['catch'](nada);
  }
  function surfa(t){
    var chs=[].slice.call(vem.querySelectorAll('.ch'));if(chs.length<3)return Promise.resolve();
    /* onde fica o topo de cada letra (a tinta, não a caixa) */
    var cs=getComputedStyle(vem), cx=document.createElement('canvas').getContext('2d'); cx.font=cs.fontStyle+' '+cs.fontWeight+' 100px '+cs.fontFamily;
    var mH=cx.measureText('H'), A=(mH.fontBoundingBoxAscent||90)/100, D=(mH.fontBoundingBoxDescent||28)/100;
    var asc=chs.map(function(c){var s=c.textContent.replace(/ /g,' ');return /\S/.test(s)?(cx.measureText(s).actualBoundingBoxAscent||70)/100:null});
    function topos(){return chs.map(function(c,i){var q=c.getBoundingClientRect();return {l:q.left,r:q.right,y:asc[i]==null?null:q.top+q.height*((1-A-D)/2+A-asc[i])}})}
    function alturaEm(T0,xp){ /* topo das letras na posição xp (entre palavras, liga as letras vizinhas) */
      var i,k=-1;for(i=0;i<T0.length;i++)if(xp>=T0[i].l&&xp<=T0[i].r){k=i;break}
      if(k<0)k=xp<T0[0].l?0:T0.length-1;
      if(T0[k].y!=null)return T0[k].y;
      var e=k,d=k;while(e>0&&T0[e].y==null)e--;while(d<T0.length-1&&T0[d].y==null)d++;
      var ye=T0[e].y,yd=T0[d].y;if(ye==null)return yd;if(yd==null)return ye;
      var f=(xp-T0[e].r)/Math.max(1,T0[d].l-T0[e].r);return ye+(yd-ye)*Math.max(0,Math.min(1,f));
    }
    /* o que está em cima das letras (o logo, por exemplo): ali ele mergulha atrás das letras para não cobrir */
    var irmaos=[];for(var e=vem.previousElementSibling;e;e=e.previousElementSibling)irmaos.push(e);
    function emCimaDe(){var o=obstaculos().filter(function(b){return !vem.contains(b.el)}).map(function(b){return b});
      irmaos.forEach(function(e){var q=e.getBoundingClientRect();if(!q.width||!q.height)return;
        /* selo redondo (com o anel tracejado em volta): conta como círculo, não como quadrado */
        if(/50%/.test(getComputedStyle(e).borderRadius)){var R=q.width/2*1.17;o.push({circ:1,cx:q.left+q.width/2,cy:q.top+q.height/2,R:R,l:q.left+q.width/2-R,r:q.left+q.width/2+R,b:q.top+q.height/2+R})}
        else o.push({l:q.left,r:q.right,t:q.top,b:q.bottom})});return o}
    var w=innerWidth<=400?66:innerWidth<=992?72:110;
    pousado=true; modo='onda'; fala.classList.remove('on'); a.setAttribute('data-lado','esquerda');
    a.style.setProperty('--cj-w',w+'px'); a.classList.add('cj-pousa','cj-fixo','cj-onda'); a.classList.remove('cj-em-pe'); poe(0);
    var h=lk.offsetHeight, fundo=h+6, pe=h*.02, vel=curto()?62:95, ini=null, ySm=null, falou=false, mergulho=0, obsOnda=null, obsT2=0;
    return new Promise(function(fim){
      function sai(){fim()}
      function quadro(agora){
        if(!ok(t)){return sai()}
        var vr=vem.getBoundingClientRect(); if(vr.bottom<0||vr.top>innerHeight){desfazPouso();return sai()}
        if(ini==null)ini=agora;
        var T1=topos(), x0=T1[0].l-w*.15, x1=T1[T1.length-1].r-w*.85, dur=Math.max(2500,(x1-x0)/vel*1000), el=agora-ini;
        var sobeMs=650, desceMs=520, paraMs=1700, subir=0, p=0;
        if(el<sobeMs){var e=el/sobeMs;subir=fundo*(1-(1-Math.pow(1-e,3)))}
        else if(el<sobeMs+dur){p=(el-sobeMs)/dur;if(!a.classList.contains('anda')){a.classList.add('anda','lento');a.classList.add('cj-em-pe')}if(!falou&&mergulho<4&&el>sobeMs+400){falou=true;diz(T('Pegando onda!'),2200,true)}}
        else if(el<sobeMs+dur+paraMs){p=1;if(a.classList.contains('anda')){a.classList.remove('anda','lento');gesto('chama');diz(T('Te espero na praia!'),2200)}}
        else if(el<sobeMs+dur+paraMs+desceMs){p=1;var e2=(el-sobeMs-dur-paraMs)/desceMs;subir=fundo*e2*e2;fala.classList.remove('on');a.classList.remove('cj-em-pe')}
        else{desfazPouso();return sai()}
        var xs=x0+(x1-x0)*p, ya=alturaEm(T1,xs+w*.3), yb=alturaEm(T1,xs+w*.7), y=Math.min(ya,yb);
        ySm=ySm==null?y:ySm+(y-ySm)*.35;
        var ang=Math.max(-14,Math.min(14,Math.atan2(yb-ya,w*.4)*180/Math.PI*.6));
        /* quanto ele precisa afundar atrás das letras para não cobrir o que está em cima */
        if(!obsOnda||agora-obsT2>250){obsOnda=emCimaDe();obsT2=agora}
        var livreAlt=1e9,l0=xs+w*.02,r0=xs+w*.98;
        obsOnda.forEach(function(b){if(b.r<l0||b.l>r0)return;var fundoB=b.b;
          if(b.circ){var dx=Math.max(l0,Math.min(r0,b.cx))-b.cx;if(Math.abs(dx)>=b.R)return;fundoB=b.cy+Math.sqrt(b.R*b.R-dx*dx)}
          if(fundoB>ySm+4)return;livreAlt=Math.min(livreAlt,ySm-fundoB-8)});
        var alvoM=Math.max(0,Math.min(fundo,h-livreAlt)); mergulho+=(alvoM-mergulho)*(alvoM>mergulho?.5:.2);
        var desce=Math.max(subir,0)+mergulho;
        a.style.left=xs.toFixed(1)+'px'; a.style.top=(ySm-h*.98).toFixed(1)+'px';
        sobeEl.style.transform='translateY('+desce.toFixed(1)+'px) rotate('+ang.toFixed(1)+'deg)';
        lk.style.clipPath='inset(-400px -400px '+(desce+pe).toFixed(1)+'px -400px)';
        requestAnimationFrame(quadro);
      }
      requestAnimationFrame(quadro);
    });
  }

  /* ===== reação: aparece num lugar livre (o canto, ou perto do que ele vai mostrar), faz o gesto e fala ===== */
  var tReage;
  function reage(txt,acao,ms,perto){
    if(fechado||pousado||modo==='onda')return;
    if(calmo){if(!a.classList.contains('cj-oculto'))diz(txt,3200);return}
    var L=(modo==='canto'&&!anim&&cantoLivre(lado()))?lado():ladoLivre(), sp=null;
    if(!L){sp=achaLugar({perto:perto});if(!sp)return false}   /* sem lugar livre: não aparece */
    ultimaReacao=Date.now();
    var t=++tok; clearTimeout(tReage); fala.classList.remove('on');
    if(sp){sp.reacao=true;sp.acao=acao;sp.txt=txt;sp.ms=ms;
      var p0=(modo==='canto'||modo==='espia')?sair(t,320):Promise.resolve();
      p0.then(function(){return pousa(t,sp)}).then(function(){longe(t)})['catch'](nada);return true}
    var noCanto=modo==='canto'&&!anim&&lado()===L&&Math.abs(x-pos('canto'))<6;
    (noCanto?Promise.resolve():irPara(t,L,280)).then(function(){
      if(!ok(t))return; if(acao)acao(); else gesto('chama'); diz(txt,ms||3000);
      tReage=setTimeout(function(){if(ok(t))depoisDaReacao(t)},3400);
    })['catch'](nada);
    return true;
  }
  function depoisDaReacao(t){
    if(modo!=='canto')return sair(t).then(function(){longe(t)})['catch'](nada);
    if(curto())return visitaFim(t,2600);
    estadia(t,true);
  }
  function ocupadoComForm(){var f=document.activeElement;return !!(f&&f.closest&&f.closest('form'))}
  /* quando a pessoa digita no celular, ele sai da frente do teclado */
  var CAMPO='input:not([type=radio]):not([type=checkbox]):not([type=range]),select,textarea';
  document.addEventListener('focusin',function(e){if(innerWidth<=992&&e.target.matches&&e.target.matches(CAMPO)){if(pousado)interrompe();a.classList.add('cj-sai')}});
  document.addEventListener('focusout',function(){setTimeout(function(){var f=document.activeElement;if(!(f&&f.matches&&f.matches(CAMPO)))a.classList.remove('cj-sai')},250)});
  function escondido(){var r=mover.getBoundingClientRect();return r.left<-6||r.right>innerWidth+6}
  function aparece(){
    if(fechado)return; ultimaReacao=Date.now(); var t=++tok; clearTimeout(tReage); tAparece=Date.now();
    /* anda para frente só se o canto estiver livre; se não, oferece dali mesmo (o próximo toque abre o cardápio) */
    (cantoLivre(lado())?irPara(t,lado(),300):Promise.resolve()).then(function(){if(!ok(t))return;mostra();diz(T('Oi! Quer ver o cardápio?'),2800);tReage=setTimeout(function(){if(ok(t))depoisDaReacao(t)},3400)})['catch'](nada);
  }
  lk.addEventListener('mouseenter',function(){emCima=true;if(!calmo&&!pousado&&escondido()&&Date.now()-tAparece>5000)aparece()});lk.addEventListener('mouseleave',function(){emCima=false});
  /* toque com ele escondido: primeiro ele aparece; com ele inteiro na tela, o toque abre o cardápio */
  lk.addEventListener('click',function(e){if(!calmo&&!pousado&&escondido()&&Date.now()-tAparece>5000){e.preventDefault();aparece()}});
  lk.addEventListener('focus',function(){emCima=true});lk.addEventListener('blur',function(){emCima=false});
  /* fechar: ele se despede e não volta mais nesta visita */
  bx.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation(); if(fechado)return; fechado=true; var t=++tok; clearTimeout(tReage);
    try{sessionStorage.setItem('cj_fechado','1')}catch(er){}
    a.classList.add('cj-fechando'); if(corda)corda.style.display='none'; diz(T('Tá bom, tchau!'),1500); if(!calmo)gesto('chama');
    function some(){if(a.parentNode)a.parentNode.removeChild(a);if(corda&&corda.parentNode)corda.parentNode.removeChild(corda)}
    espera(1100).then(function(){fala.classList.remove('on');if(calmo)return;return pousado?sobe(t,0,lk.offsetHeight+6,450):vai(pos('fora'),320)}).then(some,some);
  });
  /* incentivo na reserva */
  var AMB={'Área':'Pé na areia, boa!','Tenda':'Tenda na sombra, que delícia!','Salão':'Salão coberto, ótima ideia!'};
  var tFrase=0;
  function frase(txt,acao,perto){if(Date.now()-tFrase<1200&&fala.classList.contains('on')){diz(txt,2800,perto);return}tFrase=Date.now();reage(txt,acao||function(){gesto('chama')},0,perto)}
  function on(sel,ev,fn){var el=document.querySelector(sel);if(el)el.addEventListener(ev,fn)}
  var quick=document.getElementById('quick');
  on('#q-data','change',function(e){if(e.target.value)frase(T('Ótimo dia pra praia!'),null,quick)});
  on('#q-pes','change',function(){frase(T('Quanto mais gente, melhor!'),null,quick)});
  on('#q-amb','change',function(e){if(AMB[e.target.value])frase(T(AMB[e.target.value]),null,quick)});
  var form=document.getElementById('form'), pronto=false;
  function completo(){if(!form)return false;var q=function(s){return form.querySelector(s)};return !!(q('input[name=amb]:checked')&&q('input[name=hor]:checked')&&form.data&&form.data.value&&form.pes&&form.pes.value&&form.nome&&form.nome.value.trim())}
  if(form){
    form.addEventListener('change',function(e){
      var el=e.target, n=el.name, v=el.value, txt=null;
      if(n==='amb')txt=AMB[v]?T(AMB[v]):null;
      else if(n==='esp'&&v)txt=T('Esse espaço é ótimo!');
      else if(n==='data'&&v)txt=T('Ótimo dia pra praia!');
      else if(n==='pes'&&v)txt=T('Quanto mais gente, melhor!');
      else if(n==='hor'&&v)txt=F('Chegando às {h}? Perfeito!','h',el.parentNode.textContent.trim()||v);
      else if(n==='nome'&&v.trim())txt=F('Prazer, {n}!','n',v.trim().split(/\s+/)[0].slice(0,14));
      else if(n==='oca'&&v)txt=T('Que ocasião especial!');
      var alvo=n==='amb'||n==='esp'||n==='hor'?(el.closest('.chips')||el.parentNode):(el.closest('.field')||el);
      if(!pronto&&completo()){pronto=true;txt=T('Tudo pronto! Agora é só enviar.');var bt=form.querySelector('button[type=submit]');return frase(txt,function(){aponta(bt)},bt)}
      if(txt)frase(txt,null,alvo);
    });
    form.addEventListener('submit',function(){setTimeout(function(){
      var m=document.getElementById('msg');
      var bt=form.querySelector('button[type=submit]');
      if(m&&m.getAttribute('data-s')==='error')frase(T('Quase lá! Falta só um detalhe.'),null,bt);
      else{ultimaReacao=Date.now();reage(T('Oba! Te espero na praia!'),function(){gesto('festa',2000)},3600,bt)}
    },60)});
  }
  /* no computador: passando o mouse num botão de reserva ou num prato */
  var tBtn=0,tPrato=0;
  if(mouse){
    document.addEventListener('mouseover',function(e){
      if(pousado||fechado)return;
      var el=e.target.closest&&e.target.closest('a[href^="reservar.html"],#quick button,#plan-go,#dm-go');
      if(el&&!a.contains(el)&&Date.now()-tBtn>20000&&Date.now()-ultimaReacao>4000){tBtn=Date.now();reage(T('Vai, garante a sua mesa!'),function(){aponta(el)})}
      var d=e.target.closest&&e.target.closest('.dish');
      if(d&&Date.now()-tPrato>14000&&Date.now()-ultimaReacao>4000){tPrato=Date.now();reage(T('Esse aqui é dos bons!'),function(){aponta(d)})}
    });
  }
  /* Monte o seu dia */
  document.addEventListener('change',function(e){
    var n=e.target&&e.target.name;
    var grupo=e.target&&e.target.closest&&(e.target.closest('.chips,.grp')||e.target.parentNode);
    if(n==='comer')frase(T('Hmm, que delícia!'),function(){aponta(document.getElementById('stack'))},grupo);
    else if(n==='beber')frase(T('Saúde!'),null,grupo);
  });
  on('#hora','change',function(){frase(T('Boa hora pra chegar!'),function(){aponta(document.getElementById('stack'))})});
  /* a parte do site que a pessoa está olhando */
  function maisPerto(sel){var els=[].slice.call(document.querySelectorAll(sel)).filter(function(el){var r=el.getBoundingClientRect();return r.width&&r.bottom>60&&r.top<innerHeight-60});
    var g=centroGarra();els.sort(function(p,q){var a1=p.getBoundingClientRect(),b1=q.getBoundingClientRect();return Math.hypot(a1.left+a1.width/2-g.x,a1.top+a1.height/2-g.y)-Math.hypot(b1.left+b1.width/2-g.x,b1.top+b1.height/2-g.y)});return els[0]}
  var total=document.getElementById('mtotal');
  var PARTES=[
    ['#say',function(s){return reage(T('Esse é o meu dia perfeito!'),null,0,s)}],
    ['#ocasioes',function(){var el=maisPerto('.occ__i');return reage(T('Qual é a sua ocasião?'),function(){aponta(el)},0,el)}],
    ['#ambientes',function(){var el=maisPerto('#spaces .card');return reage(T('Eu fico no pé na areia!'),function(){aponta(el)},0,el)}],
    ['#seu-dia',function(){var el=document.getElementById('stack');return reage(T('Monta aí que eu ajudo!'),function(){aponta(el)},0,el)}],
    ['#cardapio .dishes:not([hidden])',function(){var el=maisPerto('#cardapio .dishes:not([hidden]) .dish');return reage(T('Olha esse prato aqui!'),function(){puxa(el)},3200,el)}],
    ['.mcta',function(){var el=document.querySelector('.mcta');return reage(F('Puxa vida, são {n} opções!','n',total?total.textContent:'96'),function(){puxa(el)},3200,el)}],
    ['#fotos',function(s){return reage(T('Quem vem, volta. Eu voltei!'),null,0,s)}],
    ['#chegar',function(){var el=document.querySelector('.map');return reage(T('É logo ali, na Av. Central, 49!'),function(){aponta(el)},0,el)}],
    ['.rside',function(){var el=document.getElementById('rphoto');return reage(T('Olha que lugar bonito!'),function(){aponta(el)},0,el)}]
  ];
  if('IntersectionObserver' in window){
    var tParte;
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      if(!en.isIntersecting)return; var k=en.target.__cj; if(ja[k])return;
      clearTimeout(tParte); tParte=setTimeout(function(){
        var r=en.target.getBoundingClientRect(); if(r.bottom<innerHeight*.3||r.top>innerHeight*.7)return;
        if(ja[k]||pousado||fechado||Date.now()-ultimaReacao<7000||Date.now()-ultimaAuto<9000||document.hidden||a.classList.contains('cj-sai'))return;
        if(PARTES[k][1](en.target)){ja[k]=1;ultimaAuto=Date.now()}
      },1100);
    })},{rootMargin:'-35% 0px -35% 0px'});
    PARTES.forEach(function(p,k){var el=document.querySelector(p[0]);if(el){el.__cj=k;io.observe(el)}});
    /* fim da página: quando o "Vem pra cá!" aparece inteiro, ele surfa nas letras */
    if(vem)new IntersectionObserver(function(es){es.forEach(function(en){
      if(!en.isIntersecting||en.intersectionRatio<.9)return; var r=vem.getBoundingClientRect();
      if(r.top>innerHeight*.12&&r.bottom<innerHeight*.92)setTimeout(onda,600);
    })},{threshold:[.9,1]}).observe(vem);
  }
  /* começo */
  if(calmo){
    /* sem movimento: fica parado no canto que estiver livre; se nenhum estiver, some até ficar livre */
    modo='canto';
    var confere=function(){var L=ladoLivre();if(L){if(L!==lado())a.setAttribute('data-lado',L);chao();poe(pos('canto'));a.classList.remove('cj-oculto');marcaX()}else a.classList.add('cj-oculto')};
    confere(); setInterval(confere,800); setTimeout(function(){if(!a.classList.contains('cj-oculto'))diz(T('Olha o cardápio!'),3500)},1500); return;
  }
  setInterval(vigia,700);
  poe(pos('fora'));
  var ld=document.getElementById('ld');
  /* se uma reação já começou antes (página aberta no meio, por exemplo), ela segue o passeio; não começa outro junto */
  var t0=tok; espera(ld?2600:900).then(function(){if(ok(t0))ciclo(t0)});
})();
