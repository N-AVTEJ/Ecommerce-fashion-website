/**
 * VELORA — Motion & Animation System
 * Cinematic Motion, Custom Cursor, Observer Engine & Micro-Interactions
 */

const VeloraMotion = {
  isTouchDevice: false,
  prefersReducedMotion: false,

  init() {
    this.checkEnvironment();
    this.initScrollProgress();
    this.initIntersectionObserver();
    this.initHeroTextReveal();
    this.initCountdownTimer();
    this.initCarousel();
    
    if (!this.isTouchDevice && !this.prefersReducedMotion) {
      this.initCustomCursor();
      this.initMagneticButtons();
      this.initParallax();
    }
  },

  checkEnvironment() {
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(pointer: coarse)").matches;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.isTouchDevice) {
      document.body.classList.add("touch-device");
    }
  },

  /**
   * 1. Dynamic Scroll Progress Bar
   */
  initScrollProgress() {
    const progressBar = document.getElementById("scrollProgressBar");
    if (!progressBar) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          progressBar.style.width = scrolled + "%";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  /**
   * 2. Luxury Custom Cursor with Fluid Lerp Follower
   */
  initCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isVisible = false;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        isVisible = true;
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      isVisible = false;
    });

    const renderRing = () => {
      // Lerp smoothing (linear interpolation)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(renderRing);
    };
    renderRing();

    // Hover expansions on interactive nodes
    const interactiveSelector = "a, button, input, select, textarea, .product-card, .category-card, .offer-card, .interactive-hover";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.remove("cursor-hover");
        dot.classList.remove("cursor-hover");
      }
    });
  },

  /**
   * 3. Intersection Observer for Scroll Reveals
   */
  initIntersectionObserver() {
    if (this.prefersReducedMotion) {
      document.querySelectorAll(".reveal-item, .stagger-grid").forEach(el => {
        el.classList.add("in-view");
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");

          // Handle staggered grid children
          if (entry.target.classList.contains("stagger-grid")) {
            const children = entry.target.querySelectorAll(".product-card, .category-card, .offer-card");
            children.forEach((child, index) => {
              child.style.transitionDelay = `${index * 80}ms`;
              child.classList.add("in-view");
            });
          }

          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-item, .stagger-grid, .editorial-quote, .section-header").forEach(el => {
      observer.observe(el);
    });
  },

  /**
   * 4. Editorial Split-Text Hero Reveal
   */
  initHeroTextReveal() {
    const heading = document.querySelector(".hero-title-reveal");
    if (!heading) return;

    // Split text into individual animated word/letter spans
    const lines = heading.getAttribute("data-text-lines");
    if (lines) {
      const lineArray = lines.split("|");
      heading.innerHTML = lineArray.map((line, lineIdx) => {
        const words = line.trim().split(" ");
        const wordsHtml = words.map((word, wordIdx) => {
          return `<span class="title-word" style="--word-delay: ${0.2 + (lineIdx * 0.2) + (wordIdx * 0.1)}s">${word}&nbsp;</span>`;
        }).join("");
        return `<span class="title-line">${wordsHtml}</span>`;
      }).join("");
    }
  },

  /**
   * 5. Magnetic-Style Button Physics
   */
  initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".magnetic-btn");
    magneticBtns.forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - btnCenterX) * 0.25;
        const deltaY = (e.clientY - btnCenterY) * 0.25;

        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = `translate3d(0, 0, 0)`;
        btn.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        setTimeout(() => {
          btn.style.transition = "";
        }, 400);
      });
    });
  },

  /**
   * 6. Cinematic Parallax for Hero Elements
   */
  initParallax() {
    const heroVisual = document.querySelector(".hero-visual-wrapper");
    const floatingElements = document.querySelectorAll(".parallax-float");
    if (!heroVisual && floatingElements.length === 0) return;

    let ticking = false;

    // Mouse movement subtle parallax
    window.addEventListener("mousemove", (e) => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const cx = (window.innerWidth / 2 - e.clientX) * 0.02;
        const cy = (window.innerHeight / 2 - e.clientY) * 0.02;

        floatingElements.forEach((el, idx) => {
          const factor = (idx + 1) * 0.7;
          el.style.transform = `translate3d(${cx * factor}px, ${cy * factor}px, 0)`;
        });

        ticking = false;
      });
      ticking = true;
    }, { passive: true });

    // Scroll parallax
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (heroVisual && scrollY < window.innerHeight) {
        heroVisual.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
      }
    }, { passive: true });
  },

  /**
   * 7. Promotional Countdown Timer (Live Ticking)
   */
  initCountdownTimer() {
    const timerContainer = document.getElementById("promoCountdown");
    if (!timerContainer) return;

    // Target 48 hours from session start
    const endTime = Date.now() + (47 * 3600 * 1000) + (59 * 60 * 1000) + (35 * 1000);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, endTime - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const hEl = document.getElementById("cdHours");
      const mEl = document.getElementById("cdMins");
      const sEl = document.getElementById("cdSecs");

      if (hEl) hEl.textContent = String(hours).padStart(2, "0");
      if (mEl) mEl.textContent = String(mins).padStart(2, "0");
      if (sEl) sEl.textContent = String(secs).padStart(2, "0");
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  },

  /**
   * 8. Horizontally Scrollable Showcase Carousel
   */
  initCarousel() {
    const track = document.getElementById("newArrivalsTrack");
    const prevBtn = document.getElementById("carouselPrevBtn");
    const nextBtn = document.getElementById("carouselNextBtn");

    if (!track) return;

    const scrollAmount = 340;

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }

    // Drag to scroll for desktop mouse
    let isDown = false;
    let startX, scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("is-dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.classList.remove("is-dragging");
    });

    track.addEventListener("mouseup", () => {
      isDown = false;
      track.classList.remove("is-dragging");
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });

    // Update navigation button active states
    const updateNavState = () => {
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 5;
      if (nextBtn) nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    };

    track.addEventListener("scroll", updateNavState, { passive: true });
    updateNavState();
  }
};

/**
 * VELORA Toast Notification Engine
 */
const VeloraToast = {
  container: null,

  init() {
    this.container = document.getElementById("toastContainer");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toastContainer";
      this.container.className = "toast-stack";
      document.body.appendChild(this.container);
    }
  },

  show({ title, message, type = "info", duration = 3400, actionText = null, action = null }) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `velora-toast toast-${type}`;

    let iconSvg = "";
    switch (type) {
      case "success":
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
        break;
      case "warning":
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        break;
      default:
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap">${iconSvg}</div>
      <div class="toast-content">
        <h5 class="toast-title">${title}</h5>
        ${message ? `<p class="toast-desc">${message}</p>` : ""}
      </div>
      ${actionText ? `<button type="button" class="toast-action-btn">${actionText}</button>` : ""}
      <button type="button" class="toast-close-btn" aria-label="Dismiss toast">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="toast-progress-bar" style="animation-duration: ${duration}ms"></div>
    `;

    this.container.appendChild(toast);

    // Request entrance animation
    requestAnimationFrame(() => {
      toast.classList.add("toast-show");
    });

    const closeToast = () => {
      toast.classList.remove("toast-show");
      toast.classList.add("toast-hide");
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 350);
    };

    const closeBtn = toast.querySelector(".toast-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeToast);

    if (actionText && action) {
      const actBtn = toast.querySelector(".toast-action-btn");
      if (actBtn) {
        actBtn.addEventListener("click", () => {
          closeToast();
          action();
        });
      }
    }

    const timer = setTimeout(closeToast, duration);
    toast.addEventListener("mouseenter", () => clearTimeout(timer));
  }
};
