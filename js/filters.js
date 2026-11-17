/**
 * VELORA — Department & Category Filtering Architecture
 * Pure Vanilla JavaScript Module
 */

const VeloraFilters = {
  state: {
    activeDepartment: "all",     // 'all' | 'men' | 'women'
    activeMenCategory: "all",    // category id from VeloraProducts.MEN_CATEGORIES
    activeWomenCategory: "all",  // category id from VeloraProducts.WOMEN_CATEGORIES
    activeTrendingTab: "all",    // 'all' | 'men' | 'women'
    activeSort: "featured",
    searchQuery: ""
  },

  init() {
    this.bindDepartmentSwitchers();
    this.bindCategoryTabs();
    this.bindTrendingTabs();
    this.bindSortControls();
  },

  // Set the overarching active department
  setDepartment(dept) {
    if (!dept) return;
    this.state.activeDepartment = dept.toLowerCase();

    // Update navigation active states
    document.querySelectorAll("[data-nav-dept]").forEach(el => {
      el.classList.toggle("is-active", el.getAttribute("data-nav-dept") === this.state.activeDepartment);
    });

    // Notify listeners / re-render
    if (window.VeloraStoreUI && typeof window.VeloraStoreUI.onDepartmentChange === "function") {
      window.VeloraStoreUI.onDepartmentChange(this.state.activeDepartment);
    }
  },

  setMenCategory(cat) {
    this.state.activeMenCategory = cat;
    document.querySelectorAll(".men-cat-pill").forEach(pill => {
      pill.classList.toggle("is-active", pill.getAttribute("data-cat") === cat);
    });
    if (window.VeloraStoreUI && typeof window.VeloraStoreUI.renderMenGrid === "function") {
      window.VeloraStoreUI.renderMenGrid();
    }
  },

  setWomenCategory(cat) {
    this.state.activeWomenCategory = cat;
    document.querySelectorAll(".women-cat-pill").forEach(pill => {
      pill.classList.toggle("is-active", pill.getAttribute("data-cat") === cat);
    });
    if (window.VeloraStoreUI && typeof window.VeloraStoreUI.renderWomenGrid === "function") {
      window.VeloraStoreUI.renderWomenGrid();
    }
  },

  setTrendingTab(tab) {
    this.state.activeTrendingTab = tab.toLowerCase();
    document.querySelectorAll(".trending-filter-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-trending-dept") === this.state.activeTrendingTab);
    });
    if (window.VeloraStoreUI && typeof window.VeloraStoreUI.renderTrendingGrid === "function") {
      window.VeloraStoreUI.renderTrendingGrid();
    }
  },

  setSort(sortValue) {
    this.state.activeSort = sortValue;
    if (window.VeloraStoreUI) {
      if (typeof window.VeloraStoreUI.renderMenGrid === "function") window.VeloraStoreUI.renderMenGrid();
      if (typeof window.VeloraStoreUI.renderWomenGrid === "function") window.VeloraStoreUI.renderWomenGrid();
      if (typeof window.VeloraStoreUI.renderTrendingGrid === "function") window.VeloraStoreUI.renderTrendingGrid();
    }
  },

  // Query filtered items
  getFilteredMen() {
    let prods = VeloraProducts.getByCategory(this.state.activeMenCategory, "men");
    return VeloraProducts.sort(prods, this.state.activeSort);
  },

  getFilteredWomen() {
    let prods = VeloraProducts.getByCategory(this.state.activeWomenCategory, "women");
    return VeloraProducts.sort(prods, this.state.activeSort);
  },

  getFilteredTrending() {
    let prods = VeloraProducts.getTrending(this.state.activeTrendingTab);
    return VeloraProducts.sort(prods, this.state.activeSort);
  },

  // Event Listeners Binding
  bindDepartmentSwitchers() {
    document.querySelectorAll("[data-nav-dept]").forEach(el => {
      el.addEventListener("click", (e) => {
        const dept = el.getAttribute("data-nav-dept");
        if (dept) {
          if (window.VeloraAudio) VeloraAudio.playClick();
          this.setDepartment(dept);
        }
      });
    });
  },

  bindCategoryTabs() {
    // Men's Category Pills
    document.querySelectorAll(".men-cat-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        if (window.VeloraAudio) VeloraAudio.playClick();
        const cat = pill.getAttribute("data-cat");
        this.setMenCategory(cat);
      });
    });

    // Women's Category Pills
    document.querySelectorAll(".women-cat-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        if (window.VeloraAudio) VeloraAudio.playClick();
        const cat = pill.getAttribute("data-cat");
        this.setWomenCategory(cat);
      });
    });
  },

  bindTrendingTabs() {
    document.querySelectorAll(".trending-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (window.VeloraAudio) VeloraAudio.playClick();
        const tab = btn.getAttribute("data-trending-dept");
        this.setTrendingTab(tab);
      });
    });
  },

  bindSortControls() {
    const sortSelect = document.getElementById("trendingSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        if (window.VeloraAudio) VeloraAudio.playClick();
        this.setSort(e.target.value);
      });
    }
  }
};

// Global Attachments
if (typeof window !== "undefined") {
  window.VeloraFilters = VeloraFilters;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VeloraFilters };
}
