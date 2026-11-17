const fs = require('fs');
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

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace menProductsGrid content
indexHtml = indexHtml.replace(
  /<div id="menProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="menProductsGrid" class="products-grid stagger-grid">\n${menHtml}\n      </div>`
);

// Replace womenProductsGrid content
indexHtml = indexHtml.replace(
  /<div id="womenProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="womenProductsGrid" class="products-grid stagger-grid">\n${womenHtml}\n      </div>`
);

// Replace trendingProductsGrid content
indexHtml = indexHtml.replace(
  /<div id="trendingProductsGrid" class="products-grid stagger-grid">[\s\S]*?<\/div>/,
  `<div id="trendingProductsGrid" class="products-grid stagger-grid">\n${trendingHtml}\n      </div>`
);

// Replace newArrivalsTrack content
indexHtml = indexHtml.replace(
  /<div id="newArrivalsTrack" class="new-arrivals-track">[\s\S]*?<\/div>/,
  `<div id="newArrivalsTrack" class="new-arrivals-track">\n${newHtml}\n      </div>`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully injected static cards into index.html!');
