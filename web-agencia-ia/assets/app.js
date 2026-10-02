/* Interacciones de la guía: hoja de ruta con progreso guardado, índice con
   seguimiento de scroll, filtro del glosario y animaciones de entrada. */
(function () {
  'use strict';

  var RUTAS = window.RUTAS || {};
  var CLAVE = 'agencia-ia:guia:v1';
  var estado = { ruta: 'cero', hecho: {} };
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- estado guardado ---------- */
  try {
    var guardado = JSON.parse(localStorage.getItem(CLAVE) || 'null');
    if (guardado && typeof guardado === 'object') {
      if (RUTAS[guardado.ruta]) estado.ruta = guardado.ruta;
      if (guardado.hecho && typeof guardado.hecho === 'object') estado.hecho = guardado.hecho;
    }
  } catch (e) { /* sin guardado: la guía anda igual */ }

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* sin guardado */ }
  }

  function escapar(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- hoja de ruta ---------- */
  function tareasDeRuta(rid) {
    var out = [];
    RUTAS[rid].etapas.forEach(function (e, k) {
      e.tareas.forEach(function (t, j) { out.push(rid + '-' + (k + 1) + '-' + (j + 1)); });
    });
    return out;
  }

  function pintarRuta() {
    var rid = estado.ruta;
    var r = RUTAS[rid];
    if (!r) return;

    var seg = $('#seg-ruta');
    $$('#seg-ruta button').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.ruta === rid ? 'true' : 'false');
    });
    if (seg) seg.setAttribute('data-activa', rid);

    $('#ruta-nombre').textContent = r.nombre;
    $('#ruta-desc').textContent = r.desc;

    var html = r.etapas.map(function (e, k) {
      var tareas = e.tareas.map(function (t, j) {
        var id = rid + '-' + (k + 1) + '-' + (j + 1);
        var on = !!estado.hecho[id];
        return '<li class="tarea' + (on ? ' hecha' : '') + '">' +
          '<button type="button" class="tick" data-tick="' + id + '" aria-pressed="' + on + '" ' +
          'aria-label="Marcar como hecho: ' + escapar(t) + '"></button>' +
          '<span>' + escapar(t) + '</span></li>';
      }).join('');

      return '<li class="etapa" data-etapa="' + k + '">' +
        '<div class="etapa-cab"><span class="etapa-n' + '" aria-hidden="true">' + (k + 1) + '</span>' +
        '<div><h3 class="etapa-t">' + escapar(e.t) + '</h3>' +
        '<p class="etapa-para">' + escapar(e.para) + '</p></div></div>' +
        '<ul class="tareas">' + tareas + '</ul>' +
        '<p class="pasas"><b>Pasás a la siguiente cuando</b> ' + escapar(e.pasas) + '</p>' +
        (e.sigue ? '<button type="button" class="sigue" data-ir-ruta="' + e.sigue.ruta + '">' +
          escapar(e.sigue.txt) + '</button>' : '') +
        '</li>';
    }).join('');

    $('#etapas').innerHTML = html;
    progreso();
  }

  function progreso() {
    var ids = tareasDeRuta(estado.ruta);
    var hechas = ids.filter(function (id) { return estado.hecho[id]; }).length;
    var pct = ids.length ? Math.round((hechas / ids.length) * 100) : 0;

    $('#ruta-cuenta').textContent = hechas + ' de ' + ids.length;
    $('#ruta-barra').style.width = pct + '%';
    var ib = $('#indice-barra'), ic = $('#indice-cuenta');
    if (ib) ib.style.width = pct + '%';
    if (ic) ic.textContent = hechas + ' de ' + ids.length;

    $$('#etapas .etapa').forEach(function (li) {
      var tk = $$('.tick', li);
      var todas = tk.length > 0 && tk.every(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
      li.classList.toggle('hecha', todas);
      var n = $('.etapa-n', li);
      if (n) n.textContent = todas ? '✓' : String(Number(li.dataset.etapa) + 1);
    });

    var c5 = $$('[data-tick^="paso-"]').filter(function (b) { return estado.hecho[b.dataset.tick]; }).length;
    var cc = $('#cinco-cuenta');
    if (cc) cc.textContent = c5 + ' de 5';
  }

  /* ---------- clicks ---------- */
  document.addEventListener('click', function (ev) {
    var tk = ev.target.closest('.tick[data-tick]');
    if (tk) {
      var id = tk.dataset.tick;
      var on = !estado.hecho[id];
      if (on) estado.hecho[id] = true; else delete estado.hecho[id];
      tk.setAttribute('aria-pressed', on ? 'true' : 'false');
      var li = tk.closest('.tarea');
      if (li) li.classList.toggle('hecha', on);
      guardar(); progreso();
      return;
    }

    var sb = ev.target.closest('#seg-ruta button[data-ruta]');
    if (sb) {
      estado.ruta = sb.dataset.ruta;
      guardar(); pintarRuta();
      return;
    }

    var ir = ev.target.closest('[data-ir-ruta]');
    if (ir) {
      estado.ruta = ir.dataset.irRuta;
      guardar(); pintarRuta();
      var destino = $('#ruta');
      if (destino) destino.scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    var nav = ev.target.closest('#nav-abrir');
    if (nav) {
      var panel = $('#nav-movil');
      var abierto = panel.hasAttribute('hidden') ? false : true;
      if (abierto) { panel.setAttribute('hidden', ''); nav.setAttribute('aria-expanded', 'false'); }
      else { panel.removeAttribute('hidden'); nav.setAttribute('aria-expanded', 'true'); }
      return;
    }

    if (ev.target.closest('#nav-movil a')) {
      var p2 = $('#nav-movil');
      var b2 = $('#nav-abrir');
      if (p2) p2.setAttribute('hidden', '');
      if (b2) b2.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- barra pegada ---------- */
  var barra = $('#barra');
  var centinela = $('#centinela');
  if (barra && centinela && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (ents) {
      barra.classList.toggle('pegada', !ents[0].isIntersecting);
    }, { threshold: 0 }).observe(centinela);
  } else if (barra) {
    barra.classList.add('pegada');
  }

  /* ---------- indice: donde estas parado ---------- */
  if ('IntersectionObserver' in window) {
    var links = $$('.indice a[href^="#"], .tablilla a[href^="#"]');
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------- animacion de entrada ----------
     Con red de seguridad: si el observer no dispara, el contenido se muestra igual. */
  var revelar = $$('.reveal');
  function mostrar(el) { el.classList.add('in'); }

  if (menosMovimiento || !('IntersectionObserver' in window)) {
    revelar.forEach(mostrar);
  } else {
    var ior = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { mostrar(en.target); ior.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revelar.forEach(function (el) { ior.observe(el); });

    // lo que ya está en pantalla se muestra sin esperar al observer
    requestAnimationFrame(function () {
      revelar.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) mostrar(el);
      });
    });

    // y si a los 2 segundos no se reveló nada, se muestra todo
    setTimeout(function () {
      if (!document.querySelector('.reveal.in')) revelar.forEach(mostrar);
    }, 2000);
  }

  /* ---------- glosario: filtro ---------- */
  var buscador = $('#buscar-glosario');
  if (buscador) {
    var pliegues = $$('.glos-t');
    var vacio = $('#glos-vacio');
    var normal = function (s) {
      return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    buscador.addEventListener('input', function () {
      var q = normal(buscador.value.trim());
      var vistos = 0;
      pliegues.forEach(function (t) {
        var texto = normal(t.textContent);
        var ok = !q || texto.indexOf(q) !== -1;
        t.hidden = !ok;
        if (ok) vistos++;
      });
      if (vacio) vacio.hidden = vistos !== 0;
    });
  }

  /* ---------- arranque ---------- */
  $$('[data-tick^="paso-"]').forEach(function (b) {
    b.setAttribute('aria-pressed', estado.hecho[b.dataset.tick] ? 'true' : 'false');
    var li = b.closest('.tarea');
    if (li) li.classList.toggle('hecha', !!estado.hecho[b.dataset.tick]);
  });

  if ($('#etapas')) { pintarRuta(); progreso(); }
})();
