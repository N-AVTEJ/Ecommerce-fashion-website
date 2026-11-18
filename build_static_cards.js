const fs = require('fs');
global.window = global;
global.window.VeloraWishlist = { has: () => false };
const { VELORA_PRODUCTS, VeloraProducts } = require('./js/products.js');
const { VeloraStoreUI } = require('./js/main.js');

const menProds = VELORA_PRODUCTS.filter(p => p.department === 'men');
const womenProds = VELORA_PRODUCTS.filter(p => p.department === 'women');
const trendingProds = VeloraProducts.getTrending();
const newProds = VeloraProducts.getNewArrivals();

console.log('Men prods count:', menProds.length);
console.log('Women prods count:', womenProds.length);
console.log('Trending prods count:', trendingProds.length);
console.log('New arrivals count:', newProds.length);

const menHtml = menProds.map((p, idx) => VeloraStoreUI.generateProductCardHtml(p, idx)).join('\n');
const womenHtml = womenProds.map((p, idx) => VeloraStoreUI.generateProductCardHtml(p, idx)).join('\n');
const trendingHtml = trendingProds.map((p, idx) => VeloraStoreUI.generateProductCardHtml(p, idx)).join('\n');
const newHtml = newProds.map(p => `  <div class="arrivals-card-item">\n${VeloraStoreUI.generateProductCardHtml(p, 0)}\n  </div>`).join('\n');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  /<div id="menProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="menProductsGrid" class="products-grid stagger-grid">\n${menHtml}\n      </div>`
);

indexHtml = indexHtml.replace(
  /<div id="womenProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="womenProductsGrid" class="products-grid stagger-grid">\n${womenHtml}\n      </div>`
);

indexHtml = indexHtml.replace(
  /<div id="trendingProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="trendingProductsGrid" class="products-grid stagger-grid">\n${trendingHtml}\n      </div>`
);

indexHtml = indexHtml.replace(
  /<div id="newArrivalsTrack" class="new-arrivals-track">[\s\S]*?<\/div>/,
  `<div id="newArrivalsTrack" class="new-arrivals-track">\n${newHtml}\n      </div>`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully updated index.html!');

// 2. Update men.html
if (fs.existsSync('men.html')) {
  let menPage = fs.readFileSync('men.html', 'utf8');
  menPage = menPage.replace(
    /<div id="menProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
    `<div id="menProductsGrid" class="products-grid stagger-grid">\n${menHtml}\n      </div>`
  );
  fs.writeFileSync('men.html', menPage, 'utf8');
  console.log('Successfully updated men.html!');
}

// 3. Update women.html
if (fs.existsSync('women.html')) {
  let womenPage = fs.readFileSync('women.html', 'utf8');
  womenPage = womenPage.replace(
    /<div id="womenProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
    `<div id="womenProductsGrid" class="products-grid stagger-grid">\n${womenHtml}\n      </div>`
  );
  fs.writeFileSync('women.html', womenPage, 'utf8');
  console.log('Successfully updated women.html!');
}
