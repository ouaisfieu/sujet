/* Recherche plein texte côté client, sur l'index statique search-index.json */
(function () {
  "use strict";
  var form = document.getElementById("search-form");
  var input = document.getElementById("q");
  var out = document.getElementById("results");
  var status = document.getElementById("search-status");
  if (!form || !input || !out) return;
  var base = form.getAttribute("data-base") || "../";
  var index = null;

  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function snippet(text, terms) {
    var n = norm(text), pos = -1;
    for (var i = 0; i < terms.length && pos < 0; i++) pos = n.indexOf(terms[i]);
    var start = Math.max(0, pos - 90), s = text.slice(start, start + 240);
    var html = esc(s);
    terms.forEach(function (t) {
      if (t.length < 3) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      // surlignage approximatif (sans accents dans le motif)
      html = html.replace(re, "<mark>$1</mark>");
    });
    return (start > 0 ? "… " : "") + html + " …";
  }

  function run(q) {
    var terms = norm(q).split(/\s+/).filter(function (t) { return t.length > 1; });
    out.innerHTML = "";
    if (!terms.length) { status.textContent = ""; return; }
    var res = index.map(function (d) {
      var t = norm(d.title), h = norm(d.headings), b = norm(d.text), score = 0, all = true;
      terms.forEach(function (term) {
        var hit = false;
        if (t.indexOf(term) > -1) { score += 10; hit = true; }
        if (h.indexOf(term) > -1) { score += 5; hit = true; }
        var c = b.split(term).length - 1;
        if (c) { score += Math.min(c, 10); hit = true; }
        if (!hit) all = false;
      });
      return { d: d, score: all ? score : 0 };
    }).filter(function (r) { return r.score > 0; }).sort(function (a, b) { return b.score - a.score; });
    status.textContent = res.length ? res.length + " page(s) trouvée(s)" : "Aucun résultat.";
    res.forEach(function (r) {
      var li = document.createElement("li");
      li.innerHTML = '<a href="' + base + r.d.url + '">' + esc(r.d.title) + "</a><p>" + snippet(r.d.text, terms) + "</p>";
      out.appendChild(li);
    });
  }

  function load(cb) {
    if (index) return cb();
    fetch(base + "search-index.json").then(function (r) { return r.json(); })
      .then(function (j) { index = j; cb(); })
      .catch(function () { status.textContent = "L’index de recherche n’a pas pu être chargé."; });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    try { history.replaceState(null, "", "?q=" + encodeURIComponent(q)); } catch (err) {}
    load(function () { run(q); });
  });
  var params = new URLSearchParams(location.search);
  if (params.get("q")) { input.value = params.get("q"); load(function () { run(input.value); }); }
})();
