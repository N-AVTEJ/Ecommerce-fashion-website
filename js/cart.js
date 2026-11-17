/**
 * VELORA — Cart Engine
 * LocalStorage-backed Shopping Bag with Real-time Calculations
 */

const VeloraCart = {
  STORAGE_KEY: "velora_cart_items",
  PROMO_KEY: "velora_active_promo",
  FREE_SHIPPING_THRESHOLD: 1999,
  DEFAULT_SHIPPING_FEE: 199,

  // Active Promo Codes
  PROMOS: {
    "VELORA2026": { discountPercent: 15, label: "VELORA2026 (15% OFF)" },
    "VELORA30": { discountPercent: 30, label: "VELORA30 (30% OFF)" },
    "TRIO2026": { discountPercent: 20, label: "TRIO2026 (20% OFF)" },
    "FREESHIP": { freeShipping: true, label: "FREESHIP (Free Express Delivery)" }
  },

  items: [],
  activePromo: null,

  init() {
    this.load();
    this.render();
    this.bindEvents();
  },

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.items = saved ? JSON.parse(saved) : [];
      const savedPromo = localStorage.getItem(this.PROMO_KEY);
      if (savedPromo && this.PROMOS[savedPromo]) {
        this.activePromo = savedPromo;
      }
    } catch (e) {
      console.warn("Failed to load cart from storage", e);
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
      if (this.activePromo) {
        localStorage.setItem(this.PROMO_KEY, this.activePromo);
      } else {
        localStorage.removeItem(this.PROMO_KEY);
      }
    } catch (e) {
      console.warn("Failed to persist cart", e);
    }
    this.render();
  },

  addItem(productId, size = "M", color = null, quantity = 1) {
    const product = VeloraProducts.getById(productId);
    if (!product) return false;

    // Selected color fallback
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");
    const selectedSize = size || (product.sizes && product.sizes[0] ? product.sizes[0] : "One Size");

    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.size === selectedSize && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += Number(quantity);
    } else {
      this.items.push({
        id: productId,
        size: selectedSize,
        color: selectedColor,
        quantity: Number(quantity),
        addedAt: Date.now()
      });
    }

    this.save();
    this.animateBadge();
    
    if (window.VeloraToast) {
      VeloraToast.show({
        title: "Added to Shopping Bag",
        message: `${product.name} (${selectedSize}) is ready.`,
        type: "success",
        actionText: "View Bag",
        action: () => this.open()
      });
    }

    return true;
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  },

  removeItem(productId, size, color) {
    const initialLen = this.items.length;
    this.items = this.items.filter(
      item => !(item.id === productId && item.size === size && item.color === color)
    );
    if (this.items.length !== initialLen) {
      this.save();
      if (window.VeloraToast) {
        VeloraToast.show({
          title: "Item Removed",
          message: "Selected piece was removed from your bag.",
          type: "info"
        });
      }
    }
  },

  updateQuantity(productId, size, color, delta) {
    const item = this.items.find(
      i => i.id === productId && i.size === size && i.color === color
    );
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId, size, color);
    } else {
      this.save();
    }
  },

  clear() {
    this.items = [];
    this.activePromo = null;
    this.save();
  },

  applyPromo(code) {
    const cleaned = (code || "").trim().toUpperCase();
    if (!cleaned) {
      return { success: false, message: "Please enter a valid promotion code." };
    }
    if (this.PROMOS[cleaned]) {
      this.activePromo = cleaned;
      this.save();
      return { 
        success: true, 
        message: `Promo code ${cleaned} applied successfully!` 
      };
    } else {
      return { 
        success: false, 
        message: "Invalid promotion code. Try VELORA2026 or VELORA30." 
      };
    }
  },

  removePromo() {
    this.activePromo = null;
    this.save();
  },

  getTotals() {
    let subtotal = 0;
    let totalItems = 0;

    this.items.forEach(item => {
      const product = VeloraProducts.getById(item.id);
      if (product) {
        subtotal += product.discountedPrice * item.quantity;
        totalItems += item.quantity;
      }
    });

    let discount = 0;
    let isFreeShipping = subtotal >= this.FREE_SHIPPING_THRESHOLD;

    if (this.activePromo && this.PROMOS[this.activePromo]) {
      const promo = this.PROMOS[this.activePromo];
      if (promo.discountPercent) {
        discount = Math.round((subtotal * promo.discountPercent) / 100);
      }
      if (promo.freeShipping) {
        isFreeShipping = true;
      }
    }

    const shipping = subtotal === 0 || isFreeShipping ? 0 : this.DEFAULT_SHIPPING_FEE;
    const finalTotal = Math.max(0, subtotal - discount + shipping);

    const progressToFreeShipping = Math.min(100, Math.round((subtotal / this.FREE_SHIPPING_THRESHOLD) * 100));
    const amountNeededForFreeShipping = Math.max(0, this.FREE_SHIPPING_THRESHOLD - subtotal);

    return {
      subtotal,
      totalItems,
      discount,
      shipping,
      finalTotal,
      isFreeShipping,
      progressToFreeShipping,
      amountNeededForFreeShipping,
      activePromoInfo: this.activePromo ? this.PROMOS[this.activePromo] : null
    };
  },

  open() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.add("is-open");
      overlay.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    }
  },

  close() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      document.body.classList.remove("drawer-open");
    }
  },

  animateBadge() {
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.classList.remove("bounce");
      void b.offsetWidth; // force reflow
      b.classList.add("bounce");
    });
  },

  render() {
    const totals = this.getTotals();

    // Update all cart count badges in header and mobile nav
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = totals.totalItems;
      b.style.display = totals.totalItems > 0 ? "inline-flex" : "none";
    });

    const itemsContainer = document.getElementById("cartItemsList");
    const emptyState = document.getElementById("cartEmptyState");
    const footerSummary = document.getElementById("cartFooterSummary");
    const shippingProgress = document.getElementById("cartShippingProgress");

    if (!itemsContainer) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = "flex";
      itemsContainer.style.display = "none";
      if (footerSummary) footerSummary.style.display = "none";
      if (shippingProgress) shippingProgress.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    itemsContainer.style.display = "block";
    if (footerSummary) footerSummary.style.display = "block";
    if (shippingProgress) shippingProgress.style.display = "block";

    // Shipping progress bar update
    const progressBar = document.getElementById("shippingProgressBar");
    const progressText = document.getElementById("shippingProgressText");
    if (progressBar && progressText) {
      progressBar.style.width = `${totals.progressToFreeShipping}%`;
      if (totals.isFreeShipping) {
        progressText.innerHTML = `<span>✨ Congratulations!</span> You unlocked <strong>FREE Express Shipping</strong>.`;
      } else {
        progressText.innerHTML = `Add <strong>${VeloraProducts.formatPrice(totals.amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong>`;
      }
    }

    // Render items list
    itemsContainer.innerHTML = this.items.map(item => {
      const prod = VeloraProducts.getById(item.id);
      if (!prod) return "";
      const itemTotal = prod.discountedPrice * item.quantity;

      return `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
          <div class="cart-item-image">
            <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/fallback.svg'">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-header">
              <h4 class="cart-item-title">${prod.name}</h4>
              <button class="cart-item-remove-btn" title="Remove piece" onclick="VeloraCart.removeItem('${item.id}', '${item.size}', '${item.color}')" aria-label="Remove item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="cart-item-meta">
              <span>Size: <strong>${item.size}</strong></span>
              <span class="meta-dot">•</span>
              <span>Color: <strong>${item.color}</strong></span>
            </div>
            <div class="cart-item-bottom">
              <div class="cart-qty-stepper">
                <button type="button" class="qty-btn minus" onclick="VeloraCart.updateQuantity('${item.id}', '${item.size}', '${item.color}', -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-val">${item.quantity}</span>
                <button type="button" class="qty-btn plus" onclick="VeloraCart.updateQuantity('${item.id}', '${item.size}', '${item.color}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-price-block">
                <span class="cart-item-price">${VeloraProducts.formatPrice(itemTotal)}</span>
                ${prod.discountPercent > 0 ? `<span class="cart-item-unit">(${VeloraProducts.formatPrice(prod.discountedPrice)} ea)</span>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Update summary values
    const subtotalEl = document.getElementById("cartSubtotalVal");
    const discountRow = document.getElementById("cartDiscountRow");
    const discountEl = document.getElementById("cartDiscountVal");
    const shippingEl = document.getElementById("cartShippingVal");
    const grandTotalEl = document.getElementById("cartGrandTotalVal");
    const promoBadge = document.getElementById("cartActivePromoTag");

    if (subtotalEl) subtotalEl.textContent = VeloraProducts.formatPrice(totals.subtotal);

    if (discountRow && discountEl) {
      if (totals.discount > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `- ${VeloraProducts.formatPrice(totals.discount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (shippingEl) {
      shippingEl.innerHTML = totals.shipping === 0 
        ? `<span class="free-shipping-tag">FREE</span>` 
        : VeloraProducts.formatPrice(totals.shipping);
    }

    if (grandTotalEl) grandTotalEl.textContent = VeloraProducts.formatPrice(totals.finalTotal);

    if (promoBadge) {
      if (this.activePromo) {
        promoBadge.style.display = "inline-flex";
        promoBadge.innerHTML = `
          <span>🏷️ ${this.activePromo}</span>
          <button type="button" onclick="VeloraCart.removePromo()" title="Remove code">✕</button>
        `;
      } else {
        promoBadge.style.display = "none";
      }
    }
  },

  bindEvents() {
    // Open Cart buttons
    document.querySelectorAll(".open-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close buttons
    const closeBtn = document.getElementById("closeCartBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.addEventListener("click", () => this.close());

    // Promo code form
    const promoForm = document.getElementById("cartPromoForm");
    if (promoForm) {
      promoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("cartPromoInput");
        if (input) {
          const res = this.applyPromo(input.value);
          if (window.VeloraToast) {
            VeloraToast.show({
              title: res.success ? "Promo Applied" : "Promo Failed",
              message: res.message,
              type: res.success ? "success" : "warning"
            });
          }
          if (res.success) input.value = "";
        }
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (this.items.length === 0) return;
        this.close();
        if (window.VeloraCheckout) {
          VeloraCheckout.open();
        } else {
          alert("Proceeding to luxury checkout experience.");
        }
      });
    }
  }
};

// Global Attachments
if (typeof window !== "undefined") {
  window.VeloraCart = VeloraCart;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VeloraCart };
}
