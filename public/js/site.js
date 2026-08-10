/**
 * UNICON public site — navigation + Core Principles slideshow
 */
(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Sticky header
     -------------------------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --------------------------------------------------------------------------
     Mobile nav
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    navToggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* --------------------------------------------------------------------------
     Core Principles slideshow
     -------------------------------------------------------------------------- */
  const root = document.querySelector("[data-slideshow]");
  if (!root) return;

  const track = root.querySelector("[data-slideshow-track]");
  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const prevBtn = root.querySelector("[data-slide-prev]");
  const nextBtn = root.querySelector("[data-slide-next]");
  const playBtn = root.querySelector("[data-slide-autoplay]");
  const dotsHost = root.querySelector("[data-slideshow-dots]");
  const progressBar = root.querySelector("[data-progress-bar]");
  const currentEl = document.querySelector("[data-slide-current]");
  const totalEl = document.querySelector("[data-slide-total]");
  const indexButtons = Array.from(
    document.querySelectorAll("[data-principles-index] [data-goto-slide]")
  );

  const TOTAL = slides.length;
  const DURATION_MS = 9000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = 0;
  let playing = !reduceMotion;
  let timer = null;
  let touchStartX = null;
  let touchStartY = null;

  if (totalEl) {
    totalEl.textContent = String(TOTAL).padStart(2, "0");
  }

  // Build dots
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dot";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-label", `Principle ${i + 1}`);
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.addEventListener("click", () => goTo(i, { user: true }));
    dotsHost.appendChild(btn);
    return btn;
  });

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function restartProgress() {
    if (!progressBar) return;
    root.classList.remove("is-playing");
    // Force reflow so animation restarts
    void progressBar.offsetWidth;
    if (playing) {
      root.classList.add("is-playing");
    }
  }

  function clearTimer() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  function scheduleNext() {
    clearTimer();
    if (!playing) return;
    timer = window.setTimeout(() => {
      goTo((index + 1) % TOTAL, { user: false });
    }, DURATION_MS);
  }

  function setPlaying(next) {
    playing = next;
    root.classList.toggle("is-playing", playing);
    if (playBtn) {
      playBtn.setAttribute("aria-pressed", playing ? "true" : "false");
      playBtn.setAttribute("aria-label", playing ? "Pause autoplay" : "Play autoplay");
    }
    if (playing) {
      restartProgress();
      scheduleNext();
    } else {
      clearTimer();
      root.classList.remove("is-playing");
    }
  }

  function goTo(nextIndex, { user = false } = {}) {
    if (nextIndex === index && slides[index].classList.contains("is-active")) {
      if (user && playing) {
        restartProgress();
        scheduleNext();
      }
      return;
    }

    const prev = index;
    const dir = nextIndex > prev || (prev === TOTAL - 1 && nextIndex === 0)
      ? "right"
      : "left";

    // Handle wrap direction for autoplay 10 -> 0
    const wrappingForward = prev === TOTAL - 1 && nextIndex === 0;
    const wrappingBack = prev === 0 && nextIndex === TOTAL - 1;
    const exitClass = wrappingForward || (!wrappingBack && dir === "right")
      ? "is-exit-left"
      : "is-exit-right";

    slides[prev].classList.remove("is-active");
    slides[prev].classList.add(exitClass);
    slides[prev].setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      slides[prev].classList.remove(exitClass);
    }, 550);

    index = ((nextIndex % TOTAL) + TOTAL) % TOTAL;

    slides[index].classList.add("is-active");
    slides[index].setAttribute("aria-hidden", "false");

    dots.forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === index ? "true" : "false");
    });

    indexButtons.forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-current", active ? "true" : "false");
    });

    if (currentEl) currentEl.textContent = pad(index + 1);

    root.setAttribute("aria-label", `Core Principles slideshow, principle ${index + 1} of ${TOTAL}`);

    if (user) {
      // Keep autoplay state but reset the timer on manual navigation
      if (playing) {
        restartProgress();
        scheduleNext();
      }
    } else {
      restartProgress();
      scheduleNext();
    }
  }

  // Controls
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goTo(index - 1, { user: true });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goTo(index + 1, { user: true });
    });
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      setPlaying(!playing);
    });
  }

  indexButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.getAttribute("data-goto-slide"));
      if (Number.isNaN(target)) return;
      // Stay on the chosen principle — do not auto-advance after index pick
      setPlaying(false);
      goTo(target, { user: true });
    });
  });

  // Keyboard when slideshow focused (or anywhere while principles in view)
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1, { user: true });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1, { user: true });
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setPlaying(!playing);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0, { user: true });
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(TOTAL - 1, { user: true });
    }
  });

  // Touch / swipe
  root.addEventListener(
    "touchstart",
    (e) => {
      const t = e.changedTouches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    },
    { passive: true }
  );

  root.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      touchStartX = null;
      touchStartY = null;

      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) goTo(index + 1, { user: true });
      else goTo(index - 1, { user: true });
    },
    { passive: true }
  );

  // Pause autoplay when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimer();
      root.classList.remove("is-playing");
    } else if (playing) {
      restartProgress();
      scheduleNext();
    }
  });

  // Pause when slideshow leaves viewport (IntersectionObserver)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((en) => en.isIntersecting && en.intersectionRatio > 0.25);
        if (!visible) {
          clearTimer();
          root.classList.remove("is-playing");
        } else if (playing) {
          restartProgress();
          scheduleNext();
        }
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(root);
  }

  // Init first slide state
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === 0);
    slide.setAttribute("aria-hidden", i === 0 ? "false" : "true");
  });
  indexButtons.forEach((btn, i) => {
    const active = i === 0;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-current", active ? "true" : "false");
  });
  if (currentEl) currentEl.textContent = "01";
  setPlaying(playing);

  // Silence unused binding warning in some linters
  void track;
})();
