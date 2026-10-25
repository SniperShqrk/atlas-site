/* atlasfitness.xyz behaviour: store links and the phone wall */
(function () {
  var ST = window.STORES || {};
  document.querySelectorAll('a.bd[data-store]').forEach(function (a) { a.href = ST[a.getAttribute('data-store')].url; });
})();

(function(){var band=document.querySelector('.band');if(!band)return;var cols=[].slice.call(band.querySelectorAll('.col'));
function set(d){cols.forEach(function(c,i){c.style.transform='translate3d(0,'+((i%2?-110:0)+(i%2?-d:d)).toFixed(1)+'px,0)'})}
set(0);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cur=0,tgt=0,on=false;function target(){var r=band.getBoundingClientRect(),p=(innerHeight-r.top)/(innerHeight+r.height);p=Math.max(0,Math.min(1,p));return (p-.5)*90}
function loop(){cur+=(tgt-cur)*.08;set(cur);if(Math.abs(tgt-cur)>.1)requestAnimationFrame(loop);else on=false}
addEventListener('scroll',function(){tgt=target();if(!on){on=true;requestAnimationFrame(loop)}},{passive:true});cur=tgt=target();set(cur)})();