
(function () {
  var KEY = 'ed-lang';
  function apply(lang) {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.dataset.fr;
    }
    var hl = document.querySelectorAll('[data-href-en]');
    for (var h = 0; h < hl.length; h++) {
      if (hl[h].dataset.hrefFr === undefined) hl[h].dataset.hrefFr = hl[h].getAttribute('href');
      hl[h].setAttribute('href', lang === 'en' ? hl[h].getAttribute('data-href-en') : hl[h].dataset.hrefFr);
    }
    var t = document.querySelector('title'); if (t) t.textContent = t.dataset.fr !== undefined && lang !== 'en' ? t.dataset.fr : t.getAttribute('data-en');
    var b = document.querySelectorAll('.lang button');
    for (var j = 0; j < b.length; j++) b[j].setAttribute('aria-pressed', b[j].dataset.lang === lang ? 'true' : 'false');
    // keep the language when moving to another page, even where localStorage is not shared (file://)
    var links = document.querySelectorAll('a[href$=".html"],a[href*=".html?"]');
    for (var k = 0; k < links.length; k++) {
      var base = links[k].getAttribute('href').split('?')[0];
      links[k].setAttribute('href', lang === 'en' ? base + '?lang=en' : base);
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  var b = document.querySelectorAll('.lang button');
  for (var i = 0; i < b.length; i++) b[i].addEventListener('click', function () { apply(this.dataset.lang); });
  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  var q = /[?&]lang=(en|fr)/.exec(location.search);
  var start = q ? q[1] : saved || 'fr';
  if (start === 'en') apply('en');
  var btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var h = document.querySelector('header'); var o = h.classList.toggle('open'); btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
})();
