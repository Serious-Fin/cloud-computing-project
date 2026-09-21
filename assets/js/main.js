/* The Deploy Log — tiny site script.
   Three jobs: color theme, reading progress, post filtering. */

(function () {
  "use strict";

  /* ---------- 1. color theme (remembered in localStorage) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {
    /* localStorage blocked — fall back to the system preference */
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark =
        root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ---------- 2. reading progress bar (article pages) ---------- */
  var bar = document.getElementById("progress");
  if (bar) {
    var onScroll = function () {
      var max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------- 3. search + tag filtering (home page) ---------- */
  var list = document.getElementById("post-list");
  if (list) {
    var cards = Array.prototype.slice.call(list.querySelectorAll(".post-card"));
    var input = document.getElementById("search");
    var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
    var empty = document.getElementById("empty");
    var activeTag = "all";

    var apply = function () {
      var query = (input ? input.value : "").trim().toLowerCase();
      var shown = 0;

      cards.forEach(function (card) {
        var tags = card.getAttribute("data-tags") || "";
        var haystack = (
          (card.getAttribute("data-title") || "") +
          " " +
          (card.getAttribute("data-excerpt") || "") +
          " " +
          tags
        ).toLowerCase();

        var matchesTag = activeTag === "all" || tags.indexOf(activeTag) !== -1;
        var matchesQuery = query === "" || haystack.indexOf(query) !== -1;
        var visible = matchesTag && matchesQuery;

        card.hidden = !visible;
        if (visible) shown++;
      });

      if (empty) empty.hidden = shown > 0;
    };

    if (input) input.addEventListener("input", apply);

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeTag = chip.getAttribute("data-tag");
        chips.forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
        });
        apply();
      });
    });
  }

  /* ---------- 4. footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
