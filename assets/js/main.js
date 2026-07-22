/* ---------------------------------------------------------
   main.js — small, dependency-free interactivity
   --------------------------------------------------------- */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Highlight active nav link using body[data-page] ---- */
  function markActiveNav() {
    var page = document.body.dataset.page;
    document.querySelectorAll(".nav__links a[data-nav]").forEach(function (a) {
      if (a.dataset.nav === page) a.classList.add("is-active");
    });
  }

  /* ---- Reveal on scroll (optionally scoped to a given NodeList) ---- */
  var _io = null;
  function reveal(list) {
    var els = list || document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    if (!_io) {
      _io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); _io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    els.forEach(function (e) { _io.observe(e); });
  }

  /* ---- Streaming "typed" text for hero dialogue ----
     Elements with [data-stream] reveal sequentially: a typing
     indicator shows, then text streams in, then the next one. */
  function runConversation() {
    var steps = Array.prototype.slice.call(document.querySelectorAll("[data-stream]"));
    if (!steps.length) return;

    if (reduce) {
      steps.forEach(function (el) {
        el.style.opacity = 1;
        var t = el.querySelector(".stream-text");
        if (t) t.textContent = t.dataset.text || t.textContent;
      });
      return;
    }

    steps.forEach(function (el) { el.style.opacity = 0; });

    function typeText(node, text, done) {
      node.classList.add("caret");
      var i = 0;
      var speed = 12; // ms per char
      (function tick() {
        node.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) {
          setTimeout(tick, speed + (text[i - 1] === "." ? 90 : 0));
        } else {
          node.classList.remove("caret");
          done && done();
        }
      })();
    }

    function playStep(idx) {
      if (idx >= steps.length) return;
      var el = steps[idx];
      el.style.transition = "opacity .4s ease, transform .4s ease";
      el.style.transform = "translateY(8px)";
      el.style.opacity = 1;
      requestAnimationFrame(function () { el.style.transform = "none"; });

      var typing = el.querySelector(".typing");
      var textNode = el.querySelector(".stream-text");
      var full = textNode ? (textNode.dataset.text || textNode.textContent || "") : "";
      if (textNode) textNode.textContent = "";      // clear fallback text before typing
      if (typing) typing.classList.add("is-on");    // show typing indicator
      var thinkTime = idx === 0 ? 350 : 500;

      setTimeout(function () {
        if (typing) typing.classList.remove("is-on");
        if (textNode) {
          typeText(textNode, full, function () { setTimeout(function () { playStep(idx + 1); }, 350); });
        } else {
          playStep(idx + 1);
        }
      }, thinkTime);
    }
    playStep(0);
  }

  /* ---- Helpers ---- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function monthName(m) {
    return ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m] || "";
  }
  function fmtDate(d) {
    var p = String(d).split("-");
    var y = p[0], m = parseInt(p[1], 10);
    return m ? monthName(m) + " " + y : y;
  }
  function dateKey(d) {
    var p = String(d).split("-");
    return parseInt(p[0], 10) * 10000 + (parseInt(p[1], 10) || 0) * 100 + (parseInt(p[2], 10) || 0);
  }
  function authorsHTML(authors) {
    var me = (window.ME || "").trim().replace(/\*+$/, "");
    return authors.map(function (a) {
      var bare = a.trim().replace(/\*+$/, "");
      return bare === me ? '<span class="me">' + esc(a) + "</span>" : esc(a);
    }).join(", ");
  }

  /* ---- Render publications from window.PUBLICATIONS ---- */
  function renderPublications() {
    var host = document.getElementById("pub-list");
    if (!host || !window.PUBLICATIONS) return;
    var pubs = window.PUBLICATIONS.slice().sort(function (a, b) {
      return (b.year || 0) - (a.year || 0);
    });
    host.innerHTML = pubs.map(function (p) {
      var links = (p.links || []).filter(function (l) { return l && l.url; })
        .map(function (l) {
          return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
        }).join("");
      var award = p.award
        ? '<span class="pub__award"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z"/></svg>' + esc(p.award) + "</span>"
        : "";
      return '<article class="pub reveal" data-tags="' + esc(p.type || "") + '">' +
        '<div class="pub__top">' +
          '<span class="pub__venue">' + esc(p.venue || "") + "</span>" +
          '<span class="pub__year">' + esc(p.year || "") + "</span>" +
        "</div>" +
        '<h2 class="pub__title">' + esc(p.title || "") + "</h2>" +
        '<p class="pub__authors">' + authorsHTML(p.authors || []) + "</p>" +
        (p.note ? '<p class="pub__note">' + esc(p.note) + "</p>" : "") +
        (award ? '<p class="pub__desc">' + award + "</p>" : "") +
        (links ? '<div class="pub__links">' + links + "</div>" : "") +
      "</article>";
    }).join("");
    reveal(host.querySelectorAll(".reveal"));
  }

  /* ---- Render news timeline from window.NEWS ---- */
  function renderNews() {
    var host = document.getElementById("news-list");
    if (!host || !window.NEWS) return;
    var limit = parseInt(host.dataset.limit, 10) || 0;
    var items = window.NEWS.slice().sort(function (a, b) {
      return dateKey(b.date) - dateKey(a.date);
    });
    if (limit > 0) items = items.slice(0, limit);
    host.innerHTML = items.map(function (n, i) {
      return '<article class="news-item reveal' + (i === 0 ? " is-fresh" : "") + '">' +
        '<div class="news-item__date">' + esc(fmtDate(n.date)) + "</div>" +
        '<div class="news-item__body">' +
          (n.tag ? '<span class="tag">' + esc(n.tag) + "</span>" : "") +
          "<p>" + (n.text || "") + "</p>" +
        "</div>" +
      "</article>";
    }).join("");
    reveal(host.querySelectorAll(".reveal"));
  }

  /* ---- Render CV from window.CV ---- */
  function cvEntry(e) {
    var items = (e.items && e.items.length)
      ? '<ul class="cv-items">' + e.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"
      : "";
    return '<div class="cv-entry reveal">' +
      '<div class="cv-entry__row">' +
        '<span class="cv-entry__title">' + esc(e.title || "") + "</span>" +
        (e.date ? '<span class="cv-entry__date">' + esc(e.date) + "</span>" : "") +
      "</div>" +
      (e.org ? '<div class="cv-entry__org">' + esc(e.org) + "</div>" : "") +
      items +
    "</div>";
  }
  function cvSection(id, label, inner) {
    return '<section class="cv-section reveal" id="' + id + '">' +
      '<h2 class="cv-section__title">' + esc(label) + "</h2>" + inner + "</section>";
  }
  function renderCV() {
    var host = document.getElementById("cv-body");
    if (!host || !window.CV) return;
    var cv = window.CV, html = "";
    var upd = document.getElementById("cv-updated");
    if (upd && cv.updated) upd.textContent = "Last updated " + cv.updated;

    if (cv.interest)
      html += cvSection("interest", "Research Interest", '<p class="cv-lead">' + esc(cv.interest) + "</p>");

    if (cv.education)
      html += cvSection("education", "Education", cv.education.map(cvEntry).join(""));

    /* Publications reused from data/publications.js */
    if (window.PUBLICATIONS) {
      var pubs = window.PUBLICATIONS.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
      var mk = function (list) {
        return list.map(function (p) {
          var links = (p.links || []).filter(function (l) { return l && l.url; }).map(function (l) {
            return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
          }).join("");
          return '<div class="cv-pub reveal">' +
            '<div class="cv-entry__row"><span class="cv-pub__title">' + esc(p.title) + "</span>" +
            '<span class="cv-entry__date">' + esc(p.year) + "</span></div>" +
            '<div class="cv-pub__authors">' + authorsHTML(p.authors || []) + "</div>" +
            (p.note ? '<div class="pub__note">' + esc(p.note) + "</div>" : "") +
            '<div class="cv-pub__venue">' + esc(p.venue || "") + "</div>" +
            (links ? '<div class="pub__links">' + links + "</div>" : "") +
          "</div>";
        }).join("");
      };
      var papers = pubs.filter(function (p) { return p.type !== "preprint"; });
      var preprints = pubs.filter(function (p) { return p.type === "preprint"; });
      if (papers.length) html += cvSection("publications", "Publications", mk(papers));
      if (preprints.length) html += cvSection("preprints", "Preprints", mk(preprints));
    }

    if (cv.services) {
      var svc = cv.services.map(function (g) {
        var line = g.items.map(function (it) {
          return esc(it.title) + (it.year ? ' <span class="cv-year">(' + esc(it.year) + ")</span>" : "");
        }).join(", ");
        return '<div class="cv-entry reveal"><span class="cv-entry__title">' + esc(g.group) +
               '</span><div class="cv-entry__org">' + line + "</div></div>";
      }).join("");
      html += cvSection("services", "Academic Services", svc);
    }

    if (cv.teaching) html += cvSection("teaching", "Teaching", cv.teaching.map(cvEntry).join(""));
    if (cv.mentoring) html += cvSection("mentoring", "Mentoring", cv.mentoring.map(cvEntry).join(""));
    if (cv.awards) html += cvSection("awards", "Awards", cv.awards.map(cvEntry).join(""));

    host.innerHTML = html;
    reveal(host.querySelectorAll(".reveal"));
  }

  /* ---- Publication filters (bound after render) ---- */
  function pubFilters() {
    var bar = document.querySelector(".filters");
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      bar.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.dataset.filter;
      document.querySelectorAll(".pub").forEach(function (p) {
        var show = f === "all" || (p.dataset.tags || "").split(" ").indexOf(f) > -1;
        p.style.display = show ? "" : "none";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNav();
    renderPublications();
    renderNews();
    renderCV();
    reveal();            // reveal any static .reveal elements on the page
    runConversation();
    pubFilters();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
