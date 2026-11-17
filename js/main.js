/**
 * VELORA — Main Application Controller & Creative Engine
 * Editorial Storefront, Dynamic Department Cards, Modals & Micro-Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  window.VeloraAudio = VeloraAudio;
  window.VeloraStoreUI = VeloraStoreUI;
  window.VeloraQuickView = VeloraQuickView;
  window.VeloraSearch = VeloraSearch;
  window.VeloraCheckout = VeloraCheckout;

  VeloraAudio.init();
  if (window.VeloraFilters) VeloraFilters.init();
  VeloraStoreUI.init();
  if (window.VeloraCart) VeloraCart.init();
  if (window.VeloraWishlist) VeloraWishlist.init();
  VeloraMotion.init();
  VeloraQuickView.init();
  VeloraSearch.init();
  VeloraCheckout.init();
});

/**
 * Luxury Web Audio Micro-Haptics
 * Subtle, procedural velvet click feedback (zero external audio files)
 */
const VeloraAudio = {
  ctx: null,
  enabled: true,

  init() {
    const unlock = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock, { once: true });
  },

  playClick() {
    if (!this.enabled || !this.ctx || this.ctx.state !== "running") return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  },

  playSuccess() {
    if (!this.enabled || !this.ctx || this.ctx.state !== "running") return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.08);
      osc2.frequency.setValueAtTime(783.99, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
};

/**
 * Storefront UI & Dynamic Card Rendering Engine
 */
const VeloraStoreUI = {
  init() {
    this.renderMenGrid();
    this.renderWomenGrid();
    this.renderTrendingGrid();
    this.renderNewArrivalsCarousel();
    this.bindGlobalEvents();
  },

  onDepartmentChange(dept) {
    // When department switches, smooth scroll if user clicked a department link
    const targetSection = dept === "men" ? document.getElementById("men-department") :
                          dept === "women" ? document.getElementById("women-department") :
                          document.getElementById("trending");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  },

  renderMenGrid() {
    const grid = document.getElementById("menProductsGrid");
    if (!grid) return;

    const products = window.VeloraFilters ? VeloraFilters.getFilteredMen() : VeloraProducts.getMenProducts();
    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-products-msg" style="grid-column: 1 / -1; text-align: center; padding: 48px;">
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">No creations found in this category.</p>
          <button type="button" class="btn btn-outline" onclick="VeloraFilters.setMenCategory('all')">View All Men's Pieces</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((prod, idx) => this.generateProductCardHtml(prod, idx)).join("");
    if (window.VeloraWishlist) VeloraWishlist.updateAllCardButtons();
  },

  renderWomenGrid() {
    const grid = document.getElementById("womenProductsGrid");
    if (!grid) return;

    const products = window.VeloraFilters ? VeloraFilters.getFilteredWomen() : VeloraProducts.getWomenProducts();
    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-products-msg" style="grid-column: 1 / -1; text-align: center; padding: 48px;">
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">No creations found in this category.</p>
          <button type="button" class="btn btn-outline" onclick="VeloraFilters.setWomenCategory('all')">View All Women's Pieces</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((prod, idx) => this.generateProductCardHtml(prod, idx)).join("");
    if (window.VeloraWishlist) VeloraWishlist.updateAllCardButtons();
  },

  renderTrendingGrid() {
    const grid = document.getElementById("trendingProductsGrid");
    if (!grid) return;

    const products = window.VeloraFilters ? VeloraFilters.getFilteredTrending() : VeloraProducts.getTrending();
    grid.innerHTML = products.map((prod, idx) => this.generateProductCardHtml(prod, idx)).join("");
    if (window.VeloraWishlist) VeloraWishlist.updateAllCardButtons();
  },

  renderNewArrivalsCarousel() {
    const track = document.getElementById("newArrivalsTrack");
    if (!track) return;

    const products = VeloraProducts.getNewArrivals();
    track.innerHTML = products.map(prod => `
      <div class="arrivals-card-item">
        ${this.generateProductCardHtml(prod, 0)}
      </div>
    `).join("");
    if (window.VeloraWishlist) VeloraWishlist.updateAllCardButtons();
  },

  generateProductCardHtml(prod, index) {
    const isWishlisted = window.VeloraWishlist ? VeloraWishlist.has(prod.id) : false;
    const defaultSize = prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : "M";
    const defaultColor = prod.colors && prod.colors.length > 0 ? prod.colors[0].name : null;

    const colorDots = (prod.colors || []).map(c => `
      <span class="color-swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
    `).join("");

    const sizesText = (prod.sizes || []).slice(0, 4).join(" · ");

    return `
      <article class="product-card" data-product-id="${prod.id}" data-department="${prod.department}">
        <div class="card-media">
          <img 
            src="${prod.image}" 
            alt="${prod.name}" 
            class="product-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/fallback.svg'"
          />
          ${prod.secondaryImage ? `
            <img 
              src="${prod.secondaryImage}" 
              alt="${prod.name} Alternate View" 
              class="product-img-secondary" 
              loading="lazy"
              onerror="this.onerror=null; this.src='assets/images/fallback.svg'"
            />
          ` : ""}

          ${prod.badge ? `<span class="card-badge ${prod.discountPercent > 0 ? 'badge-sale' : ''}">${prod.badge}</span>` : ""}

          <button 
            type="button" 
            class="card-wishlist-btn ${isWishlisted ? 'is-active' : ''}" 
            data-wishlist-id="${prod.id}"
            aria-label="Add ${prod.name} to Wishlist"
            onclick="VeloraWishlist.toggle('${prod.id}', this)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#E11D48' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="card-quick-actions">
            <button 
              type="button" 
              class="card-action-btn card-quickview-btn"
              onclick="VeloraQuickView.open('${prod.id}')"
            >
              <span>Quick View</span>
            </button>
            <button 
              type="button" 
              class="card-action-btn"
              onclick="VeloraCart.addItem('${prod.id}', '${defaultSize}', '${defaultColor}', 1)"
            >
              <span>+ Add to Bag</span>
            </button>
          </div>
        </div>

        <div class="card-content">
          <div class="card-meta-row">
            <span>${prod.category}</span>
            <span>★ ${prod.rating}</span>
          </div>

          <h4 class="product-name">${prod.name}</h4>

          <div class="product-price-row">
            <span class="discounted-price">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
            ${prod.originalPrice > prod.discountedPrice ? `
              <span class="original-price">${VeloraProducts.formatPrice(prod.originalPrice)}</span>
              <span class="discount-badge">${prod.discountPercent}% OFF</span>
            ` : ""}
          </div>

          <div class="card-footer-row">
            <div class="color-swatches-row">${colorDots}</div>
            <span class="sizes-summary-text">${sizesText}</span>
          </div>
        </div>
      </article>
    `;
  },

  bindGlobalEvents() {
    // Carousel navigation controls
    const prevBtn = document.getElementById("carouselPrevBtn");
    const nextBtn = document.getElementById("carouselNextBtn");
    const track = document.getElementById("newArrivalsTrack");

    if (prevBtn && track) {
      prevBtn.addEventListener("click", () => {
        VeloraAudio.playClick();
        track.scrollBy({ left: -320, behavior: "smooth" });
      });
    }

    if (nextBtn && track) {
      nextBtn.addEventListener("click", () => {
        VeloraAudio.playClick();
        track.scrollBy({ left: 320, behavior: "smooth" });
      });
    }

    // Voucher Copy Buttons
    document.querySelectorAll(".copy-voucher-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        VeloraAudio.playClick();
        const code = btn.getAttribute("data-voucher");
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            VeloraToast.show({
              title: "Voucher Copied!",
              message: `Code ${code} saved to clipboard.`,
              type: "success"
            });
          }).catch(() => {
            VeloraCart.applyPromo(code);
          });
        }
      });
    });

    // Newsletter Form
    const nlForm = document.getElementById("newsletterForm");
    const nlInput = document.getElementById("newsletterEmail");
    const nlSuccess = document.getElementById("newsletterSuccessMsg");

    if (nlForm && nlInput) {
      nlForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = nlInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          VeloraToast.show({
            title: "Invalid Email",
            message: "Please enter a valid email address.",
            type: "warning"
          });
          nlInput.focus();
          return;
        }

        nlForm.style.display = "none";
        if (nlSuccess) nlSuccess.style.display = "block";
        VeloraAudio.playSuccess();
        VeloraToast.show({
          title: "Welcome to VELORA",
          message: "Check your inbox for your 15% privilege voucher.",
          type: "success"
        });
      });
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById("mobileNavToggle");
    const mobileDrawer = document.getElementById("mobileNavDrawer");
    const mobileOverlay = document.getElementById("mobileNavOverlay");
    const closeMobileBtn = document.getElementById("closeMobileNavBtn");

    const openDrawer = () => {
      VeloraAudio.playClick();
      if (mobileDrawer) mobileDrawer.classList.add("is-open");
      if (mobileOverlay) mobileOverlay.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    };

    const closeDrawer = () => {
      if (mobileDrawer) mobileDrawer.classList.remove("is-open");
      if (mobileOverlay) mobileOverlay.classList.remove("is-visible");
      document.body.classList.remove("drawer-open");
    };

    if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
    if (closeMobileBtn) closeMobileBtn.addEventListener("click", closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeDrawer);

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", closeDrawer);
    });

    // Sticky Header Scroll Listener
    const navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 30);
      }, { passive: true });
    }
  }
};

/**
 * Quick View Product Inspection Modal
 */
const VeloraQuickView = {
  currentProductId: null,
  selectedSize: null,
  selectedColor: null,
  selectedQty: 1,

  init() {
    this.bindEvents();
  },

  open(productId) {
    const prod = VeloraProducts.getById(productId);
    if (!prod) return;

    VeloraAudio.playClick();
    this.currentProductId = prod.id;
    this.selectedSize = prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : "M";
    this.selectedColor = prod.colors && prod.colors.length > 0 ? prod.colors[0].name : "Standard";
    this.selectedQty = 1;

    const modal = document.getElementById("quickViewModal");
    const overlay = document.getElementById("quickViewOverlay");
    const content = document.getElementById("quickViewBody");

    if (!modal || !content) return;

    const sizeBtns = (prod.sizes || []).map((s, idx) => `
      <button type="button" class="qv-size-btn ${idx === 0 ? 'is-active' : ''}" onclick="VeloraQuickView.setSize('${s}', this)">${s}</button>
    `).join("");

    const colorDots = (prod.colors || []).map((c, idx) => `
      <button 
        type="button" 
        class="color-swatch-dot ${idx === 0 ? 'is-active' : ''}" 
        style="background-color: ${c.hex}; width: 22px; height: 22px; cursor: pointer;" 
        title="${c.name}"
        onclick="VeloraQuickView.setColor('${c.name}', this)"
      ></button>
    `).join("");

    content.innerHTML = `
      <div class="qv-image-pane">
        <img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
      </div>
      <div class="qv-details-pane">
        <div class="card-meta-row">
          <span>${prod.department.toUpperCase()} // ${prod.category}</span>
          <span>★ ${prod.rating} (${prod.reviewCount} Reviews)</span>
        </div>
        <h3 style="font-size: 1.65rem; font-weight: 800; color: var(--color-charcoal);">${prod.name}</h3>
        
        <div class="product-price-row">
          <span class="discounted-price" style="font-size: 1.5rem;">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
          ${prod.originalPrice > prod.discountedPrice ? `
            <span class="original-price" style="font-size: 1.05rem;">${VeloraProducts.formatPrice(prod.originalPrice)}</span>
            <span class="discount-badge" style="font-size: 0.85rem;">${prod.discountPercent}% OFF</span>
          ` : ""}
        </div>

        <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.6;">${prod.description}</p>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); font-family: var(--font-mono);">Fabric: ${prod.fabric}</p>

        <div>
          <label style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; display: block;">Select Size</label>
          <div class="qv-size-selector">${sizeBtns}</div>
        </div>

        <div>
          <label style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; display: block;">Select Color: <span id="qvSelectedColorText">${this.selectedColor}</span></label>
          <div style="display: flex; gap: 8px;">${colorDots}</div>
        </div>

        <div style="display: flex; gap: 16px; margin-top: 12px;">
          <div class="cart-qty-stepper" style="padding: 4px 8px;">
            <button type="button" class="qty-step-btn" onclick="VeloraQuickView.stepQty(-1)">−</button>
            <span id="qvQtyDisplay" class="qty-number" style="min-width: 36px;">1</span>
            <button type="button" class="qty-step-btn" onclick="VeloraQuickView.stepQty(1)">+</button>
          </div>
          <button type="button" class="btn btn-primary" style="flex: 1;" onclick="VeloraQuickView.submitAddToCart()">
            <span>Add to Shopping Bag</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.add("is-open");
    if (overlay) overlay.classList.add("is-visible");
    document.body.classList.add("modal-open");
  },

  close() {
    const modal = document.getElementById("quickViewModal");
    const overlay = document.getElementById("quickViewOverlay");
    if (modal) modal.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
    this.currentProductId = null;
  },

  setSize(size, btn) {
    this.selectedSize = size;
    btn.parentElement.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  },

  setColor(colorName, btn) {
    this.selectedColor = colorName;
    const txt = document.getElementById("qvSelectedColorText");
    if (txt) txt.textContent = colorName;
    btn.parentElement.querySelectorAll(".color-swatch-dot").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  },

  stepQty(delta) {
    VeloraAudio.playClick();
    this.selectedQty = Math.max(1, Math.min(10, this.selectedQty + delta));
    const disp = document.getElementById("qvQtyDisplay");
    if (disp) disp.textContent = this.selectedQty;
  },

  submitAddToCart() {
    if (!this.currentProductId) return;
    VeloraCart.addItem(this.currentProductId, this.selectedSize, this.selectedColor, this.selectedQty);
    this.close();
  },

  bindEvents() {
    const closeBtn = document.getElementById("closeQuickViewBtn");
    const overlay = document.getElementById("quickViewOverlay");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (overlay) overlay.addEventListener("click", () => this.close());
  }
};

/**
 * Real-Time Search Overlay
 */
const VeloraSearch = {
  isOpen: false,

  init() {
    this.bindEvents();
  },

  open() {
    VeloraAudio.playClick();
    const modal = document.getElementById("searchModal");
    const input = document.getElementById("searchModalInput");
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    this.isOpen = true;
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
    }
    this.renderResults("");
  },

  close() {
    const modal = document.getElementById("searchModal");
    if (modal) modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    this.isOpen = false;
  },

  renderResults(query) {
    const grid = document.getElementById("searchResultsGrid");
    if (!grid) return;

    if (!query || query.trim() === "") {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 32px;">Type to search the Men's and Women's collections (e.g. "Hoodie", "Dress", "Oxford", "Saree").</p>`;
      return;
    }

    const matches = VeloraProducts.search(query);
    if (matches.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 32px;">No pieces found matching "${query}".</p>`;
      return;
    }

    grid.innerHTML = matches.map(prod => `
      <div class="search-result-item" style="background: #FFFFFF; padding: 12px; border-radius: 8px; display: flex; gap: 12px; align-items: center; border: 1px solid var(--border-subtle); cursor: pointer;" onclick="VeloraSearch.close(); VeloraQuickView.open('${prod.id}')">
        <img src="${prod.image}" alt="${prod.name}" style="width: 54px; height: 72px; object-fit: cover; border-radius: 4px;" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; color: var(--color-soft-violet);">${prod.department.toUpperCase()} // ${prod.category}</span>
          <h5 style="font-size: 0.92rem; font-weight: 700; color: var(--color-charcoal); margin: 2px 0;">${prod.name}</h5>
          <span style="font-size: 0.95rem; font-weight: 800; color: var(--color-charcoal);">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
        </div>
      </div>
    `).join("");
  },

  bindEvents() {
    const openBtns = document.querySelectorAll(".open-search-btn");
    const closeBtn = document.getElementById("closeSearchBtn");
    const input = document.getElementById("searchModalInput");

    openBtns.forEach(btn => btn.addEventListener("click", () => this.open()));
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    if (input) {
      input.addEventListener("input", (e) => this.renderResults(e.target.value));
    }

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.isOpen ? this.close() : this.open();
      }
      if (e.key === "Escape") {
        if (this.isOpen) this.close();
        VeloraQuickView.close();
        if (window.VeloraCart) VeloraCart.close();
        if (window.VeloraWishlist) VeloraWishlist.close();
      }
    });
  }
};

/**
 * Simulated Luxury Checkout System
 */
const VeloraCheckout = {
  isOpen: false,

  init() {
    const closeBtn = document.getElementById("closeCheckoutBtn");
    const overlay = document.getElementById("checkoutOverlay");
    const form = document.getElementById("checkoutOrderForm");

    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (overlay) overlay.addEventListener("click", () => this.close());
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.completeOrder();
      });
    }
  },

  open() {
    const totals = VeloraCart.getTotals();
    if (totals.totalItems === 0) {
      VeloraToast.show({ title: "Bag is Empty", message: "Select garments before checkout.", type: "warning" });
      return;
    }

    const modal = document.getElementById("checkoutModal");
    const overlay = document.getElementById("checkoutOverlay");
    const summaryContainer = document.getElementById("checkoutSummaryList");
    const totalEl = document.getElementById("checkoutModalTotal");

    if (!modal) return;

    if (summaryContainer) {
      summaryContainer.innerHTML = VeloraCart.items.map(item => {
        const prod = VeloraProducts.getById(item.id);
        if (!prod) return "";
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-subtle); font-size: 0.9rem;">
            <div>
              <strong>${prod.name}</strong> <small style="color: var(--color-text-muted);">(${item.size} × ${item.quantity})</small>
            </div>
            <span>${VeloraProducts.formatPrice(prod.discountedPrice * item.quantity)}</span>
          </div>
        `;
      }).join("");
    }

    if (totalEl) totalEl.textContent = VeloraProducts.formatPrice(totals.finalTotal);

    modal.classList.add("is-open");
    if (overlay) overlay.classList.add("is-visible");
    document.body.classList.add("modal-open");
    this.isOpen = true;
  },

  close() {
    const modal = document.getElementById("checkoutModal");
    const overlay = document.getElementById("checkoutOverlay");
    if (modal) modal.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
    this.isOpen = false;
  },

  completeOrder() {
    VeloraAudio.playSuccess();
    const orderId = "VEL-2026-" + Math.floor(10000 + Math.random() * 90000);
    const totals = VeloraCart.getTotals();

    const checkoutBody = document.getElementById("checkoutModalBody");
    if (checkoutBody) {
      checkoutBody.innerHTML = `
        <div style="text-align: center; padding: 32px 16px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-soft-violet); color: #FFF; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="section-tag">ORDER CONFIRMED</span>
          <h2 style="font-size: 1.8rem; margin: 8px 0;">Thank You for Shopping with VELORA</h2>
          <p style="color: var(--color-text-secondary); max-width: 440px; margin: 0 auto 24px;">Your order <strong>#${orderId}</strong> for <strong>${VeloraProducts.formatPrice(totals.finalTotal)}</strong> has been registered for white-glove packaging and express dispatch.</p>
          <button type="button" class="btn btn-charcoal" onclick="VeloraCheckout.finishOrder()">Return to Boutique</button>
        </div>
      `;
    }

    VeloraCart.clear();
  },

  finishOrder() {
    this.close();
    location.reload();
  }
};

/**
 * Toast Notification Module
 */
const VeloraToast = {
  show({ title, message, type = "info", duration = 3500 }) {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="display: flex; flex-direction: column;">
        <strong style="font-family: var(--font-heading); font-size: 0.9rem;">${title}</strong>
        ${message ? `<span style="font-size: 0.8rem; opacity: 0.9;">${message}</span>` : ""}
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

window.VeloraToast = VeloraToast;
