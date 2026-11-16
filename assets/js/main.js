/* Améliorations progressives : le site reste entièrement lisible sans JavaScript. */
(function () {
  "use strict";
  var root = document.documentElement;

  // Thème clair / sombre (préférence mémorisée si le stockage est disponible)
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var saved = store("theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  var tbtn = document.getElementById("theme-toggle");
  if (tbtn) {
    tbtn.hidden = false;
    tbtn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store("theme", next);
    });
  }

  // Menu mobile
  var mbtn = document.getElementById("menu-toggle"), nav = document.getElementById("site-nav");
  if (mbtn && nav) {
    mbtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      mbtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Sommaire : mise en évidence de la section courante
  var links = document.querySelectorAll(".toc a[href^='#']");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var a = map[e.target.id]; if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
