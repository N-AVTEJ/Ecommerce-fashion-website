/**
 * VELORA — Haute Couture & High-Tech Fashion Catalog
 * Pure Vanilla JavaScript Data Layer
 */

const VELORA_PRODUCTS = [
  // --- STREETWEAR & HYBRID ---
  {
    id: "prod-01",
    sku: "VEL-FW26-001",
    name: "Oversized Urban Hoodie",
    category: "Streetwear",
    gender: "Unisex",
    originalPrice: 2499,
    discountedPrice: 1749,
    discountPercent: 30,
    badge: "SALE -30%",
    code: "NO. 01 / TERRY",
    fabric: "460 GSM Heavy French Terry",
    rating: 4.9,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=85",
    description: "Architectural drop-shoulder silhouette crafted from 460 GSM heavyweight French terry cotton. Engineered with double-layered hood, hidden security device pocket, and tonal high-density silicone typography at the nape.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Midnight Charcoal", hex: "#1A1721" },
      { name: "Electric Violet", hex: "#7C3AED" },
      { name: "Bone White", hex: "#EAE7DF" }
    ],
    tags: ["Heavyweight Cotton", "Drop Shoulder", "Oversized", "Men", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-02",
    sku: "VEL-FW26-002",
    name: "Minimal Streetwear Jacket",
    category: "Jackets",
    gender: "Unisex",
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    badge: "ARCHIVE BESTSELLER",
    code: "NO. 02 / SHELL",
    fabric: "Matte Technical Poly-Twill",
    rating: 5.0,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    description: "Sleek weather-resistant outer shell with matte black YKK Excella dual zippers and hidden magnetic storm flap. Engineered with breathable micro-mesh lining for all-weather comfort in the metropolis.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Matte Obsidian", hex: "#111116" },
      { name: "Cyber Plum", hex: "#4C1D95" },
      { name: "Ash Grey", hex: "#9CA3AF" }
    ],
    tags: ["Water-Resistant", "Matte Finish", "Bestseller", "Men", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-03",
    sku: "VEL-FW26-003",
    name: "Premium Cotton Shirt",
    category: "Essentials",
    gender: "Men",
    originalPrice: 1999,
    discountedPrice: 1399,
    discountPercent: 30,
    badge: "NEW DROP",
    code: "NO. 03 / POPLIN",
    fabric: "100% Giza 88 Extra-Long Staple",
    rating: 4.8,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    description: "Tailored relaxed silhouette woven from 100% Giza extra-long staple Egyptian cotton. Hand-carved mother-of-pearl buttons, curved raw hem, and silky peach finish for elevated everyday luxury.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Warm Cream", hex: "#F8F5F0" },
      { name: "Soft Lavender", hex: "#DDD6FE" },
      { name: "Deep Ink", hex: "#0F172A" }
    ],
    tags: ["100% Giza Cotton", "Relaxed Fit", "Breathable", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "prod-04",
    sku: "VEL-FW26-004",
    name: "Essential Cargo Pants",
    category: "Streetwear",
    gender: "Unisex",
    originalPrice: 2799,
    discountedPrice: 1959,
    discountPercent: 30,
    badge: "POPULAR",
    code: "NO. 04 / CARGO",
    fabric: "Technical Ripstop Weave",
    rating: 4.9,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=85",
    description: "Futuristic utilitarian cargo trousers featuring ergonomic articulated knee pleats, Fidlock-inspired magnetic gusset pockets, and internal bungee hem cinch cords.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Deep Charcoal", hex: "#1F1D24" },
      { name: "Military Olive", hex: "#3F4A3C" },
      { name: "Pale Dust", hex: "#C5BDB2" }
    ],
    tags: ["Multi-pocket", "Tapered Bungee", "Technical Twill", "Men", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-05",
    sku: "VEL-FW26-005",
    name: "Luxury Knit Sweater",
    category: "Essentials",
    gender: "Women",
    originalPrice: 3499,
    discountedPrice: 2449,
    discountPercent: 30,
    badge: "LIMITED RUN",
    code: "NO. 05 / MERINO",
    fabric: "Extra-Fine Australian Merino Blend",
    rating: 4.9,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    description: "Ultra-fine Merino wool blend sweater featuring sculptural fisherman rib knit, architectural dropped shoulders, and subtle rolled neck rim. Unmatched thermal regulation.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dusty Lilac", hex: "#C4B5FD" },
      { name: "Smoky Black", hex: "#1E1B26" },
      { name: "Oatmeal Melange", hex: "#E5DEC9" }
    ],
    tags: ["Merino Wool", "Ribbed Trim", "Limited Edition", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "prod-06",
    sku: "VEL-FW26-006",
    name: "Classic Denim Jacket",
    category: "Jackets",
    gender: "Unisex",
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    badge: "HERITAGE",
    code: "NO. 06 / SELVEDGE",
    fabric: "14oz Kurabo Japanese Selvedge",
    rating: 4.7,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85",
    description: "Authentic 14oz Japanese selvedge denim jacket washed in pure ozone for an authentic vintage indigo patina. Antique pewter hardware and reinforced chain stitching throughout.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Vintage Indigo", hex: "#2B3A67" },
      { name: "Washed Black", hex: "#29272E" }
    ],
    tags: ["14oz Selvedge", "Vintage Patina", "Brass Hardware", "Men", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-07",
    sku: "VEL-FW26-007",
    name: "Minimal Sneakers",
    category: "Footwear & Bags",
    gender: "Unisex",
    originalPrice: 4499,
    discountedPrice: 3149,
    discountPercent: 30,
    badge: "STUDIO ICON",
    code: "NO. 07 / CALFSKIN",
    fabric: "Full-Grain Italian Box Calfskin",
    rating: 5.0,
    reviewCount: 205,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    description: "Sculptural low-profile luxury sneaker constructed with butter-soft Italian full-grain leather, OrthoLite bio-foam footbed, and durable vulcanized natural rubber gum cupsole.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Monochrome White", hex: "#F3F4F6" },
      { name: "Shadow Violet", hex: "#312E81" },
      { name: "Triple Black", hex: "#111827" }
    ],
    tags: ["Italian Calf Leather", "Memory Foam", "Hand-stitched", "Men", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-08",
    sku: "VEL-FW26-008",
    name: "Everyday Tote Bag",
    category: "Footwear & Bags",
    gender: "Unisex",
    originalPrice: 1499,
    discountedPrice: 999,
    discountPercent: 33,
    badge: "SUSTAINABLE",
    code: "NO. 08 / CANVAS",
    fabric: "20oz Organic Duck Canvas",
    rating: 4.8,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    description: "Heavyweight 20oz recycled organic cotton canvas tote. Features padded 16\" laptop sleeve compartment, internal security zip pocket, and reinforced bridle leather handles.",
    sizes: ["One Size"],
    colors: [
      { name: "Natural Ecru", hex: "#EADCC9" },
      { name: "Midnight Purple", hex: "#171126" },
      { name: "Olive Slate", hex: "#4A5243" }
    ],
    tags: ["Recycled Canvas", "Laptop Sleeve", "Eco-friendly", "Women", "Men"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-09",
    sku: "VEL-FW26-009",
    name: "Cybernetic Silk Bomber",
    category: "Jackets",
    gender: "Unisex",
    originalPrice: 5999,
    discountedPrice: 4199,
    discountPercent: 30,
    badge: "RUNWAY EXCLUSIVE",
    code: "NO. 09 / SILK",
    fabric: "Mulberry Silk & Recycled Nylon",
    rating: 5.0,
    reviewCount: 47,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=85",
    description: "Statement outerwear piece uniting mulberry raw silk with technical thermal insulation. Subtle optical color-shift responds dynamically to direct ambient light.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Electric Violet Sheen", hex: "#8B5CF6" },
      { name: "Deep Amethyst", hex: "#3B185F" }
    ],
    tags: ["Mulberry Silk", "Iridescent Sheen", "Limited Run", "Men", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "prod-10",
    sku: "VEL-FW26-010",
    name: "Monochrome Tailored Trousers",
    category: "Essentials",
    gender: "Women",
    originalPrice: 3299,
    discountedPrice: 2309,
    discountPercent: 30,
    badge: "NEW DROP",
    code: "NO. 10 / WOOL",
    fabric: "Virgin Wool & Lyocell Twill",
    rating: 4.8,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    description: "Sharp double-pleated wide-leg trousers cut in Italian wool-twill. Features side brass adjusters, blind-stitched cuffs, and fluid drape for an elongated editorial profile.",
    sizes: ["28", "30", "32", "34"],
    colors: [
      { name: "Jet Black", hex: "#0A0A0E" },
      { name: "Chalk Cream", hex: "#F3EFE6" }
    ],
    tags: ["Italian Wool", "Wide Leg", "Pleated", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "prod-11",
    sku: "VEL-FW26-011",
    name: "Avant-Garde Graphic Tee",
    category: "Streetwear",
    gender: "Unisex",
    originalPrice: 1799,
    discountedPrice: 1199,
    discountPercent: 33,
    badge: "TRENDING",
    code: "NO. 11 / GRAPHIC",
    fabric: "280 GSM Combed Ring-Spun Cotton",
    rating: 4.9,
    reviewCount: 168,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=900&q=85",
    description: "280 GSM combed cotton crewneck t-shirt featuring high-density architectural archive graphic screenprint on back and tonal micro-embroidery across collarbone.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Acid Black", hex: "#1C1C24" },
      { name: "Optic White", hex: "#FFFFFF" }
    ],
    tags: ["280 GSM Cotton", "Screen Printed", "Boxy Fit", "Men", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-12",
    sku: "VEL-FW26-012",
    name: "Sculptural Leather Crossbody",
    category: "Footwear & Bags",
    gender: "Women",
    originalPrice: 2999,
    discountedPrice: 2099,
    discountPercent: 30,
    badge: "LIMITED RUN",
    code: "NO. 12 / CALF",
    fabric: "Vegetable-Tanned Tuscan Leather",
    rating: 4.9,
    reviewCount: 71,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    description: "Architectural geometric saddle silhouette hand-formed in Tuscany from vegetable-tanned smooth box calfskin with custom engraved magnetic alloy buckle and modular strap.",
    sizes: ["One Size"],
    colors: [
      { name: "Obsidian Black", hex: "#141419" },
      { name: "Electric Violet Edge", hex: "#7C3AED" }
    ],
    tags: ["Box Calfskin", "Magnetic Lock", "Modular Strap", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },

  // --- NEW WOMEN'S WEAR ATELIER ADDITIONS ---
  {
    id: "prod-13",
    sku: "VEL-FW26-013",
    name: "Draped Asymmetric Silk Gown",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 8999,
    discountedPrice: 6299,
    discountPercent: 30,
    badge: "HAUTE COUTURE",
    code: "NO. 13 / COUTURE",
    fabric: "100% Pure Mulberry Crepe Silk",
    rating: 5.0,
    reviewCount: 34,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
    description: "Floor-length evening sculpture featuring fluid one-shoulder architectural drape, thigh-high slit with hand-rolled French seams, and concealed Japanese invisible zip.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Obsidian Violet", hex: "#221338" },
      { name: "Liquid Silver", hex: "#E2E8F0" }
    ],
    tags: ["Evening Wear", "Mulberry Silk", "Asymmetric", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-14",
    sku: "VEL-FW26-014",
    name: "Sculptural Corset Blazer",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 6499,
    discountedPrice: 4549,
    discountPercent: 30,
    badge: "ATELIER EDITION",
    code: "NO. 14 / CORSET",
    fabric: "Super 120s Italian Virgin Wool",
    rating: 4.9,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=85",
    description: "Architectural hourglass tailoring featuring structured internal boning, exaggerated peak lapels, and custom buffalo horn button closure.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight Onyx", hex: "#0B0813" },
      { name: "Cream Ecru", hex: "#F3EDE2" }
    ],
    tags: ["Hourglass Fit", "Virgin Wool", "Tailored", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "prod-15",
    sku: "VEL-FW26-015",
    name: "Cashmere Cocoon Trench",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 9999,
    discountedPrice: 6999,
    discountPercent: 30,
    badge: "RUNWAY ICON",
    code: "NO. 15 / CASHMERE",
    fabric: "Double-Faced Mongolian Cashmere",
    rating: 5.0,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "Enveloping storm coat cut in double-faced Mongolian cashmere with belted waist sash, horn storm flap, and deep hand-warmer welt pockets.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Dusted Lilac", hex: "#B8A7EA" },
      { name: "Smoky Black", hex: "#15101E" }
    ],
    tags: ["Cashmere", "Cocoon Cut", "Storm Trench", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "prod-16",
    sku: "VEL-FW26-016",
    name: "Fluid Pleated Palazzo Trousers",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 3799,
    discountedPrice: 2659,
    discountPercent: 30,
    badge: "NEW DROP",
    code: "NO. 16 / PALAZZO",
    fabric: "High-Twist Wool Crepe",
    rating: 4.8,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
    description: "High-rise wide-leg silhouette featuring continuous knife pleating, side slant pockets, and liquid drape movement that elongates the posture.",
    sizes: ["26", "28", "30", "32"],
    colors: [
      { name: "Jet Plum", hex: "#1C112C" },
      { name: "Ivory", hex: "#FDFBF7" }
    ],
    tags: ["Palazzo", "Pleated", "Wool Crepe", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  },

  // --- NEW MEN'S WEAR TAILORING ADDITIONS ---
  {
    id: "prod-17",
    sku: "VEL-FW26-017",
    name: "Architectural Double-Breasted Overcoat",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 8499,
    discountedPrice: 5949,
    discountPercent: 30,
    badge: "HERITAGE COUTURE",
    code: "NO. 17 / OVERCOAT",
    fabric: "680 GSM Melange Wool Melton",
    rating: 5.0,
    reviewCount: 68,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    description: "Sharp-shouldered full-length overcoat featuring oversized peak lapels, genuine horn buttons, deep center back vent, and breathable Bemberg cupro lining.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Obsidian Noir", hex: "#0D0A14" },
      { name: "Graphite Melange", hex: "#373244" }
    ],
    tags: ["Double Breasted", "Heavy Melton", "Tailored", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-18",
    sku: "VEL-FW26-018",
    name: "Structured Boxy Poplin Overshirt",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 2999,
    discountedPrice: 2099,
    discountPercent: 30,
    badge: "NEW DROP",
    code: "NO. 18 / OVERSHIRT",
    fabric: "Crisp 120s High-Density Poplin",
    rating: 4.8,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    description: "Minimalist boxy silhouette with concealed front placket, squared chest patch pocket, and spread collar in crisp compact organic poplin.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Chalk Bone", hex: "#EFECE6" },
      { name: "Deep Ink", hex: "#111726" }
    ],
    tags: ["Boxy Fit", "Poplin", "Overshirt", "Men"],
    isNew: true,
    isTrending: false,
    isFeatured: false
  },
  {
    id: "prod-19",
    sku: "VEL-FW26-019",
    name: "Wide-Leg Pleated Wool Trousers",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 3699,
    discountedPrice: 2589,
    discountPercent: 30,
    badge: "BESTSELLER",
    code: "NO. 19 / FLANNEL",
    fabric: "Italian Worsted Wool Flannel",
    rating: 4.9,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    description: "Full cut relaxed trousers with deep inward double pleats, horn button side adjusters, and natural full break hemline.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Charcoal Heather", hex: "#23202B" },
      { name: "Warm Taupe", hex: "#8A7D71" }
    ],
    tags: ["Wide Leg", "Double Pleat", "Italian Flannel", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-20",
    sku: "VEL-FW26-020",
    name: "Cyber-Tactical Commando Knit",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 4299,
    discountedPrice: 2999,
    discountPercent: 30,
    badge: "ARCHIVE RUN",
    code: "NO. 20 / COMMANDO",
    fabric: "Chunky British Wool & Cordura",
    rating: 5.0,
    reviewCount: 62,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    description: "Heavyweight fisherman rib crewneck sweater featuring water-resistant ballistic Cordura elbow and shoulder patches for an avant-garde utilitarian profile.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Stealth Black", hex: "#121018" },
      { name: "Combat Olive", hex: "#323B2F" }
    ],
    tags: ["Heavy Knit", "Cordura Reinforcement", "Tactical", "Men"],
    isNew: true,
    isTrending: false,
    isFeatured: false
  },

  // --- FURTHER WOMEN'S WEAR ATELIER ADDITIONS ---
  {
    id: "prod-21",
    sku: "VEL-FW26-021",
    name: "Liquid Metal Draped Slip Dress",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 5999,
    discountedPrice: 4199,
    discountPercent: 30,
    badge: "ATELIER DROP",
    code: "NO. 21 / SLIP",
    fabric: "Fluid Metallic Viscose & Silk Satin",
    rating: 4.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85",
    description: "Sinuous bias-cut evening gown with liquid mercury drape, delicate cross-back spaghetti straps, and raw merrow hemline for effortless elegance.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Mercury Silver", hex: "#D1D5DB" },
      { name: "Midnight Onyx", hex: "#111827" }
    ],
    tags: ["Evening", "Silk Satin", "Cowl Neck", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-22",
    sku: "VEL-FW26-022",
    name: "Structured Cut-Out Tailored Vest",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    badge: "RUNWAY EXCLUSIVE",
    code: "NO. 22 / WAISTCOAT",
    fabric: "Compact Tropical Virgin Wool (310 GSM)",
    rating: 4.8,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    description: "Sharp geometric waist-sculpting vest with architectural notch collar, exposed side buckle cinch straps, and genuine mother-of-pearl buttons.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory Chalk", hex: "#F3F0E6" },
      { name: "Obsidian", hex: "#18141F" }
    ],
    tags: ["Tailored Vest", "Virgin Wool", "Waistcoat", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "prod-23",
    sku: "VEL-FW26-023",
    name: "Oversized Cocoon Shearling Coat",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 9999,
    discountedPrice: 6999,
    discountPercent: 30,
    badge: "HERITAGE ARCHIVE",
    code: "NO. 23 / SHEARLING",
    fabric: "Spanish Merino Curly Shearling & Lambskin",
    rating: 5.0,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "Enveloping cocoon proportions lined in cloud-soft curly shearling with hand-taped nappa leather seams and custom heavy double-ended gunmetal zip.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Truffle Brown", hex: "#3B2F2F" },
      { name: "Frost Bone", hex: "#E8E4DA" }
    ],
    tags: ["Shearling", "Cocoon Coat", "Winter Atelier", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-24",
    sku: "VEL-FW26-024",
    name: "Fluid Column Pleated Maxi Skirt",
    category: "Women's Collection",
    gender: "Women",
    originalPrice: 3499,
    discountedPrice: 2449,
    discountPercent: 30,
    badge: "NEW SEASON",
    code: "NO. 24 / COLUMN",
    fabric: "Permanent Accordion-Pleat Georgette",
    rating: 4.7,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    description: "High-waisted monolithic maxi skirt crafted with micro accordion pleats that cascade with kinetic grace. Features an elasticized inner grosgrain waistband.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Electric Violet", hex: "#7C3AED" },
      { name: "Deep Charcoal", hex: "#1F1D24" }
    ],
    tags: ["Pleated Skirt", "Maxi", "Fluid Motion", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },

  // --- FURTHER MEN'S WEAR TAILORING ADDITIONS ---
  {
    id: "prod-25",
    sku: "VEL-FW26-025",
    name: "Japanese Selvedge Denim Kimono Jacket",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 5499,
    discountedPrice: 3849,
    discountPercent: 30,
    badge: "JAPANESE TEXTILE",
    code: "NO. 25 / KIMONO",
    fabric: "14oz Okayama Shuttle-Loomed Selvedge Denim",
    rating: 4.9,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    description: "East-meets-West sartorial cross-pollination. Boxy wrap silhouette with clean drop shoulders, red-line selvedge interior taping, and sashiko reinforced stitching.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Indigo", hex: "#1A2536" },
      { name: "Washed Graphite", hex: "#2E3138" }
    ],
    tags: ["Selvedge Denim", "Kimono", "Kuroki Mills", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-26",
    sku: "VEL-FW26-026",
    name: "Minimalist Chunky Cashmere Turtleneck",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 4799,
    discountedPrice: 3359,
    discountPercent: 30,
    badge: "HERITAGE YARN",
    code: "NO. 26 / ROLLNECK",
    fabric: "7-Gauge 100% Inner Mongolian Cashmere",
    rating: 5.0,
    reviewCount: 47,
    image: "https://images.unsplash.com/photo-1618886614638-80e3c15cd819?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    description: "Sumptuous 7-gauge pure cashmere rollneck knit with architectural raglan shoulders and thick ribbed collar that holds sculpted shape without pinching.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Slate", hex: "#4B4E5A" },
      { name: "Oatmeal Melange", hex: "#D6CFC7" }
    ],
    tags: ["Pure Cashmere", "Rollneck", "Winter Luxury", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "prod-27",
    sku: "VEL-FW26-027",
    name: "Articulated Knee Technical Cargo Trousers",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    badge: "MODULAR UTILITY",
    code: "NO. 27 / TACTICAL",
    fabric: "Weatherproof Schoeller Dynamic Stretch Twill",
    rating: 4.8,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85",
    description: "Ergonomic 3D darted knee construction designed for dynamic movement. Dual Fidlock magnetic cargo pouches, concealed cinch cords at ankle, water-repellent coating.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Shadow Black", hex: "#131317" },
      { name: "Military Olive", hex: "#323B2F" }
    ],
    tags: ["Articulated Knee", "Technical Twill", "Fidlock", "Men"],
    isNew: true,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "prod-28",
    sku: "VEL-FW26-028",
    name: "Sartorial Unstructured Wool Blazer",
    category: "Men's Collection",
    gender: "Men",
    originalPrice: 6999,
    discountedPrice: 4899,
    discountPercent: 30,
    badge: "NEW DROP",
    code: "NO. 28 / BLAZER",
    fabric: "Unlined Hopsack Wool & Silk Blend",
    rating: 4.9,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    description: "Soft Neapolitan-style shirt shoulders (spalla camicia), unlined interior with bound seams, double patch pockets, and natural genuine horn buttons.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Midnight Navy", hex: "#161D2B" },
      { name: "Espresso", hex: "#29211C" }
    ],
    tags: ["Unstructured Blazer", "Hopsack Wool", "Neapolitan Shoulder", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  }
];

/**
 * Helper Data Access Methods
 */
const VeloraProducts = {
  getAll: () => VELORA_PRODUCTS,
  getById: (id) => VELORA_PRODUCTS.find(p => p.id === id),
  getByCategory: (category) => {
    if (!category || category === "All") return VELORA_PRODUCTS;
    const cat = category.toLowerCase().trim();
    if (cat === "women" || cat === "women's collection" || cat === "women's wear" || cat === "womens") {
      return VELORA_PRODUCTS.filter(p => (p.gender === "Women" || p.gender === "Unisex") && p.gender !== "Men");
    }
    if (cat === "men" || cat === "men's collection" || cat === "men's wear" || cat === "mens") {
      return VELORA_PRODUCTS.filter(p => (p.gender === "Men" || p.gender === "Unisex") && p.gender !== "Women");
    }
    return VELORA_PRODUCTS.filter(p => 
      p.category.toLowerCase() === cat ||
      p.category.toLowerCase().includes(cat) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(cat)))
    );
  },
  getTrending: () => VELORA_PRODUCTS.filter(p => p.isTrending),
  getNewArrivals: () => VELORA_PRODUCTS.filter(p => p.isNew),
  search: (query) => {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    return VELORA_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  },
  sort: (products, criteria) => {
    const list = [...products];
    switch (criteria) {
      case "price-asc":
        return list.sort((a, b) => a.discountedPrice - b.discountedPrice);
      case "price-desc":
        return list.sort((a, b) => b.discountedPrice - a.discountedPrice);
      case "discount":
        return list.sort((a, b) => b.discountPercent - a.discountPercent);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return list;
    }
  },
  formatPrice: (num) => {
    return "\u20B9" + Number(num).toLocaleString("en-IN");
  }
};

// Global Browser & CommonJS Attachment
if (typeof window !== "undefined") {
  window.VELORA_PRODUCTS = VELORA_PRODUCTS;
  window.VeloraProducts = VeloraProducts;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VELORA_PRODUCTS, VeloraProducts };
}
