/**
 * VELORA — Men & Women Luxury Fashion Catalog
 * Pure Vanilla JavaScript Data Layer
 * Strict Gender Separation & Curated Department Categorization
 */

const VELORA_PRODUCTS = [
  // =========================================================================
  // MEN'S FASHION DEPARTMENT (14 Authentic Men's Creations)
  // =========================================================================
  {
    id: "men-01",
    sku: "VEL-M26-001",
    name: "Oversized Graphic T-Shirt",
    department: "men",
    category: "T-Shirts",
    originalPrice: 1999,
    discountedPrice: 1299,
    discountPercent: 35,
    badge: "BESTSELLER",
    fabric: "280 GSM Compact Combed Cotton",
    rating: 4.9,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed drop-shoulder silhouette crafted in heavyweight 280 GSM combed jersey with micro-ribbed crew collar and subtle tonal high-density silicone typography.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Onyx Black", hex: "#171717" },
      { name: "Vintage Chalk", hex: "#F5F0E8" },
      { name: "Smoked Taupe", hex: "#B9A58F" }
    ],
    tags: ["T-Shirts", "Oversized", "Graphic", "Men"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-02",
    sku: "VEL-M26-002",
    name: "Premium Oxford Shirt",
    department: "men",
    category: "Shirts",
    originalPrice: 3499,
    discountedPrice: 2499,
    discountPercent: 29,
    badge: "POPULAR",
    fabric: "100% Giza Long-Staple Cotton",
    rating: 4.8,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    description: "Tailored fit button-down crafted from yarn-dyed organic Giza cotton. Features refined mother-of-pearl buttons and a soft-fused collar that maintains sharp structure.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Sky Mist", hex: "#D6E4EE" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Deep Navy", hex: "#182030" }
    ],
    tags: ["Shirts", "Oxford", "Formal", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-03",
    sku: "VEL-M26-003",
    name: "Urban Zip Hoodie",
    department: "men",
    category: "Hoodies",
    originalPrice: 4299,
    discountedPrice: 2999,
    discountPercent: 30,
    badge: "SALE -30%",
    fabric: "480 GSM Loopback French Terry",
    rating: 4.9,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=85",
    description: "Substantial heavyweight fleece hoodie with matte two-way gunmetal YKK zipper, double-layered hood, and concealed magnetic kangaroo pouch seams.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Heather", hex: "#232323" },
      { name: "Sand Taupe", hex: "#D9C7B3" },
      { name: "Soft Violet", hex: "#8B6FD8" }
    ],
    tags: ["Hoodies", "Streetwear", "Heavyweight", "Men"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-04",
    sku: "VEL-M26-004",
    name: "Minimal Bomber Jacket",
    department: "men",
    category: "Jackets",
    originalPrice: 6999,
    discountedPrice: 4999,
    discountPercent: 29,
    badge: "LIMITED DROP",
    fabric: "High-Density Matte Technical Twill",
    rating: 5.0,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=900&q=85",
    description: "Architectural bomber with storm-proof water-repellent shell, quilted Primaloft insulation, ribbed wool hem, and clean utility arm pocket.",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Dark Shadow", hex: "#1A1A1A" },
      { name: "Military Olive", hex: "#3B4235" }
    ],
    tags: ["Jackets", "Outerwear", "Bomber", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-05",
    sku: "VEL-M26-005",
    name: "Slim Fit Denim Jeans",
    department: "men",
    category: "Jeans",
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    badge: "CLASSIC",
    fabric: "13.5oz Ring-Spun Comfort Stretch Denim",
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=85",
    description: "Custom vintage-indigo wash denim with ergonomic knee articulation, chain-stitched hems, and signature debossed leather waistband patch.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Vintage Indigo", hex: "#22354B" },
      { name: "Washed Black", hex: "#2A2A2A" }
    ],
    tags: ["Jeans", "Denim", "Slim Fit", "Men"],
    isNew: false,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "men-06",
    sku: "VEL-M26-006",
    name: "Relaxed Cargo Pants",
    department: "men",
    category: "Trousers",
    originalPrice: 3499,
    discountedPrice: 2499,
    discountPercent: 29,
    badge: "TRENDING",
    fabric: "Durable Organic Cotton Ripstop",
    rating: 4.9,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85",
    description: "Engineered wide leg with adjustable cinch ankles, accordion side cargo pockets with hidden snaps, and gusseted crotch for natural movement.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Earthy Taupe", hex: "#B9A58F" },
      { name: "Midnight Charcoal", hex: "#1F1F1F" }
    ],
    tags: ["Trousers", "Cargo", "Relaxed Fit", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "men-07",
    sku: "VEL-M26-007",
    name: "Classic Polo T-Shirt",
    department: "men",
    category: "T-Shirts",
    originalPrice: 2199,
    discountedPrice: 1499,
    discountPercent: 32,
    badge: "ESSENTIAL",
    fabric: "Double-Mercerized Pima Piqué",
    rating: 4.7,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
    description: "Lustrous double-mercerized Pima cotton piqué with clean concealed placket, rib-knit collar, and reinforced side-slit vents.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Warm Cream", hex: "#F5F0E8" },
      { name: "Soft Charcoal", hex: "#2B2B2B" },
      { name: "Dusty Violet", hex: "#7E6E9C" }
    ],
    tags: ["T-Shirts", "Polo", "Mercerized", "Men"],
    isNew: false,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "men-08",
    sku: "VEL-M26-008",
    name: "Premium Minimal Sneakers",
    department: "men",
    category: "Sneakers",
    originalPrice: 5499,
    discountedPrice: 3999,
    discountPercent: 27,
    badge: "ICONIC",
    fabric: "Full-Grain Italian Calf Leather",
    rating: 5.0,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",
    description: "Low-top court profile crafted in supple butter-soft Italian calfskin leather. Hand-stitched Margom rubber cupsole and memory foam cushioned footbed.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: [
      { name: "Pure Sand", hex: "#D9C7B3" },
      { name: "Clean White", hex: "#FFFFFF" }
    ],
    tags: ["Sneakers", "Footwear", "Leather", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-09",
    sku: "VEL-M26-009",
    name: "Tailored Linen Blend Shirt",
    department: "men",
    category: "Shirts",
    originalPrice: 3199,
    discountedPrice: 2299,
    discountPercent: 28,
    badge: "SUMMER ATELIER",
    fabric: "55% Normandy Linen, 45% Organic Cotton",
    rating: 4.8,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    description: "Breathable vacation silhouette with band collar, curved hemline, and relaxed chest fit. Pre-washed for exceptional softness from first wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural Sand", hex: "#D9C7B3" },
      { name: "Soft Cream", hex: "#F5F0E8" }
    ],
    tags: ["Shirts", "Linen", "Resort", "Men"],
    isNew: true,
    isTrending: false,
    isFeatured: false
  },
  {
    id: "men-10",
    sku: "VEL-M26-010",
    name: "Heritage Nehru Kurta Jacket",
    department: "men",
    category: "Ethnic Wear",
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    badge: "FESTIVE EDIT",
    fabric: "Matka Raw Silk & Cotton Jacquard",
    rating: 4.9,
    reviewCount: 46,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    description: "Contemporary sleeveless mandarin vest featuring subtle geometric jacquard weave, metallic hand-cast shank buttons, and cupro lining.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Royal Charcoal", hex: "#1C1C1C" },
      { name: "Warm Taupe", hex: "#B9A58F" }
    ],
    tags: ["Ethnic Wear", "Kurta", "Nehru Jacket", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-11",
    sku: "VEL-M26-011",
    name: "Wide-Leg Pleated Wool Trousers",
    department: "men",
    category: "Trousers",
    originalPrice: 4199,
    discountedPrice: 2999,
    discountPercent: 29,
    badge: "TAILORED",
    fabric: "Super 120s Worsted Wool Flannel",
    rating: 4.9,
    reviewCount: 74,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed high-rise trousers with double inward front pleats, side waist adjuster buckles, and a drape that pools elegantly over footwear.",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Flannel Charcoal", hex: "#242424" },
      { name: "Heather Sand", hex: "#D9C7B3" }
    ],
    tags: ["Trousers", "Pleated", "Wool", "Men"],
    isNew: false,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "men-12",
    sku: "VEL-M26-012",
    name: "Structured Raw Denim Kimono",
    department: "men",
    category: "Jackets",
    originalPrice: 5499,
    discountedPrice: 3849,
    discountPercent: 30,
    badge: "ATELIER DROP",
    fabric: "14oz Okayama Shuttle-Loomed Selvedge Denim",
    rating: 5.0,
    reviewCount: 58,
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    description: "East-meets-West wrap silhouette with clean drop shoulders, red-line selvedge interior taping, and reinforced sashiko stitching along the cuffs.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Raw Indigo", hex: "#1A2536" },
      { name: "Washed Graphite", hex: "#2E3138" }
    ],
    tags: ["Jackets", "Denim", "Kimono", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "men-13",
    sku: "VEL-M26-013",
    name: "Leather Crossbody Utility Bag",
    department: "men",
    category: "Accessories",
    originalPrice: 2899,
    discountedPrice: 1999,
    discountPercent: 31,
    badge: "ACCENTS",
    fabric: "Full-Grain Saddle Leather & Metal Hardware",
    rating: 4.8,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    description: "Compact utilitarian shoulder bag with magnetic Fidlock closure, internal passport sleeve, and adjustable heavyweight nylon webbing strap.",
    sizes: ["One Size"],
    colors: [
      { name: "Stealth Black", hex: "#171717" },
      { name: "Cognac Taupe", hex: "#8A6D56" }
    ],
    tags: ["Accessories", "Bags", "Leather", "Men"],
    isNew: false,
    isTrending: false,
    isFeatured: false
  },
  {
    id: "men-14",
    sku: "VEL-M26-014",
    name: "Architectural Double-Breasted Overcoat",
    department: "men",
    category: "Jackets",
    originalPrice: 8499,
    discountedPrice: 5999,
    discountPercent: 29,
    badge: "COUTURE",
    fabric: "680 GSM Melange Wool Melton",
    rating: 5.0,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    description: "Sharp-shouldered full-length overcoat featuring oversized peak lapels, genuine horn buttons, deep center back vent, and breathable Bemberg cupro lining.",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { name: "Obsidian Charcoal", hex: "#171717" },
      { name: "Melange Sand", hex: "#C7B8A5" }
    ],
    tags: ["Jackets", "Overcoat", "Tailored", "Men"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },

  // =========================================================================
  // WOMEN'S FASHION DEPARTMENT (14 Authentic Women's Creations)
  // =========================================================================
  {
    id: "women-01",
    sku: "VEL-W26-001",
    name: "Floral Maxi Dress",
    department: "women",
    category: "Dresses",
    originalPrice: 4299,
    discountedPrice: 2999,
    discountPercent: 30,
    badge: "BESTSELLER",
    fabric: "100% Breathable Chiffon Georgette",
    rating: 4.9,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
    description: "Floor-sweeping tiered bohemian silhouette with hand-screened watercolor floral botanicals, shirred bodice, and delicate flutter sleeves.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Rose Sand", hex: "#D9C7B3" },
      { name: "Twilight Violet", hex: "#8B6FD8" },
      { name: "Ivory Cream", hex: "#F5F0E8" }
    ],
    tags: ["Dresses", "Maxi", "Floral", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-02",
    sku: "VEL-W26-002",
    name: "Elegant Satin Slip Dress",
    department: "women",
    category: "Dresses",
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    badge: "POPULAR",
    fabric: "Heavyweight 22-Momme Mulberry Silk Satin",
    rating: 5.0,
    reviewCount: 114,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    description: "Sinuous bias-cut cocktail gown that ripples with liquid drape. Crafted with adjustable delicate rouleau straps, subtle cowl neck, and merrowed hem.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne Cream", hex: "#F5F0E8" },
      { name: "Midnight Charcoal", hex: "#171717" },
      { name: "Velvet Violet", hex: "#8B6FD8" }
    ],
    tags: ["Dresses", "Satin", "Evening", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-03",
    sku: "VEL-W26-003",
    name: "Premium Ribbed Crop Top",
    department: "women",
    category: "Tops",
    originalPrice: 1899,
    discountedPrice: 1299,
    discountPercent: 32,
    badge: "ESSENTIAL",
    fabric: "Sculpting Organic Cotton & Modal Rib",
    rating: 4.8,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    description: "Ultra-flattering high-neck fitted silhouette in dense micro-ribbed modal that hugs the torso without constriction. Double-layered for clean zero-sheer opacity.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Warm Cream", hex: "#F5F0E8" },
      { name: "Taupe Stone", hex: "#B9A58F" },
      { name: "Charcoal Noir", hex: "#171717" }
    ],
    tags: ["Tops", "Crop Top", "Ribbed", "Women"],
    isNew: false,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "women-04",
    sku: "VEL-W26-004",
    name: "Designer Linen Co-ord Set",
    department: "women",
    category: "Co-ord Sets",
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    badge: "NEW SEASON",
    fabric: "100% Belgian Washed Pure Linen",
    rating: 4.9,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "Two-piece resort pairing comprising a boxy camp-collar short sleeve shirt and matching pleated wide-leg trousers with elasticated back waist.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand Dune", hex: "#D9C7B3" },
      { name: "Soft Lilac", hex: "#A897CC" }
    ],
    tags: ["Co-ord Sets", "Linen", "Resort", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-05",
    sku: "VEL-W26-005",
    name: "Casual Wide-Leg Denim Jeans",
    department: "women",
    category: "Jeans",
    originalPrice: 3499,
    discountedPrice: 2499,
    discountPercent: 29,
    badge: "TRENDING",
    fabric: "12.5oz Rigid Vintage Cotton Denim",
    rating: 4.8,
    reviewCount: 135,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
    description: "High-rise waist with relaxed wide-leg flare from hip to hem. Authentic stone-washed whiskering, copper hardware, and clean raw-edge hem.",
    sizes: ["26", "28", "30", "32"],
    colors: [
      { name: "Light Vintage Blue", hex: "#8DAEC4" },
      { name: "Charcoal Grey", hex: "#383838" }
    ],
    tags: ["Jeans", "Wide Leg", "Denim", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "women-06",
    sku: "VEL-W26-006",
    name: "Elegant Anarkali Kurti",
    department: "women",
    category: "Kurtis",
    originalPrice: 3199,
    discountedPrice: 2199,
    discountPercent: 31,
    badge: "FESTIVE EDIT",
    fabric: "Mulberry Silk & Chanderi Blend",
    rating: 4.9,
    reviewCount: 84,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
    description: "Graceful 32-kali flared silhouette with intricate zari thread embroidery along the yoke, keyhole neckline, and delicate gota patti borders.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Amethyst Violet", hex: "#8B6FD8" },
      { name: "Warm Cream", hex: "#F5F0E8" },
      { name: "Smoked Taupe", hex: "#B9A58F" }
    ],
    tags: ["Kurtis", "Ethnic Wear", "Anarkali", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-07",
    sku: "VEL-W26-007",
    name: "Handwoven Chanderi Cotton Saree",
    department: "women",
    category: "Sarees",
    originalPrice: 5999,
    discountedPrice: 3999,
    discountPercent: 33,
    badge: "HERITAGE WEAVE",
    fabric: "Pure Chanderi Silk-Cotton with Zari",
    rating: 5.0,
    reviewCount: 102,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
    description: "Artisan-loomed 6.3m drape featuring delicate hand-woven peacock motifs, gossamer sheer pallu, and matching unstitched blouse piece.",
    sizes: ["Free Size (6.3m)"],
    colors: [
      { name: "Champagne Gold", hex: "#D9C7B3" },
      { name: "Deep Amethyst", hex: "#6D28D9" },
      { name: "Pearl Cream", hex: "#F5F0E8" }
    ],
    tags: ["Sarees", "Ethnic Wear", "Chanderi", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-08",
    sku: "VEL-W26-008",
    name: "Minimal Sculptural Shoulder Bag",
    department: "women",
    category: "Handbags",
    originalPrice: 2799,
    discountedPrice: 1999,
    discountPercent: 29,
    badge: "ACCENTS",
    fabric: "Supple Vegan Leather & Suede Microfiber",
    rating: 4.8,
    reviewCount: 71,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    description: "Curved crescent baguette with clean magnetic tab closure, debossed logo detail, and interchangeable shoulder and crossbody straps.",
    sizes: ["One Size"],
    colors: [
      { name: "Taupe Sand", hex: "#B9A58F" },
      { name: "Obsidian", hex: "#171717" },
      { name: "Cream White", hex: "#F5F0E8" }
    ],
    tags: ["Handbags", "Accessories", "Shoulder Bag", "Women"],
    isNew: false,
    isTrending: false,
    isFeatured: true
  },
  {
    id: "women-09",
    sku: "VEL-W26-009",
    name: "Fluid Accordion Pleated Maxi Skirt",
    department: "women",
    category: "Skirts",
    originalPrice: 3499,
    discountedPrice: 2449,
    discountPercent: 30,
    badge: "MOVEMENT",
    fabric: "Permanent Accordion-Pleat Georgette",
    rating: 4.7,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    description: "High-waisted monolithic skirt with crisp micro pleats that create mesmerizing kinetic movement. Elasticized inner grosgrain waistband for supreme comfort.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Soft Violet", hex: "#8B6FD8" },
      { name: "Smoked Charcoal", hex: "#262626" },
      { name: "Warm Cream", hex: "#F5F0E8" }
    ],
    tags: ["Skirts", "Pleated", "Maxi", "Women"],
    isNew: true,
    isTrending: false,
    isFeatured: false
  },
  {
    id: "women-10",
    sku: "VEL-W26-010",
    name: "Sculptural Corset Blazer",
    department: "women",
    category: "Tops",
    originalPrice: 6499,
    discountedPrice: 4549,
    discountPercent: 30,
    badge: "RUNWAY",
    fabric: "Lightweight Tropical Wool & Silk Facing",
    rating: 5.0,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    description: "Architectural cinched hour-glass blazer with internal boning structure, exaggerated peak lapels, and hidden hook-and-eye waist fastenings.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Charcoal Black", hex: "#171717" },
      { name: "Taupe Putty", hex: "#B9A58F" }
    ],
    tags: ["Tops", "Jackets", "Blazer", "Corset", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-11",
    sku: "VEL-W26-011",
    name: "Strappy Leather Kitten Heels",
    department: "women",
    category: "Footwear",
    originalPrice: 4699,
    discountedPrice: 3299,
    discountPercent: 30,
    badge: "COUTURE HEELS",
    fabric: "100% Nappa Leather & Cushioned Insole",
    rating: 4.8,
    reviewCount: 43,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=85",
    description: "55mm architectural heel with delicate tubular foot straps, square toe silhouette, and butter-soft padded kidskin leather footbed.",
    sizes: ["36", "37", "38", "39", "40"],
    colors: [
      { name: "Bone Cream", hex: "#F5F0E8" },
      { name: "Onyx", hex: "#171717" }
    ],
    tags: ["Footwear", "Heels", "Sandals", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: false
  },
  {
    id: "women-12",
    sku: "VEL-W26-012",
    name: "Embroidered Festive Silk Kurti",
    department: "women",
    category: "Ethnic Wear",
    originalPrice: 3999,
    discountedPrice: 2899,
    discountPercent: 28,
    badge: "HANDCRAFTED",
    fabric: "Hand-Dyed Tussar Silk with Cotton Lining",
    rating: 4.9,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1583391733975-00c733f1165a?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    description: "Straight-cut calf-length kurti featuring delicate resham thread work, high side slits, and hand-embroidered organza sleeve cuffs.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Plum Violet", hex: "#7E58B8" },
      { name: "Warm Sand", hex: "#D9C7B3" }
    ],
    tags: ["Ethnic Wear", "Kurtis", "Silk", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-13",
    sku: "VEL-W26-013",
    name: "Asymmetric Liquid Silk Evening Gown",
    department: "women",
    category: "Dresses",
    originalPrice: 7999,
    discountedPrice: 5499,
    discountPercent: 31,
    badge: "HAUTE COUTURE",
    fabric: "100% Crepe de Chine Mulberry Silk",
    rating: 5.0,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
    description: "Floor-sweeping dramatic column with single architectural shoulder drape, high leg slit with hand-rolled hems, and concealed invisible side zipper.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Obsidian Noir", hex: "#171717" },
      { name: "Deep Violet", hex: "#5C3E9E" }
    ],
    tags: ["Dresses", "Evening", "Silk", "Couture", "Women"],
    isNew: true,
    isTrending: true,
    isFeatured: true
  },
  {
    id: "women-14",
    sku: "VEL-W26-014",
    name: "Cashmere Cocoon Trench Coat",
    department: "women",
    category: "Tops",
    originalPrice: 9999,
    discountedPrice: 6999,
    discountPercent: 30,
    badge: "WINTER LUXURY",
    fabric: "700 GSM Double-Faced Cashmere & Wool",
    rating: 5.0,
    reviewCount: 54,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    description: "Oversized cocoon silhouette with storm storm-flap collar, detachable wide fabric sash belt, and horn button throat tab for winter comfort.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sand Melange", hex: "#D9C7B3" },
      { name: "Deep Charcoal", hex: "#171717" }
    ],
    tags: ["Tops", "Outerwear", "Coat", "Cashmere", "Women"],
    isNew: false,
    isTrending: true,
    isFeatured: false
  }
];

/**
 * Data Access Layer & Category Catalog
 */
const VeloraProducts = {
  // Department-Specific Category Definitions
  MEN_CATEGORIES: [
    { id: "all", name: "All Men's", icon: "grid" },
    { id: "T-Shirts", name: "T-Shirts", icon: "shirt" },
    { id: "Shirts", name: "Shirts", icon: "user" },
    { id: "Hoodies", name: "Hoodies", icon: "feather" },
    { id: "Jackets", name: "Jackets", icon: "shield" },
    { id: "Trousers", name: "Trousers", icon: "maximize" },
    { id: "Jeans", name: "Jeans", icon: "columns" },
    { id: "Ethnic Wear", name: "Ethnic Wear", icon: "sparkles" },
    { id: "Sneakers", name: "Sneakers", icon: "activity" },
    { id: "Accessories", name: "Accessories", icon: "watch" }
  ],

  WOMEN_CATEGORIES: [
    { id: "all", name: "All Women's", icon: "grid" },
    { id: "Dresses", name: "Dresses", icon: "star" },
    { id: "Tops", name: "Tops", icon: "heart" },
    { id: "Kurtis", name: "Kurtis", icon: "sparkles" },
    { id: "Sarees", name: "Sarees", icon: "feather" },
    { id: "Jeans", name: "Jeans", icon: "columns" },
    { id: "Skirts", name: "Skirts", icon: "maximize" },
    { id: "Co-ord Sets", name: "Co-ord Sets", icon: "layers" },
    { id: "Ethnic Wear", name: "Ethnic Wear", icon: "sun" },
    { id: "Handbags", name: "Handbags", icon: "shopping-bag" },
    { id: "Footwear", name: "Footwear", icon: "activity" }
  ],

  getAll: () => VELORA_PRODUCTS,
  getById: (id) => VELORA_PRODUCTS.find(p => p.id === id),
  
  getMenProducts: () => VELORA_PRODUCTS.filter(p => p.department === "men"),
  getWomenProducts: () => VELORA_PRODUCTS.filter(p => p.department === "women"),

  getByDepartment: (department) => {
    if (!department || department === "all") return VELORA_PRODUCTS;
    return VELORA_PRODUCTS.filter(p => p.department === department.toLowerCase());
  },

  getByCategory: (category, department = "all") => {
    let list = VELORA_PRODUCTS;
    if (department && department !== "all") {
      list = list.filter(p => p.department === department.toLowerCase());
    }
    if (!category || category === "all" || category === "All") {
      return list;
    }
    return list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  getTrending: (department = "all") => {
    let list = VELORA_PRODUCTS.filter(p => p.isTrending);
    if (department && department !== "all") {
      list = list.filter(p => p.department === department.toLowerCase());
    }
    return list;
  },

  getNewArrivals: (department = "all") => {
    let list = VELORA_PRODUCTS.filter(p => p.isNew);
    if (department && department !== "all") {
      list = list.filter(p => p.department === department.toLowerCase());
    }
    return list;
  },

  search: (query, department = "all") => {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    let list = VELORA_PRODUCTS;
    if (department && department !== "all") {
      list = list.filter(p => p.department === department.toLowerCase());
    }
    return list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
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

// Global Attachments
if (typeof window !== "undefined") {
  window.VELORA_PRODUCTS = VELORA_PRODUCTS;
  window.VeloraProducts = VeloraProducts;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VELORA_PRODUCTS, VeloraProducts };
}
