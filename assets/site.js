/* atlasfitness.xyz behaviour: store switch, waitlist sheet, phone wall, sticky bar */
(function () {
  var ST = window.STORES || {}, root = document.documentElement;
  var NAME = { ios: 'iPhone', android: 'Android' };
  var STORE = { ios: 'Download on the App Store', android: 'Get it on Google Play' };
  function live(k) { return !!(ST[k] && ST[k].live && ST[k].url); }

  /* ---- store switch: swap the "coming soon" parts for real links when a store is live ---- */
  function applyStores() {
    var ua = navigator.userAgent || '', me = /Android/i.test(ua) && live('android') ? 'android' : 'ios', other = me === 'ios' ? 'android' : 'ios';
    document.querySelectorAll('.smart').forEach(function (s) {
      var main = live(me) ? '<a class="sb live" href="' + ST[me].url + '" target="_blank" rel="noopener"><span>Get ATLAS for ' + NAME[me] + '</span></a>'
        : '<button class="sb" type="button" data-notify="' + me + '"><span>' + NAME[me] + ' app coming soon · Notify me</span></button>';
      var alt = live(other) ? 'On ' + NAME[other] + '? <a href="' + ST[other].url + '" target="_blank" rel="noopener">Get it here</a>'
        : 'On ' + NAME[other] + '? <a href="#" data-notify="' + other + '">Get told when it lands</a>';
      s.innerHTML = main + '<p class="alt">' + alt + '</p>';
    });
    document.querySelectorAll('.bd[data-store]').forEach(function (b) {
      var k = b.getAttribute('data-store');
      if (!live(k)) return;
      var img = b.querySelector('img');
      var a = document.createElement('a');
      a.className = 'bd'; a.href = ST[k].url; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = '<img alt="' + STORE[k] + '" src="' + img.getAttribute('src') + '">';
      b.replaceWith(a);
    });
    var both = live('ios') && live('android');
    document.querySelectorAll('[data-freeline]').forEach(function (p) {
      p.textContent = (both ? 'Free on iPhone and Android.' : live('ios') ? 'Free on iPhone now. Android is in testing.' : live('android') ? 'Free on Android now. iPhone coming soon.' : 'iPhone first, then Android.') + ' No trial, no ads.';
    });
    document.querySelectorAll('[data-when]').forEach(function (p) {
      p.textContent = both ? 'ATLAS is on the App Store and Google Play.'
        : live('ios') ? 'ATLAS is on the App Store now. The Android app is in testing on Google Play and opens to everyone soon.'
        : live('android') ? 'ATLAS is on Google Play now. The iPhone app is coming soon; leave your email and you get one message when it lands.'
        : 'iPhone first: it is the closest to launch. Android follows; it is in testing on Google Play now. Leave your email and you get one message when each one lands.';
    });
  }
  applyStores();

  /* ---- waitlist sheet ---- */
  var SB = 'https://xgxlielnqrshybqmfzwc.supabase.co/rest/v1/site_waitlist', KEY = 'sb_publishable_1anOttxJU_RiRNcuSNTmyw_pVGUxv9C';
  var form = document.querySelector('.sheet'), emailEl = document.getElementById('sh-e'), last = null;
  function pressed(p) { document.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-p') === p); }); }
  function openSheet(p) {
    last = document.activeElement;
    document.getElementById('sh-t').textContent = 'Get told when ATLAS lands' + (p === 'both' ? '' : ' on ' + NAME[p]);
    pressed(p);
    var note = form.querySelector('.err'); if (note) note.textContent = '';
    root.classList.add('open');
    setTimeout(function () { emailEl.focus({ preventScroll: true }); }, 250);
  }
  function closeSheet() { root.classList.remove('open'); if (last && last.focus) last.focus({ preventScroll: true }); }
  document.addEventListener('click', function (e) {
    var n = e.target.closest('[data-notify]');
    if (n) { e.preventDefault(); openSheet(n.getAttribute('data-notify')); return; }
    if (e.target.closest('[data-close]')) closeSheet();
    var ch = e.target.closest('.chip');
    if (ch) pressed(ch.getAttribute('data-p'));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) closeSheet(); });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = form.querySelector('.err'), go = form.querySelector('.go'), email = emailEl.value.trim(),
      plat = (form.querySelector('.chip[aria-pressed=true]') || {}).getAttribute ? form.querySelector('.chip[aria-pressed=true]').getAttribute('data-p') : 'ios';
    if (form.querySelector('[name=website]').value) { go.outerHTML = '<p class="done">Saved. One email when it lands.</p>'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) { err.textContent = 'Check the email address.'; emailEl.focus(); return; }
    err.textContent = ''; go.disabled = true; go.textContent = 'Saving…';
    fetch(SB, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ email: email, platform: plat, source: 'site' }) })
      .then(function (r) {
        if (r.ok || r.status === 409) { go.outerHTML = '<p class="done">Saved. One email when it lands.</p>'; return; }
        throw new Error(r.status);
      })
      .catch(function () { go.disabled = false; go.textContent = 'Notify me'; err.textContent = 'Could not save that. Email support@atlasfitness.xyz and we will add you.'; });
  });
  var q = /[?&]notify=(ios|android)/.exec(location.search);
  if (q && !live(q[1])) setTimeout(function () { openSheet(q[1]); }, 400);

  /* ---- sticky bar after the hero ---- */
  var pill = document.querySelector('.pill'), hh = document.querySelector('[data-hero]');
  if (pill && hh && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { pill.classList.toggle('on', !e[0].isIntersecting); }).observe(hh);
})();

(function(){var band=document.querySelector('.band');if(!band)return;var cols=[].slice.call(band.querySelectorAll('.col'));
function set(d){cols.forEach(function(c,i){c.style.transform='translate3d(0,'+((i%2?-110:0)+(i%2?-d:d)).toFixed(1)+'px,0)'})}
set(0);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var cur=0,tgt=0,on=false;function target(){var r=band.getBoundingClientRect(),p=(innerHeight-r.top)/(innerHeight+r.height);p=Math.max(0,Math.min(1,p));return (p-.5)*90}
function loop(){cur+=(tgt-cur)*.08;set(cur);if(Math.abs(tgt-cur)>.1)requestAnimationFrame(loop);else on=false}
addEventListener('scroll',function(){tgt=target();if(!on){on=true;requestAnimationFrame(loop)}},{passive:true});cur=tgt=target();set(cur)})();