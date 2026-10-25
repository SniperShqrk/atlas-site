
// 2 fresh, 3 ready, 4 recovering, 5 fatigued: the app's recovery colours per theme (theme/palettes.ts)
var PAL={obsidian:{1:'#4A453D',2:'#EDEAE3',3:'#C9C5BC',4:'#C08A3E',5:'#C9583C',6:'#8A6224',7:'#E3B872',8:'#EDEAE3'},
         marble:{1:'#B5AE9F',2:'#A69C86',3:'#8F846C',4:'#B07A33',5:'#B3452A',6:'#C9A877',7:'#87612C',8:'#2B2822'}};
// Marble draws the figure as stone (bodyBase) so pale rested muscles read, as in the app
var STONE={marble:'#B5AE9F'};
// mixed symbols: each density level has its own pool, so the picture keeps its shading but every cell differs
var BUCK=['',".',",':;-~','+=^"÷','*!/\|()×','iltfjr{}[]','xzvnuc?<>Λ','oaekbdpqΔΞ','0OQGDZ&$ΦΨΣ','#%@MWB8Ω'];
var TXT={stoic:'WASTENOMORETIMEARGUINGWHATAGOODMANSHOULDBE·BEONE·',sets:'102.5×5·105×5·107.5×4·140×3·80×8·60×12·82.5×6·',ramp:''};
var RAMP=' .:-=+*#%@';
var DATA=[92,93,95,94,97,99,98,101,103,102,105,107];
function chartSubj(cols,rows){
  var lv='',ci='';
  for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
    var t=c/(cols-1)*(DATA.length-1),i=Math.floor(t),f=t-i,v=DATA[i]+(DATA[Math.min(i+1,DATA.length-1)]-DATA[i])*f;
    var y=(110-v)/(110-88)*(rows-1),d=r-y,l=0,k=0;
    if(Math.abs(d)<.62){l=9;k=7}else if(d>0){l=Math.max(1,Math.round(6-d*.55));k=d<3?4:6}
    var ref=[95,105].map(function(x){return Math.round((110-x)/(110-88)*(rows-1))});
    if(!l&&ref.indexOf(r)>=0&&c%3===0){l=2;k=1}
    lv+=l;ci+=k}
  return {cols:cols,rows:rows,lv:lv,ci:ci};
}
var GREEK='ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
// a word drawn in letters: the word is set in the given face offscreen, then each cell takes its ink coverage as its level
var TSUBJ={};
function textSubj(str,cols,face){var k=str+'|'+cols+'|'+face;if(TSUBJ[k])return TSUBJ[k];
  var o=document.createElement('canvas'),q=o.getContext('2d'),F=200,fnt='700 '+F+'px '+(face==='mark'?'Cinzel,Georgia,serif':'Cardo,Georgia,serif');
  q.font=fnt;var m=q.measureText(str),w=m.actualBoundingBoxLeft+m.actualBoundingBoxRight,h=m.actualBoundingBoxAscent+m.actualBoundingBoxDescent;
  var cw=w/cols,rows=Math.max(2,Math.ceil(h/(cw*1.9))),sx=6,sy=11;o.width=cols*sx;o.height=rows*sy;q=o.getContext('2d');
  q.font=fnt;q.fillStyle='#000';q.textBaseline='alphabetic';
  var sc=o.width/w;q.setTransform(sc,0,0,sc*(sy/(sx*1.9)),0,0);q.fillText(str,m.actualBoundingBoxLeft,m.actualBoundingBoxAscent+(rows*cw*1.9-h)/2);
  var d=q.getImageData(0,0,o.width,o.height).data,lv='',ci='';
  for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var a=0;for(var y=0;y<sy;y++)for(var x=0;x<sx;x++)a+=d[((r*sy+y)*o.width+c*sx+x)*4+3];
    var l=Math.round(a/(sx*sy*255)*9);if(l&&l<2)l=0;lv+=l;ci+=l>=7?'8':l>=4?'4':'6'}
  return TSUBJ[k]={cols:cols,rows:rows,lv:lv,ci:ci,kind:'text'}}
// a rule: one line of the text, brightest in the middle and fading to both ends
// a torn row of tiny letters used instead of a straight divider: two rows, the upper one sparse, the lower one dense, both with random gaps
function lineSubj(cols){var a1=Math.random()*6.28,a2=Math.random()*6.28,a3=Math.random()*6.28,lv='',ci='';
  function nz(c,k){return .5+.5*(Math.sin(c*.09+a1+k)*.5+Math.sin(c*.23+a2)*.3+Math.sin(c*.011+a3)*.2)}
  for(var r=0;r<2;r++)for(var c=0;c<cols;c++){var d=r?Math.min(.97,.62+.4*nz(c,2)):Math.max(.05,.62*nz(c,5)-.06),on=Math.random()<d,l=!on?0:Math.random()<.3?5:3;lv+=l;ci+=l>=5?'4':'6'}
  return {cols:cols,rows:2,lv:lv,ci:ci,kind:'text'}}
function ruleSubj(cols){var lv='',ci='';for(var c=0;c<cols;c++){var t=1-Math.abs(c/(cols-1)*2-1),l=Math.max(1,Math.round(1+t*7));lv+=l;ci+=l>=6?'8':'4'}return {cols:cols,rows:1,lv:lv,ci:ci,kind:'text'}}
var BRAILLE=['','⠁','⠃','⠇','⡇','⣇','⣧','⣷','⣿','⣿'];
TXT.quotes='THEIMPEDIMENTTOACTIONADVANCESACTION·WHATSTANDSINTHEWAYBECOMESTHEWAY·WESUFFERMOREOFTENINIMAGINATIONTHANINREALITY·NOMANISFREEWHOISNOTMASTEROFHIMSELF·WASTENOMORETIMEARGUINGWHATAGOODMANSHOULDBE·BEONE·';
// colourways for photographic subjects: index 6 shadow, 4 mid, 8 highlight
var TONE={gold:{obsidian:{6:'#7A5620',4:'#C08A3E',8:'#E8C27F'},marble:{6:'#D2B98A',4:'#B07A33',8:'#6E4E1E'}},
          white:{obsidian:{6:'#6E6962',4:'#B5B1AA',8:'#F7F3EA'},marble:{6:'#C9C3B6',4:'#8C857A',8:'#1E1C19'}},
          ink:{obsidian:{6:'#6E6962',4:'#B5B1AA',8:'#F7F3EA'},marble:{6:'#8A6A35',4:'#4A3818',8:'#14130F'}}};
var FLOW=[],REG=[],JIT=0,MX=-999,MY=-999,MV=0;
// mouse feel, each 0 to 15: r radius, s push strength, i irregularity of the edge and per-letter variation, t trail (how far the pointer lags)
var RP=(typeof RP==='object'&&RP)||{r:5,s:6,i:9,t:5};
function rpRadius(W){return Math.max(90,W*(.07+RP.r/15*.33))}
function rpPush(){return .12+RP.s/15*.8}
// the edge of the effect wobbles with the angle and over time, so it is never a clean circle
function rpEdge(R,ddx,ddy,now){if(!RP.i)return R;var an=Math.atan2(ddy,ddx);return R*(1+RP.i/15*.65*(Math.sin(an*3+now/900)*.5+Math.sin(an*5-now/700+1.7)*.3+Math.sin(an*2+now/1300)*.2))}
// constant glitch (data-glitch canvases): effects change in steps, so it reads as a signal fault and not as noise.
// gi intensity, gs speed, ge tear, gg ghost, each 0 to 15; rh rhythm, mi mouse interplay, sp pause while scrolling, fx which effects are on
var GL=(typeof GL==='object'&&GL)||{on:0,gi:6,gs:8,ge:5,gg:3,rh:'pockets',mi:'rise',sp:1,fx:{swap:1,dim:1,tear:1,scan:0,ghost:1,drop:0}};
function glFrame(cv,now,jit,rows){
  if(!GL.on||!cv._gl)return null;
  if(GL.sp&&jit>.03)return null;
  if(GL.ph===0&&innerWidth<760)return null;
  var per=460-GL.gs/15*400,k=GL.gi/15,sp=5200-GL.gs/15*3600,rh=GL.rh,tn=now+(cv._go||(cv._go=Math.random()*9000)),bm=1;
  var G={gt:Math.floor(tn/per),sh:k*.30,tp:GL.ge/15*.12,ts:1+Math.round(GL.ge/15*7),gp:GL.gg/15*7,dp:k*.05,si:.4+k*.6,fx:GL.fx,tr:[],sy:(tn%sp)/sp*(rows+10)-5};
  if(rh==='bursts'){var u=(tn%3400)/3400;bm=u<.2?1.7:u<.3?.6:.12}
  G.m=function(c,r,cx,cy,px,py,R,mo){var m=bm;
    if(rh==='wave'){var wv=Math.max(0,1-Math.abs(r/rows-(tn%4600)/4600)*5);m=.1+1.8*wv}
    else if(rh==='pockets'){var n=Math.sin(c*.21+tn/1900)*Math.sin(r*.33-tn/2700)+Math.sin((c+r)*.12+tn/3300);m=Math.max(0,n*.5+.5-.35)*1.7}
    if(GL.mi!=='none'&&mo){var dx=cx-px,dy=cy-py,d=Math.sqrt(dx*dx+dy*dy),R2=R*1.2;if(d<R2){var f=(1-d/R2)*MV;m=GL.mi==='rise'?m*(1+f*3)+f*.6:m*(1-f*.97)}}
    return m};
  return G}
function drawAscii(cv){
  var s=cv.getAttribute('data-subj'),g=cv.getAttribute('data-glyph'),th=(cv.closest('[data-t]')||document.documentElement).getAttribute('data-t');
  var mode=cv.getAttribute('data-scroll')||'flicker',rend=cv.getAttribute('data-render')||'fade',tone=cv.getAttribute('data-tone')||'b',flow=cv.getAttribute('data-flow')==='1';
  var S=s==='chart'?chartSubj(+cv.getAttribute('data-cols')||64,+cv.getAttribute('data-rows')||18):s==='txt'?textSubj(cv.getAttribute('data-text'),+cv.getAttribute('data-cols')||40,cv.getAttribute('data-face')):s==='rule'?ruleSubj(+cv.getAttribute('data-cols')||48):s==='line'?lineSubj(Math.max(40,Math.round(innerWidth/(+cv.getAttribute('data-step')||6)))):SUBJ[s+(cv.getAttribute('data-detail')||'')]||SUBJ[s];
  var W=cv.clientWidth;if(!W||!S)return;cv._w=W;cv._gl=cv.hasAttribute('data-glitch');
  if(s==='body'&&W<560)S=SUBJ.bodyf;if(s==='temple'&&W<560)S=SUBJ.templef;if(s==='head'&&W<560)S=SUBJ.headf;if(s==='david'&&(innerWidth<700||cv.hasAttribute('data-phone'))&&!(GL&&GL.pf)&&SUBJ.david68)S=SUBJ.david68;if(s==='wordmark'&&W<560)S=SUBJ.mono;
  var cw=W/S.cols,chh=cw*1.9,H=Math.ceil(chh*S.rows),dpr=Math.min(2,window.devicePixelRatio||1);
  cv.style.height=H+'px';cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  var x=cv.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.textAlign='center';x.textBaseline='middle';
  var mono=g==='ramp'||g==='rich'||g==='braille',fam=mono?'ui-monospace,Menlo,Consolas,monospace':g==='stoic'||g==='quotes'||g==='greek'?'Cardo,Georgia,serif':'Inter,system-ui,sans-serif';
  var wt=g==='stoic'||g==='quotes'||g==='greek'?'700 ':mono?'':'600 ',base=mono?.92:g==='greek'?.8:g==='stoic'||g==='quotes'?.86:.74;
  var photo=S.kind==='photo';
  // on Marble a photo is drawn like an engraving: shadows carry the ink, light is left as paper
  var scene=S.kind==='scene',dark=th!=='marble';
  var inv=photo&&th==='marble';
  // a statue's tone runs smoothly from shadow to highlight, not in three steps
  function hx(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]}
  function ramp(l){var st=TP||{6:P[6],4:P[4],8:P[8]},t=(l-1)/8,A=hx(t<.5?st[6]:st[4]),B=hx(t<.5?st[4]:st[8]),k=t<.5?t*2:(t-.5)*2;
    return 'rgb('+A.map(function(v,j){return Math.round(v+(B[j]-v)*k)}).join(',')+')'}
  // a scene keeps its own (warmed) colours; on Marble they are darkened to read on stone
  function sceneCol(i){var h=S.rgb.substr(i*6,6),c=[0,2,4].map(function(j){return parseInt(h.substr(j,2),16)});if(!dark)c=c.map(function(v){return Math.round(v*.62)});return 'rgb('+c.join(',')+')'}
  function lvAt(i){var l=+S.lv[i];return inv&&l?10-l:l}
  function ciAt(i){if(!photo)return S.ci[i];var l=lvAt(i);return l<=3?'6':l<=6?'4':'8'}
  var P=PAL[th]||PAL.obsidian,TP=TONE[tone]&&TONE[tone][th],T=TXT[g]||'',n=0,cells=[];
  var cut=+cv.getAttribute('data-cut')||0;
  // data-dissolve="l,r,t": the left, right and top edges of the figure break up into scattered letters instead of a straight cut (fractions of the columns / rows)
  var ED=null,rj=[];(function(){var d=(cv.getAttribute('data-dissolve')||'').split(',').map(Number);if(d.length===3&&d.every(function(v){return v>=0})){ED=[Math.max(1,d[0]*S.cols),Math.max(1,d[1]*S.cols),Math.max(1,d[2]*S.rows)];for(var r=0;r<S.rows;r++)rj.push(Math.random())}})();
  for(var i=0;i<S.lv.length;i++){var l=lvAt(i);if(!l||l<cut)continue;
    var hh=Math.imul(i+1,2654435761)>>>0,ti=n++;
    var ch=g==='ramp'?RAMP[l]:g==='rich'?BUCK[l][hh%BUCK[l].length]:g==='greek'?GREEK[hh%GREEK.length]:g==='braille'?BRAILLE[l]:T[ti%T.length];
    var col=scene?sceneCol(i):(TP&&TP[ciAt(i)])||P[ciAt(i)]||P[2];
    var a=scene?(dark?.28+.72*l/9:.3+.7*(1-l/9)):S.kind==='text'?(l>=5?1:.2+l*.08):rend==='size'?.92:(mono?.6+l*.045:.42+l*.064),sz=S.kind==='text'?1.12:rend==='fade'?1:.42+.58*l/9;
    cells.push([i%S.cols,Math.floor(i/S.cols),ch,col,a,Math.random(),l,ti,sz])}
  // nothing is drawn under the letters: on Marble the pale rested muscles are darkened instead
  var stone=false;
  var under=null;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches||cv.hasAttribute('data-still');
  var fonts={};function font(z){var k=Math.round(z*20);return fonts[k]||(fonts[k]=wt+(chh*base*z).toFixed(2)+'px '+fam)}
  var K=1,TILE=0;
  var off=0;
  function rnd(){return T?T[Math.floor(Math.random()*T.length)]:g==='greek'?GREEK[Math.floor(Math.random()*GREEK.length)]:RAMP[1+Math.floor(Math.random()*9)]}
  var mouse=cv.getAttribute('data-mouse')||'none';
  function hsh(i,k){var h=Math.imul(i+1,2654435761)^Math.imul(k+7,40503);h^=h>>>15;return (h>>>0)%65521}
  function paint(p,jit){x.clearRect(0,0,W,H);var cur='',rc=cv.getBoundingClientRect(),band=mode==='sweep'?innerHeight*.45-rc.top:0,now=performance.now(),tm=Math.floor(now/140),
    mo=mouse!=='none'&&MV>.01,px=MX-rc.left,py=MY-rc.top,R=rpRadius(W),PU=rpPush(),G=glFrame(cv,now,jit,S.rows);
    if(under){x.globalAlpha=Math.max(0,Math.min(1,p));x.imageSmoothingEnabled=true;x.drawImage(under,0,0,W,H)}
    for(var j=0;j<cells.length;j++){var c=cells[j],t=(p-c[5]*.75-c[1]/S.rows*.25)/.18;if(t<=0)continue;
      if(stone){x.globalAlpha=Math.min(1,c[6]/5)*(t>=1?1:.5);x.fillStyle=stone;x.fillRect(c[0]*cw,c[1]*chh,cw+.6,chh+.6)}
      else if(TILE){x.globalAlpha=Math.min(1,t)*TILE*(scene?(dark?.35+.65*c[6]/9:.25+.75*(1-c[6]/9)):Math.pow(c[6]/9,1.4));x.fillStyle=c[3];x.fillRect(Math.round(c[0]*cw),Math.round(c[1]*chh),Math.ceil(cw),Math.ceil(chh))}
      var f=font(c[8]);if(f!==cur){x.font=f;cur=f}
      if(t<1&&Math.random()<.5)continue;
      if(ED){var em=Math.min((c[0]+.5+(rj[c[1]]-.5)*ED[0]*.9)/ED[0],(S.cols-c[0]-.5+(rj[c[1]]-.5)*ED[1]*.9)/ED[1],(c[1]+.5)/ED[2]);if(em<1&&(em<=0||c[5]>Math.pow(em,.8)))continue}
      // flicker: a fixed share of the letters (chosen by their own number, so the set grows and shrinks smoothly with the scroll speed)
      // dim and change glyph slowly in time, never at random per frame
      var sh=mode==='flicker'&&jit&&t>=1&&c[5]<jit*1.7,ox=0,oy=0,a=c[4],dp=cv._disp||0;
      if(sh){a*=1-.6*Math.min(1,jit*2.6)*(.5+.5*Math.sin(now/130+c[5]*50))}
      if(dp&&t>=1){var an2=c[5]*6.2832,rr=dp*dp*(1+c[5]);ox=Math.cos(an2)*rr*cw*14;oy=Math.sin(an2)*rr*chh*6-dp*chh*4;a*=Math.max(0,1-dp*1.15);if(a<=.01)continue}
      // scatter: letters drift outward along their own direction, as far as the scroll is fast, then fall back into place
      if(mode==='scatter'&&jit&&t>=1){var an=c[5]*6.2832;ox=Math.cos(an)*jit*cw*9;oy=Math.sin(an)*jit*chh*3;a*=1-jit*.6}
      // sweep: a band of light at the middle of the screen passes through the figure as the page moves
      if(mode==='sweep'&&t>=1){var dd=Math.abs(c[1]*chh+chh/2-band)/(chh*5),bo=Math.max(0,1-dd);a=Math.min(1,a*.5+bo*.7)}
      var cx0=c[0]*cw+cw/2,cy0=c[1]*chh+chh/2,scr=false;
      // mouse: repel pushes the letters away from the pointer and lets them settle back; spotlight lights them near it and dims the rest;
      // scramble turns the ones under it into other letters. The pointer position is eased, so all three move smoothly
      if(mo&&t>=1){var ddx=cx0-px,ddy=cy0-py,dd2=Math.sqrt(ddx*ddx+ddy*ddy),Re=dd2<R*1.8?rpEdge(R,ddx,ddy,now):R,f=dd2<Re?(1-dd2/Re)*(1-dd2/Re)*MV*(1+RP.i/15*(c[5]-.5)*.9):0;
        if(mouse==='repel'&&f>0){var u=dd2||1;ox+=ddx/u*f*R*PU;oy+=ddy/u*f*R*PU;a=Math.min(1,a+f*.25)}
        else if(mouse==='spot'){var fl=dd2<Re*1.35?(1-dd2/(Re*1.35))*MV:0;a=Math.min(1,a*(1-.68*MV)+fl*1.5)}
        else if(mouse==='scramble'&&f>.1){scr=true;a=Math.min(1,a+f*.5)}}
      var gsw=false,gha=0;
      if(G&&t>=1){var gc=c[0],gr=c[1],gm=G.m(gc,gr,cx0,cy0,px,py,R,mo),F=G.fx;
        if(gm>0){
          if(F.drop&&hsh(Math.floor(gc/7)*997+Math.floor(gr/3),G.gt+4001)<G.dp*gm*65521)continue;
          if(F.tear){var tr=G.tr[gr];if(tr===undefined)tr=G.tr[gr]=hsh(gr*131+7,G.gt+5061)<G.tp*gm*65521?hsh(gr,G.gt+11)%(2*G.ts+1)-G.ts:0;if(tr){ox+=tr*cw;gha=1}}
          if(F.swap&&hsh(j,G.gt)<G.sh*gm*65521)gsw=true;
          if(F.dim&&hsh(j,G.gt+31)<G.sh*.8*gm*65521)a*=.2+.5*hsh(j,G.gt+53)/65521;
          if(F.ghost&&(gha||hsh(j,G.gt+97)<G.sh*.9*gm*65521))gha=2}
        if(F.scan&&Math.abs(gr-G.sy)<1.3){a=Math.min(1,a+.35*G.si);if(hsh(j,G.gt+71)<.35*65521)gsw=true}}
      x.globalAlpha=t>=1?(stone?1:a):c[4]*(.25+Math.random()*.5);x.fillStyle=c[3];
      var chr=t<1?rnd():scr||gsw||(sh&&a<c[4]*.7)?(T?T[hsh(j,gsw?G.gt+977:tm)%T.length]:RAMP[1+hsh(j,gsw?G.gt+977:tm)%9]):(off&&T?T[(c[7]+off)%T.length]:c[2]);
      if(gha===2){var gp=G.gp,ga=x.globalAlpha;x.globalAlpha=ga*.55;x.fillStyle=P[5];x.fillText(chr,cx0+ox+gp,cy0+oy);x.fillStyle=P[4];x.fillText(chr,cx0+ox-gp,cy0+oy);x.globalAlpha=ga;x.fillStyle=c[3]}
      x.fillText(chr,cx0+ox,cy0+oy)}
    x.globalAlpha=1}
  var old=FLOW.indexOf(cv._flow);if(old>=0)FLOW.splice(old,1);
  if(flow&&T&&!reduce){cv._flow={cv:cv,tick:function(){off++;paint(2,JIT)}};FLOW.push(cv._flow)}
  var oldR=REG.indexOf(cv._reg);if(oldR>=0)REG.splice(oldR,1);if(!reduce&&(mode!=='none'||mouse!=='none'||cv._gl)){cv._reg={cv:cv,paint:paint};REG.push(cv._reg)}
  cv._paint=paint;
  if(reduce){paint(2);return}
  if(cv._skip){cv._intro=false;paint(2);return}
  cv._intro=true;x.clearRect(0,0,W,H);
  function go(){var t0=performance.now();(function f(now){var p=(now-t0)/3600;paint(p);if(p<1.25)requestAnimationFrame(f);else{cv._intro=false;paint(2,JIT)}})(t0)}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go()}},{threshold:.12});io.observe(cv)}else go();
}
// flowing letters: the quote moves through the statue one letter every 160 ms, only while it is on screen
setInterval(function(){if(document.hidden)return;FLOW.forEach(function(f){var r=f.cv.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)f.tick()})},160);
// the glitch runs on its own clock (about 30 frames a second, visible canvases only, never during the fill-in)
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var last=0;
  function loop(now){requestAnimationFrame(loop);if(!GL.on||document.hidden||now-last<32)return;last=now;
    REG.forEach(function(r){if(!r.cv._gl||r.cv._intro)return;var b=r.cv.getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight)r.paint(2,JIT)})}
  requestAnimationFrame(loop)})();
// scrolling shakes the letters: a share of them flicker to other glyphs, in proportion to the scroll speed, then settle
(function(){var on=false,lastY=scrollY,acc=0,vel=0,TX=-999,TY=-999,MT=0;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  // one frame loop for scroll and pointer. The scroll speed is smoothed (fast to rise, slow to fall) and the pointer is eased toward its target
  function pump(){var tg=Math.min(.5,acc/42);acc=0;vel+=(tg-vel)*(tg>vel?.22:.065);if(vel<.008&&tg===0)vel=0;JIT=vel;
    var ez=.30-RP.t/15*.26;MX+=(TX-MX)*ez;MY+=(TY-MY)*ez;MV+=(MT-MV)*.12;var mActive=Math.abs(TX-MX)>.4||Math.abs(TY-MY)>.4||Math.abs(MT-MV)>.01;
    REG.forEach(function(r){var b=r.cv.getBoundingClientRect();if(!r.cv._intro&&b.bottom>0&&b.top<innerHeight)r.paint(2,JIT)});
    if(vel>0||mActive)requestAnimationFrame(pump);else on=false}
  function wake(){if(!on){on=true;requestAnimationFrame(pump)}}
  addEventListener('message',function(e){if(e.data&&e.data.atlasRep){for(var k in e.data.atlasRep)RP[k]=e.data.atlasRep[k]}});
  addEventListener('scroll',function(){acc+=Math.abs(scrollY-lastY);lastY=scrollY;wake()},{passive:true});
  addEventListener('pointermove',function(e){if(e.pointerType&&e.pointerType!=='mouse')return;if(MV<.02){MX=e.clientX;MY=e.clientY}TX=e.clientX;TY=e.clientY;MT=1;wake()},{passive:true});
  document.documentElement.addEventListener('mouseleave',function(){MT=0;wake()})})();
// the QR code arrives as letters: they flicker in, then each dark module fills in behind its letter.
// The settled code is solid dark modules with the letter engraved in bronze, so a phone camera reads it
function drawQR(cv){if(typeof QRB==='undefined')return;var cs=getComputedStyle(cv),N=Math.round(Math.sqrt(QRB.length)),S=cv.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);if(!S)return;
  cv._w=cv.clientWidth;var m=S/N,dpr=Math.min(2,window.devicePixelRatio||1);cv.style.height=S+'px';cv.width=cv.height=Math.round(S*dpr);
  var x=cv.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.textAlign='center';x.textBaseline='middle';x.font='700 '+(m*1.02).toFixed(2)+'px Cardo,Georgia,serif';
  var T=TXT.stoic,mods=[],k=0;for(var i=0;i<QRB.length;i++)if(QRB[i]==='1')mods.push([i%N,Math.floor(i/N),T[k++%T.length],Math.random()]);
  function rnd(){return T[Math.floor(Math.random()*T.length)]}
  // while the code arrives, every cell flickers as a random dark square, then locks: the real modules stay dark, the rest go blank
  var NN=N*N,LK=new Array(NN),isM=new Array(NN);for(var q0=0;q0<NN;q0++)LK[q0]=.45+Math.random()*.75;
  for(var j0=0;j0<mods.length;j0++){var q1=mods[j0][1]*N+mods[j0][0];LK[q1]=.75+mods[j0][3]*.45}
  function qh(i,k){var h=Math.imul(i+1,2654435761)^Math.imul(k+7,40503);h^=h>>>15;return (h>>>0)%1000/1000}
  function paint(p,jit){x.clearRect(0,0,S,S);
    if(p<1.3){var tk=Math.floor(p*36);x.globalAlpha=1;x.fillStyle='#14130F';for(var q=0;q<NN;q++){if(p>=LK[q])continue;if(qh(q,tk)<.5)x.fillRect((q%N)*m,Math.floor(q/N)*m,m+.4,m+.4)}}
    for(var j=0;j<mods.length;j++){var c=mods[j],t=(p-c[3]*.55)/.2,f=(p-.75-c[3]*.45)/.15,cx=c[0]*m+m/2,cy=c[1]*m+m/2+m*.05;if(t<=0)continue;
      if(f>0){x.globalAlpha=Math.min(1,f);x.fillStyle='#14130F';x.fillRect(c[0]*m,c[1]*m,m+.4,m+.4)}
      if(t<1&&Math.random()<.4)continue;
      x.globalAlpha=t<1?.3+Math.random()*.5:1;x.fillStyle=f>=1?'#4A3F2E':'#14130F';
      x.fillText(t<1||(jit&&Math.random()<jit)?rnd():c[2],cx,cy)}
    x.globalAlpha=1}
  var oldR=REG.indexOf(cv._reg);if(oldR>=0)REG.splice(oldR,1);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||cv.hasAttribute('data-still')){paint(3);return}
  cv._reg={cv:cv,paint:paint};REG.push(cv._reg);
  if(cv._skip){paint(3,0);return}
  cv._intro=true;x.clearRect(0,0,S,S);
  function go(){var t0=performance.now();(function f(now){var p=(now-t0)/3600;if(p<1.4){paint(p);requestAnimationFrame(f)}else{cv._intro=false;paint(3,0)}})(t0)}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go()}},{threshold:.2});io.observe(cv)}else go()}
// the footer figure drawn three more ways from the same photo: halftone (dot size), stipple (dot placement), engraving (line thickness).
// Ink is the canvas's CSS colour. Dots arrive in a scatter and react to the scroll like the statue's letters
function drawArt(cv){if(typeof ART==='undefined')return;var kind=cv.getAttribute('data-art'),W=cv.clientWidth;if(!W)return;
  var A=ART,H=Math.round(W*A.h/A.w),dpr=Math.min(2,window.devicePixelRatio||1),mode=cv.getAttribute('data-scroll')||'flicker';
  cv.style.height=H+'px';cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);var x=cv.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);
  var ink=getComputedStyle(cv).color,inv=cv.getAttribute('data-inv')==='1',key=inv?'_tvi':'_tv';
  // 0 is outside the figure; on a light ground the figure is printed: ink for shadow, paper for light
  var TV=A[key]||(A[key]=A.tone.split('').map(function(c){var v=parseInt(c,36);if(!v)return 0;v=(v-1)/34;return inv?1-v:v}));
  function tone(px,py){var fx=px/W*(A.tw-1),fy=py/H*(A.th-1),i=Math.floor(fx),j=Math.floor(fy);if(i<0||j<0||i>=A.tw-1||j>=A.th-1)return 0;
    var u=fx-i,v=fy-j,k=j*A.tw+i;return TV[k]*(1-u)*(1-v)+TV[k+1]*u*(1-v)+TV[k+A.tw]*(1-u)*v+TV[k+A.tw+1]*u*v}
  var dots=[],lines=[];
  if(kind==='stipple'){var pk=inv?'_pi':'_p';if(!A[pk]){var b=atob(inv?A.ptsi:A.pts),pv=atob(inv?A.pvi:A.pv),nn=inv?A.ni:A.n;A[pk]=[];for(var i=0;i<nn;i++)A[pk].push([(b.charCodeAt(i*4)|b.charCodeAt(i*4+1)<<8)/65535,(b.charCodeAt(i*4+2)|b.charCodeAt(i*4+3)<<8)/65535,inv?1-pv.charCodeAt(i)/255:pv.charCodeAt(i)/255])}
    var r0=Math.max(.6,W/430);A[pk].forEach(function(q){dots.push([q[0]*W,q[1]*H,r0*(.75+.5*q[2]),Math.random()])})}
  else if(kind==='halftone'){var sp=W/(W<560?82:92),rh=sp*.866;for(var yy=0,row=0;yy<H+sp;yy+=rh,row++)for(var xx=(row%2)*sp/2;xx<W+sp;xx+=sp){var tv=tone(xx,yy),r=sp*.56*Math.sqrt(tv);if(r>.35)dots.push([xx,yy,r,Math.random()])}}
  else{var ls=W/(W<560?104:112);for(var ly=ls/2;ly<H;ly+=ls){var top=[],bot=[],any=false;for(var lx=0;lx<=W;lx+=2){var tv=tone(lx,ly),hw=ls*.48*Math.pow(tv,.9),oy=(tv-.5)*ls*.7;if(hw>.12)any=true;top.push(lx,ly+oy-hw);bot.push(lx,ly+oy+hw)}if(any)lines.push([top,bot,Math.random()])}}
  var mouse=cv.getAttribute('data-mouse')||'none';
  function paint(p,jit){x.clearRect(0,0,W,H);x.fillStyle=ink;var rc=cv.getBoundingClientRect(),now=performance.now(),mo=mouse!=='none'&&MV>.01,px=MX-rc.left,py=MY-rc.top,R=rpRadius(W),PU=rpPush();
    if(lines.length){lines.forEach(function(L){var t=Math.min(1,Math.max(0,(p-L[2]*.6)/.5));if(t<=0)return;var n=Math.floor(L[0].length/2*t);if(n<2)return;
        // lines ripple smoothly with the scroll, and bow away from (repel) or toward (spotlight, scramble) the pointer
        var sw=jit&&mode!=='none'?Math.sin(now/120+L[2]*40)*jit*7:0,near=mo&&Math.abs(L[0][1]-py)<R;
        function yo(i){var o=sw;if(near){var ddx=L[0][i*2]-px,ddy=L[0][1]-py,dd=Math.sqrt(ddx*ddx+ddy*ddy);if(dd<R){var f=(1-dd/R)*(1-dd/R)*MV;o+=(mouse==='repel'?(ddy>=0?1:-1):mouse==='scramble'?Math.sin(now/90+i*.4):0)*f*R*(PU*.7)}}return o}
        x.globalAlpha=t<1?.6:1;x.beginPath();x.moveTo(L[0][0],L[0][1]+yo(0));
        for(var i=1;i<n;i++)x.lineTo(L[0][i*2],L[0][i*2+1]+yo(i));for(i=n-1;i>=0;i--)x.lineTo(L[1][i*2],L[1][i*2+1]+yo(i));x.closePath();x.fill()});x.globalAlpha=1;return}
    var B=[new Path2D(),new Path2D(),new Path2D()];
    for(var i=0;i<dots.length;i++){var d=dots[i],t=(p-d[3]*.75)/.25;if(t<=0)continue;var k=t>=1?2:t>.5?1:0,ox=0,oy=0;
      if(t<1){var e=(1-t)*(1-t),an=d[3]*6.2832*7;ox=Math.cos(an)*e*W*.05;oy=Math.sin(an)*e*W*.05}
      if(jit&&t>=1){if(mode==='scatter'){var an2=d[3]*6.2832*13;ox=Math.cos(an2)*jit*W*.035;oy=Math.sin(an2)*jit*W*.02;k=1}else if(mode==='flicker'&&d[3]<jit*1.7)k=Math.sin(now/130+d[3]*50)>0?0:1;else if(mode==='sweep')k=1}
      if(mo&&t>=1){var ddx=d[0]-px,ddy=d[1]-py,dd=Math.sqrt(ddx*ddx+ddy*ddy),Re=dd<R*1.8?rpEdge(R,ddx,ddy,now):R;if(dd<Re){var f=(1-dd/Re)*(1-dd/Re)*MV*(1+RP.i/15*(d[3]-.5)*.9);
        if(mouse==='repel'){var u=dd||1;ox+=ddx/u*f*R*PU;oy+=ddy/u*f*R*PU}
        else if(mouse==='spot'){k=2}
        else if(mouse==='scramble'){var an3=(d[3]*9973+Math.floor(now/120))*1.7;ox+=Math.cos(an3)*f*R*PU*.38;oy+=Math.sin(an3)*f*R*PU*.38}}
        else if(mouse==='spot'&&MV>.3)k=Math.min(k,1)}
      B[k].moveTo(d[0]+ox+d[2],d[1]+oy);B[k].arc(d[0]+ox,d[1]+oy,d[2],0,6.2832)}
    x.globalAlpha=.35;x.fill(B[0]);x.globalAlpha=.7;x.fill(B[1]);x.globalAlpha=1;x.fill(B[2])}
  var oldR=REG.indexOf(cv._reg);if(oldR>=0)REG.splice(oldR,1);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||cv.hasAttribute('data-still')){paint(3);return}
  if(mode!=='none'||mouse!=='none'){cv._reg={cv:cv,paint:paint};REG.push(cv._reg)}
  // the figure assembles when the footer first comes into view
  function go(){var t0=performance.now();(function f(now){var p=(now-t0)/1000;if(p<1.4){paint(p);requestAnimationFrame(f)}else paint(3,0)})(t0)}
  if('IntersectionObserver' in window){x.clearRect(0,0,W,H);var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();go()}},{threshold:.15});io.observe(cv)}else go()}
function drawAll(){document.querySelectorAll('canvas.ascii').forEach(drawAscii);document.querySelectorAll('canvas.qra').forEach(drawQR);document.querySelectorAll('canvas.art').forEach(drawArt)}
Promise.race([document.fonts?Promise.all([document.fonts.load('700 20px Cardo'),document.fonts.load('400 20px Cardo'),document.fonts.load('400 20px Inter')]):Promise.resolve(),new Promise(function(r){setTimeout(r,1500)})]).then(drawAll);
var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){document.querySelectorAll('canvas.ascii').forEach(function(c){if(c._w===c.clientWidth)return;c._skip=true;drawAscii(c)});document.querySelectorAll('canvas.qra').forEach(function(c){if(c._w===c.clientWidth)return;c._skip=true;drawQR(c)})},150)});
