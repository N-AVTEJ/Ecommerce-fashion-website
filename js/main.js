/**
 * VELORA — Main Application Controller & Creative Engine
 * Editorial Storefront, Dynamic Cards, Modals & Micro-Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  window.VeloraAudio = VeloraAudio;
  window.VeloraProductsService = VeloraProductsService;
  window.VeloraStoreUI = VeloraStoreUI;
  window.VeloraQuickView = VeloraQuickView;
  window.VeloraSearch = VeloraSearch;
  window.VeloraCheckout = VeloraCheckout;

  VeloraAudio.init();
  VeloraProductsService.init();
  VeloraCart.init();
  VeloraWishlist.init();
  VeloraMotion.init();
  VeloraQuickView.init();
  VeloraSearch.init();
  VeloraCheckout.init();
  VeloraStoreUI.init();
});

/**
 * Luxury Web Audio Micro-Haptics
 * Subtle, procedural velvet click feedback (zero external audio files)
 */
const VeloraAudio = {
  ctx: null,
  enabled: true,

  init() {
    // Lazy initialize on first interaction
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
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {}
  }
};

/**
 * Storefront Display & Product Grid Controller
 */
const VeloraProductsService = {
  currentCategory: "All",
  currentSort: "featured",

  init() {
    this.renderTrendingGrid();
    this.renderNewArrivalsCarousel();
    this.bindFilters();
  },

  renderTrendingGrid() {
    const grid = document.getElementById("trendingProductsGrid");
    if (!grid) return;

    let products = VeloraProducts.getByCategory(this.currentCategory);
    products = VeloraProducts.sort(products, this.currentSort);

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-products-msg">
          <p>No archival pieces currently active in this category.</p>
          <button type="button" class="btn btn-outline" onclick="VeloraProductsService.setCategory('All')">View All Collections</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((prod, index) => this.generateProductCardHtml(prod, index)).join("");
    
    // Refresh Wishlist active states
    if (window.VeloraWishlist) {
      VeloraWishlist.updateAllCardButtons();
    }
  },

  renderNewArrivalsCarousel() {
    const track = document.getElementById("newArrivalsTrack");
    if (!track) return;

    const arrivals = VeloraProducts.getNewArrivals();
    const list = arrivals.length >= 6 ? arrivals : VeloraProducts.getAll().slice(0, 8);

    track.innerHTML = list.map((prod, index) => `
      <div class="carousel-item">
        ${this.generateProductCardHtml(prod, index)}
      </div>
    `).join("");

    if (window.VeloraWishlist) {
      VeloraWishlist.updateAllCardButtons();
    }
  },

  generateProductCardHtml(prod, index = 0) {
    const isWishlisted = window.VeloraWishlist && VeloraWishlist.has(prod.id);
    const swatches = prod.colors && prod.colors.length > 0 
      ? prod.colors.map(c => `<span class="card-color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`).join("")
      : "";

    const sizePills = prod.sizes && prod.sizes.length > 0
      ? prod.sizes.slice(0, 5).map(sz => `
          <button 
            type="button" 
            class="card-size-pill" 
            title="Instant add size ${sz}" 
            onclick="event.stopPropagation(); VeloraAudio.playClick(); VeloraCart.addItem('${prod.id}', '${sz}');"
          >${sz}</button>
        `).join("")
      : "";

    return `
      <article class="product-card reveal-item" data-id="${prod.id}" style="--stagger-index: ${index}">
        <div class="product-image-container" onclick="VeloraQuickView.open('${prod.id}')">
          <img 
            src="${prod.image}" 
            alt="${prod.name}" 
            class="product-primary-img" 
            loading="lazy" 
            onerror="this.onerror=null; this.src='assets/images/fallback.svg'"
          />
          ${prod.secondaryImage ? `
            <img 
              src="${prod.secondaryImage}" 
              alt="${prod.name} alternate view" 
              class="product-secondary-img" 
              loading="lazy" 
              onerror="this.style.display='none'"
            />
          ` : ""}

          <!-- Editorial Archival Code & Badges -->
          <div class="product-badges">
            <span class="badge badge-code">${prod.code || prod.sku}</span>
            ${prod.badge ? `<span class="badge badge-${prod.badge.toLowerCase().includes('sale') ? 'sale' : 'accent'}">${prod.badge}</span>` : ""}
          </div>

          <!-- Wishlist & Quick View Floating Actions -->
          <div class="product-floating-actions" onclick="event.stopPropagation()">
            <button 
              type="button" 
              class="card-action-btn wishlist-toggle-btn ${isWishlisted ? 'is-active' : ''}" 
              data-id="${prod.id}" 
              title="Add to Wishlist" 
              aria-label="Wishlist piece"
              onclick="VeloraAudio.playClick(); VeloraWishlist.toggle('${prod.id}', this)"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <button 
              type="button" 
              class="card-action-btn quick-view-btn" 
              title="Inspect Piece" 
              aria-label="Quick inspect"
              onclick="VeloraAudio.playClick(); VeloraQuickView.open('${prod.id}')"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>

          <!-- Quick-Size Selector on Hover -->
          <div class="card-quick-sizes-bar" onclick="event.stopPropagation()">
            <span class="quick-sizes-label">SELECT SIZE:</span>
            <div class="quick-sizes-row">
              ${sizePills}
            </div>
          </div>
        </div>

        <div class="product-info-wrap">
          <div class="product-category-row">
            <span class="product-category-label">${prod.category}</span>
            <div class="product-swatches">${swatches}</div>
          </div>

          <h3 class="product-title" onclick="VeloraQuickView.open('${prod.id}')">${prod.name}</h3>

          <p class="product-fabric-meta">${prod.fabric || 'Luxury Textile'}</p>

          <div class="product-price-row">
            <span class="product-discounted-price">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
            ${prod.originalPrice > prod.discountedPrice ? `
              <span class="product-original-price">${VeloraProducts.formatPrice(prod.originalPrice)}</span>
              <span class="product-discount-pill">-${prod.discountPercent}%</span>
            ` : ""}
          </div>
        </div>
      </article>
    `;
  },

  setCategory(category) {
    this.currentCategory = category;

    document.querySelectorAll(".category-tab-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-category") === category);
    });

    this.renderTrendingGrid();
  },

  setSort(sortValue) {
    this.currentSort = sortValue;
    this.renderTrendingGrid();
  },

  bindFilters() {
    document.querySelectorAll(".category-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        VeloraAudio.playClick();
        const cat = btn.getAttribute("data-category");
        this.setCategory(cat);
      });
    });

    const sortSelect = document.getElementById("productSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        VeloraAudio.playClick();
        this.setSort(e.target.value);
      });
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

    this.currentProductId = productId;
    this.selectedSize = prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : "M";
    this.selectedColor = prod.colors && prod.colors.length > 0 ? prod.colors[0].name : "Standard";
    this.selectedQty = 1;

    const modal = document.getElementById("quickViewModal");
    const overlay = document.getElementById("quickViewOverlay");
    const container = document.getElementById("quickViewContent");

    if (!modal || !container) return;

    container.innerHTML = `
      <div class="quickview-grid">
        <!-- Visual Gallery -->
        <div class="quickview-gallery">
          <div class="quickview-main-image-wrap">
            <img id="qvMainImg" src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
          </div>
          ${prod.secondaryImage ? `
            <div class="quickview-thumbs">
              <button type="button" class="qv-thumb-btn is-active" onclick="document.getElementById('qvMainImg').src='${prod.image}'; this.parentElement.querySelectorAll('.qv-thumb-btn').forEach(b => b.classList.remove('is-active')); this.classList.add('is-active');">
                <img src="${prod.image}" alt="Primary view" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
              </button>
              <button type="button" class="qv-thumb-btn" onclick="document.getElementById('qvMainImg').src='${prod.secondaryImage}'; this.parentElement.querySelectorAll('.qv-thumb-btn').forEach(b => b.classList.remove('is-active')); this.classList.add('is-active');">
                <img src="${prod.secondaryImage}" alt="Secondary view" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
              </button>
            </div>
          ` : ""}
        </div>

        <!-- Product Specs & Configuration -->
        <div class="quickview-details">
          <div class="qv-meta-top">
            <span class="qv-sku-code">${prod.sku} • ${prod.code || prod.category}</span>
            <div class="qv-rating">
              <span class="qv-star">★</span>
              <strong>${prod.rating}</strong>
              <span class="qv-review-count">(${prod.reviewCount} reviews)</span>
            </div>
          </div>

          <h2 class="qv-title">${prod.name}</h2>

          <div class="qv-price-block">
            <span class="qv-price-discounted">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
            ${prod.originalPrice > prod.discountedPrice ? `
              <span class="qv-price-original">${VeloraProducts.formatPrice(prod.originalPrice)}</span>
              <span class="badge badge-sale">SAVE ${prod.discountPercent}%</span>
            ` : ""}
          </div>

          <p class="qv-description">${prod.description}</p>

          <div class="qv-fabric-badge">
            <span class="fabric-icon">❖</span>
            <span>Composition: <strong>${prod.fabric || 'Ethical Luxury Textile'}</strong></span>
          </div>

          <!-- Color Swatches -->
          ${prod.colors && prod.colors.length > 0 ? `
            <div class="qv-option-group">
              <label class="qv-option-label">Color: <strong id="qvSelectedColorText">${this.selectedColor}</strong></label>
              <div class="qv-color-swatches">
                ${prod.colors.map(col => `
                  <button 
                    type="button" 
                    class="qv-color-btn ${col.name === this.selectedColor ? 'is-active' : ''}" 
                    style="--swatch-hex: ${col.hex}" 
                    title="${col.name}" 
                    onclick="VeloraAudio.playClick(); VeloraQuickView.setColor('${col.name}', this)"
                  ></button>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Size Selector -->
          ${prod.sizes && prod.sizes.length > 0 ? `
            <div class="qv-option-group">
              <div class="qv-label-row">
                <label class="qv-option-label">Select Size: <strong id="qvSelectedSizeText">${this.selectedSize}</strong></label>
                <button type="button" class="qv-size-guide-btn" onclick="VeloraToast.show({ title: 'Studio Fit Guide', message: 'Architectural true-to-size cut. Relaxed drape.', type: 'info' })">Measurement Chart</button>
              </div>
              <div class="qv-size-options">
                ${prod.sizes.map(sz => `
                  <button 
                    type="button" 
                    class="qv-size-btn ${sz === this.selectedSize ? 'is-active' : ''}" 
                    onclick="VeloraAudio.playClick(); VeloraQuickView.setSize('${sz}', this)"
                  >${sz}</button>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Quantity Stepper & Add to Bag -->
          <div class="qv-action-row">
            <div class="qv-qty-stepper">
              <button type="button" class="qty-btn" onclick="VeloraQuickView.stepQty(-1)">−</button>
              <span id="qvQtyDisplay" class="qty-val">${this.selectedQty}</span>
              <button type="button" class="qty-btn" onclick="VeloraQuickView.stepQty(1)">+</button>
            </div>

            <button 
              type="button" 
              class="btn btn-primary qv-add-to-bag-btn magnetic-btn" 
              onclick="VeloraAudio.playSuccess(); VeloraQuickView.submitAddToCart()"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Add to Shopping Bag
            </button>

            <button 
              type="button" 
              class="qv-wishlist-action-btn ${VeloraWishlist.has(prod.id) ? 'is-active' : ''}" 
              title="Save to Wishlist" 
              onclick="VeloraAudio.playClick(); VeloraWishlist.toggle('${prod.id}', this)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <!-- Product Highlights & Guarantees -->
          <div class="qv-guarantees-strip">
            <div class="qv-guarantee-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Complimentary Priority Air Delivery</span>
            </div>
            <div class="qv-guarantee-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Authenticity Guaranteed • Atelier Archive 2026</span>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("is-open");
    if (overlay) overlay.classList.add("is-visible");
    document.body.classList.add("modal-open");
  },

  setColor(colorName, btn) {
    this.selectedColor = colorName;
    const label = document.getElementById("qvSelectedColorText");
    if (label) label.textContent = colorName;

    btn.parentElement.querySelectorAll(".qv-color-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  },

  setSize(sizeName, btn) {
    this.selectedSize = sizeName;
    const label = document.getElementById("qvSelectedSizeText");
    if (label) label.textContent = sizeName;

    btn.parentElement.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  },

  stepQty(delta) {
    VeloraAudio.playClick();
    this.selectedQty = Math.max(1, Math.min(10, this.selectedQty + delta));
    const display = document.getElementById("qvQtyDisplay");
    if (display) display.textContent = this.selectedQty;
  },

  submitAddToCart() {
    if (!this.currentProductId) return;
    VeloraCart.addItem(this.currentProductId, this.selectedSize, this.selectedColor, this.selectedQty);
    this.close();
  },

  close() {
    const modal = document.getElementById("quickViewModal");
    const overlay = document.getElementById("quickViewOverlay");
    if (modal) modal.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
    this.currentProductId = null;
  },

  bindEvents() {
    const closeBtn = document.getElementById("closeQuickViewBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const overlay = document.getElementById("quickViewOverlay");
    if (overlay) overlay.addEventListener("click", () => this.close());
  }
};

/**
 * Live Real-Time Search Overlay
 */
const VeloraSearch = {
  isOpen: false,

  init() {
    this.bindEvents();
  },

  open() {
    VeloraAudio.playClick();
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("siteSearchInput");
    if (!overlay) return;

    overlay.classList.add("is-visible");
    this.isOpen = true;
    document.body.classList.add("modal-open");

    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 150);
      this.renderResults("");
    }
  },

  close() {
    const overlay = document.getElementById("searchOverlay");
    if (overlay) overlay.classList.remove("is-visible");
    this.isOpen = false;
    document.body.classList.remove("modal-open");
  },

  renderResults(query) {
    const resultsContainer = document.getElementById("searchResultsGrid");
    const countContainer = document.getElementById("searchCountText");
    if (!resultsContainer) return;

    if (!query || !query.trim()) {
      resultsContainer.innerHTML = `
        <div class="search-initial-state">
          <p class="search-hint">Type to search collections, garments, silhouettes, or fabrics...</p>
          <div class="search-quick-tags">
            <span class="quick-tag-label">Curated Inquiries:</span>
            <button type="button" class="search-tag-chip" onclick="VeloraSearch.setSearchQuery('Hoodie')">Hoodie</button>
            <button type="button" class="search-tag-chip" onclick="VeloraSearch.setSearchQuery('Jacket')">Jacket</button>
            <button type="button" class="search-tag-chip" onclick="VeloraSearch.setSearchQuery('Silk')">Mulberry Silk</button>
            <button type="button" class="search-tag-chip" onclick="VeloraSearch.setSearchQuery('Denim')">Japanese Selvedge</button>
            <button type="button" class="search-tag-chip" onclick="VeloraSearch.setSearchQuery('Sneakers')">Italian Calfskin</button>
          </div>
        </div>
      `;
      if (countContainer) countContainer.textContent = "";
      return;
    }

    const matches = VeloraProducts.search(query);

    if (countContainer) {
      countContainer.textContent = `${matches.length} creation${matches.length === 1 ? '' : 's'} matching "${query}"`;
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>No bespoke garments match "${query}".</p>
          <span class="search-subhint">Try refining your search by silhouette or textile (e.g. "Jacket", "Cotton", or "Streetwear").</span>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(prod => `
      <div class="search-result-item" onclick="VeloraSearch.close(); VeloraQuickView.open('${prod.id}')">
        <img src="${prod.image}" alt="${prod.name}" class="search-item-thumb" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
        <div class="search-item-info">
          <span class="search-item-cat">${prod.category} • ${prod.sku}</span>
          <h4 class="search-item-title">${prod.name}</h4>
          <span class="search-item-price">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
        </div>
        <button type="button" class="search-item-add-btn" onclick="event.stopPropagation(); VeloraAudio.playSuccess(); VeloraCart.addItem('${prod.id}')" title="Quick Add">
          + Add
        </button>
      </div>
    `).join("");
  },

  setSearchQuery(text) {
    VeloraAudio.playClick();
    const input = document.getElementById("siteSearchInput");
    if (input) {
      input.value = text;
      input.focus();
      this.renderResults(text);
    }
  },

  bindEvents() {
    document.querySelectorAll(".open-search-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    const closeBtn = document.getElementById("closeSearchBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const input = document.getElementById("siteSearchInput");
    if (input) {
      input.addEventListener("input", (e) => {
        this.renderResults(e.target.value);
      });
    }

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (this.isOpen) this.close();
        else this.open();
      }
      if (e.key === "Escape") {
        if (this.isOpen) this.close();
        VeloraQuickView.close();
        VeloraCart.close();
        VeloraWishlist.close();
        VeloraCheckout.close();
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
    this.bindEvents();
  },

  open() {
    const totals = VeloraCart.getTotals();
    if (totals.totalItems === 0) {
      VeloraToast.show({ title: "Bag is Empty", message: "Please select pieces to begin checkout.", type: "warning" });
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
          <div class="checkout-summary-item">
            <img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null; this.src='assets/images/fallback.svg'" />
            <div class="checkout-item-details">
              <h5>${prod.name}</h5>
              <span>Size: ${item.size} | Qty: ${item.quantity}</span>
            </div>
            <span class="checkout-item-price">${VeloraProducts.formatPrice(prod.discountedPrice * item.quantity)}</span>
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
        <div class="order-success-screen">
          <div class="order-success-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="order-success-tag">AUTHORIZATION CONFIRMED</span>
          <h2 class="order-success-title">Atelier Order Sealed</h2>
          <p class="order-success-msg">Thank you for curating with VELORA. Your order <strong>#${orderId}</strong> for <strong>${VeloraProducts.formatPrice(totals.finalTotal)}</strong> is scheduled for artisan inspection and tissue wrap packaging.</p>

          <div class="order-timeline-card">
            <div class="timeline-step is-active">
              <span class="step-dot"></span>
              <div class="step-info"><strong>Order Registered</strong><small>Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></div>
            </div>
            <div class="timeline-step">
              <span class="step-dot"></span>
              <div class="step-info"><strong>Studio Inspection & Garment Curation</strong><small>Next Business Morning</small></div>
            </div>
            <div class="timeline-step">
              <span class="step-dot"></span>
              <div class="step-info"><strong>White-Glove Express Handover</strong><small>Trackable Global Transit</small></div>
            </div>
          </div>

          <button type="button" class="btn btn-primary" onclick="VeloraCheckout.finishOrder()">Return to Boutique</button>
        </div>
      `;
    }

    VeloraCart.clear();
  },

  finishOrder() {
    this.close();
    location.reload();
  },

  bindEvents() {
    const closeBtn = document.getElementById("closeCheckoutBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const overlay = document.getElementById("checkoutOverlay");
    if (overlay) overlay.addEventListener("click", () => this.close());

    const form = document.getElementById("checkoutOrderForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.completeOrder();
      });
    }
  }
};

/**
 * General Storefront Interactions
 */
const VeloraStoreUI = {
  init() {
    this.bindHeaderScroll();
    this.bindMobileNav();
    this.bindNewsletter();
    this.bindPromotionalActions();
    this.bindCategoryCardClicks();
    this.bindSmoothAnchors();
  },

  bindHeaderScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    }, { passive: true });
  },

  bindMobileNav() {
    const toggleBtn = document.getElementById("mobileNavToggle");
    const drawer = document.getElementById("mobileNavDrawer");
    const overlay = document.getElementById("mobileNavOverlay");
    const closeBtn = document.getElementById("closeMobileNavBtn");

    if (!toggleBtn || !drawer) return;

    const openMenu = () => {
      VeloraAudio.playClick();
      drawer.classList.add("is-open");
      if (overlay) overlay.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    };

    const closeMenu = () => {
      drawer.classList.remove("is-open");
      if (overlay) overlay.classList.remove("is-visible");
      document.body.classList.remove("drawer-open");
    };

    toggleBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    drawer.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  },

  bindNewsletter() {
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const successMsg = document.getElementById("newsletterSuccessMsg");

    if (!form || !emailInput) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        VeloraToast.show({
          title: "Invalid Email Address",
          message: "Please enter a valid format to receive private drop invitations.",
          type: "warning"
        });
        emailInput.focus();
        return;
      }

      form.style.display = "none";
      if (successMsg) {
        successMsg.style.display = "block";
      }

      VeloraAudio.playSuccess();
      VeloraToast.show({
        title: "Welcome to the Vanguard",
        message: "Your 15% private invitation code: VELORA15",
        type: "success"
      });
    });
  },

  bindPromotionalActions() {
    document.querySelectorAll(".copy-promo-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        VeloraAudio.playClick();
        const code = btn.getAttribute("data-code");
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            VeloraToast.show({
              title: "Code Copied to Clipboard",
              message: `Code ${code} ready for bag redemption.`,
              type: "success"
            });
          }).catch(() => {
            VeloraCart.applyPromo(code);
          });
        }
      });
    });
  },

  bindCategoryCardClicks() {
    // 1. Explore Line buttons on Bento cards
    document.querySelectorAll(".category-card-action").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        VeloraAudio.playClick();
        const cat = btn.getAttribute("data-target-category");
        if (cat) {
          VeloraProductsService.setCategory(cat);
          const trendingSection = document.getElementById("trending");
          if (trendingSection) {
            trendingSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // 2. Entire Bento Category Cards
    document.querySelectorAll("[data-bento-category]").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".bento-btn")) return;
        VeloraAudio.playClick();
        const cat = card.getAttribute("data-bento-category");
        if (cat) {
          VeloraProductsService.setCategory(cat);
          const trendingSection = document.getElementById("trending");
          if (trendingSection) {
            trendingSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // 3. Header & Mobile Navigation links with category filtering
    document.querySelectorAll("[data-filter-link]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        VeloraAudio.playClick();
        const cat = link.getAttribute("data-filter-link");
        if (cat) {
          VeloraProductsService.setCategory(cat);
          const trendingSection = document.getElementById("trending");
          if (trendingSection) {
            trendingSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  },

  bindSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }
};
