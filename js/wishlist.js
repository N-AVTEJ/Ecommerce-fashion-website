/**
 * VELORA — Wishlist Engine
 * LocalStorage-backed Curated Favorites
 */

const VeloraWishlist = {
  STORAGE_KEY: "velora_wishlist_items",
  items: [],

  init() {
    this.load();
    this.render();
    this.bindEvents();
    this.updateAllCardButtons();
  },

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to load wishlist", e);
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Failed to save wishlist", e);
    }
    this.render();
    this.updateAllCardButtons();
  },

  has(productId) {
    return this.items.includes(productId);
  },

  toggle(productId, targetBtn = null) {
    const product = VeloraProducts.getById(productId);
    if (!product) return false;

    const index = this.items.indexOf(productId);
    let added = false;

    if (index > -1) {
      this.items.splice(index, 1);
      added = false;
      if (window.VeloraToast) {
        VeloraToast.show({
          title: "Removed from Wishlist",
          message: `${product.name} removed from your saved pieces.`,
          type: "info"
        });
      }
    } else {
      this.items.push(productId);
      added = true;
      if (window.VeloraToast) {
        VeloraToast.show({
          title: "Saved to Wishlist",
          message: `${product.name} added to your private collection.`,
          type: "success",
          actionText: "View Wishlist",
          action: () => this.open()
        });
      }
    }

    this.save();
    this.animateBadge();

    // Trigger visual button pulse
    if (targetBtn) {
      targetBtn.classList.toggle("is-active", added);
      targetBtn.classList.remove("heart-pulse");
      void targetBtn.offsetWidth;
      targetBtn.classList.add("heart-pulse");
    }

    return added;
  },

  remove(productId) {
    const idx = this.items.indexOf(productId);
    if (idx > -1) {
      this.items.splice(idx, 1);
      this.save();
    }
  },

  moveToCart(productId) {
    const success = VeloraCart.addItem(productId);
    if (success) {
      this.remove(productId);
    }
  },

  moveAllToCart() {
    if (this.items.length === 0) return;
    const count = this.items.length;
    [...this.items].forEach(id => {
      VeloraCart.addItem(id);
    });
    this.items = [];
    this.save();
    this.close();
    VeloraCart.open();

    if (window.VeloraToast) {
      VeloraToast.show({
        title: "All Moved to Bag",
        message: `${count} pieces transferred to your shopping bag.`,
        type: "success"
      });
    }
  },

  animateBadge() {
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach(b => {
      b.classList.remove("bounce");
      void b.offsetWidth;
      b.classList.add("bounce");
    });
  },

  updateAllCardButtons() {
    document.querySelectorAll(".wishlist-toggle-btn, .card-wishlist-btn").forEach(btn => {
      const id = btn.getAttribute("data-id") || btn.getAttribute("data-wishlist-id");
      if (id) {
        const isFavorited = this.has(id);
        btn.classList.toggle("is-active", isFavorited);
        btn.setAttribute("aria-label", isFavorited ? "Remove from wishlist" : "Add to wishlist");
        const svg = btn.querySelector("svg");
        if (svg) {
          svg.setAttribute("fill", isFavorited ? "#E11D48" : "none");
          svg.style.color = isFavorited ? "#E11D48" : "inherit";
        }
      }
    });
  },

  open() {
    const drawer = document.getElementById("wishlistDrawer");
    const overlay = document.getElementById("wishlistOverlay");
    if (drawer && overlay) {
      drawer.classList.add("is-open");
      overlay.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    }
  },

  close() {
    const drawer = document.getElementById("wishlistDrawer");
    const overlay = document.getElementById("wishlistOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      document.body.classList.remove("drawer-open");
    }
  },

  render() {
    // Update badge counts
    const count = this.items.length;
    document.querySelectorAll(".wishlist-count-badge").forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "inline-flex" : "none";
    });

    const listEl = document.getElementById("wishlistItemsList");
    const emptyEl = document.getElementById("wishlistEmptyState");
    const footerEl = document.getElementById("wishlistFooter");

    if (!listEl) return;

    if (count === 0) {
      if (emptyEl) emptyEl.style.display = "flex";
      listEl.style.display = "none";
      if (footerEl) footerEl.style.display = "none";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    listEl.style.display = "block";
    if (footerEl) footerEl.style.display = "block";

    listEl.innerHTML = this.items.map(id => {
      const prod = VeloraProducts.getById(id);
      if (!prod) return "";

      return `
        <div class="wishlist-item" data-id="${prod.id}">
          <div class="wishlist-item-img">
            <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/fallback.svg'">
          </div>
          <div class="wishlist-item-details">
            <div class="wishlist-item-header">
              <span class="wishlist-item-cat">${prod.category}</span>
              <button class="wishlist-item-remove" onclick="VeloraWishlist.remove('${prod.id}')" title="Remove piece">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <h4 class="wishlist-item-title">${prod.name}</h4>
            <div class="wishlist-item-price-wrap">
              <span class="wishlist-item-price">${VeloraProducts.formatPrice(prod.discountedPrice)}</span>
              ${prod.originalPrice > prod.discountedPrice ? `<span class="wishlist-item-orig">${VeloraProducts.formatPrice(prod.originalPrice)}</span>` : ""}
            </div>
            <button class="wishlist-add-to-cart-btn" onclick="VeloraWishlist.moveToCart('${prod.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Move to Bag
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  bindEvents() {
    document.querySelectorAll(".open-wishlist-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    const closeBtn = document.getElementById("closeWishlistBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());

    const overlay = document.getElementById("wishlistOverlay");
    if (overlay) overlay.addEventListener("click", () => this.close());

    const moveAllBtn = document.getElementById("wishlistMoveAllBtn");
    if (moveAllBtn) moveAllBtn.addEventListener("click", () => this.moveAllToCart());
  }
};
