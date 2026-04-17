export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  sizes: string[];
  description: string;
  inStock: boolean;
  tag?: string;
}

export type CategorySlug = "sarees" | "lehengas" | "kurtis";

export const categories: { name: string; slug: CategorySlug; sub: string; count: string; image: string }[] = [
  { name: "Sarees", slug: "sarees", sub: "Timeless Drapes", count: "120+ Designs", image: "/images/hero-saree.png" },
  { name: "Lehengas", slug: "lehengas", sub: "Royal Ensembles", count: "80+ Designs", image: "/images/category-lehenga.png" },
  { name: "Kurtis", slug: "kurtis", sub: "Everyday Elegance", count: "200+ Designs", image: "/images/category-kurti.png" },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}

// Static product data
const products: Product[] = [
  // === SAREES ===
  {
    id: "sar-001",
    slug: "banarasi-silk-saree",
    name: "Banarasi Silk Saree",
    price: 12999,
    originalPrice: 16999,
    images: ["/images/product-1.png"],
    category: "sarees",
    sizes: ["Free Size"],
    description: "Handwoven Banarasi silk saree with intricate zari work. Perfect for weddings and festive occasions. This exquisite piece features traditional motifs and a rich pallu that adds royalty to your look.",
    inStock: true,
    tag: "Bestseller",
  },
  {
    id: "sar-002",
    slug: "royal-blue-kanjeevaram",
    name: "Royal Blue Kanjeevaram",
    price: 18999,
    originalPrice: 24999,
    images: ["/images/product-2.png"],
    category: "sarees",
    sizes: ["Free Size"],
    description: "Magnificent Kanjeevaram silk saree in royal blue with gold zari border. Known for its durability and lustrous finish, this saree is a timeless addition to your ethnic wardrobe.",
    inStock: true,
    tag: "New",
  },
  {
    id: "sar-003",
    slug: "emerald-mysore-silk",
    name: "Emerald Mysore Silk",
    price: 9999,
    originalPrice: 13999,
    images: ["/images/product-3.png"],
    category: "sarees",
    sizes: ["Free Size"],
    description: "Luxurious Mysore silk saree in rich emerald green. Features subtle gold patterns that add elegance without being overwhelming. Perfect for both formal events and celebrations.",
    inStock: true,
    tag: "Trending",
  },
  {
    id: "sar-004",
    slug: "pink-organza-saree",
    name: "Pink Organza Saree",
    price: 7999,
    originalPrice: 10999,
    images: ["/images/product-4.png"],
    category: "sarees",
    sizes: ["Free Size"],
    description: "Delicate pink organza saree with delicate floral embroidery. Lightweight and ethereal, perfect for summer weddings and daytime events. A blend of tradition and contemporary elegance.",
    inStock: true,
    tag: "Sale",
  },
  {
    id: "sar-005",
    slug: "bandhani-rajkot-special",
    name: "Bandhani Rajkot Special",
    price: 6999,
    originalPrice: 8999,
    images: ["/images/product-1.png"],
    category: "sarees",
    sizes: ["Free Size"],
    description: "Traditional Bandhani tie-dye saree from Rajkot. Each piece is handcrafted by skilled artisans. The vibrant colors and intricate patterns make it a standout choice for festive occasions.",
    inStock: true,
  },

  // === LEHENGAS ===
  {
    id: "leh-001",
    slug: "bridal-red-lehenga",
    name: "Bridal Red Lehenga",
    price: 45999,
    originalPrice: 59999,
    images: ["/images/product-2.png"],
    category: "lehengas",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Stunning bridal lehenga in rich crimson red with heavy embroidery and stone work. Includes matching blouse and dupatta. Perfect for your big day with intricate detailing and a flowing silhouette.",
    inStock: true,
    tag: "Bestseller",
  },
  {
    id: "leh-002",
    slug: "party-wear-lehenga",
    name: "Party Wear Lehenga",
    price: 24999,
    originalPrice: 32999,
    images: ["/images/product-3.png"],
    category: "lehengas",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant party wear lehenga with contemporary design elements. Features seqin work and a modern silhouette that balances tradition with trend. Perfect for sangeet and reception events.",
    inStock: true,
    tag: "New",
  },
  {
    id: "leh-003",
    slug: "designer-lehenga",
    name: "Designer Lehenga",
    price: 37999,
    originalPrice: 47999,
    images: ["/images/product-4.png"],
    category: "lehengas",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Exquisite designer lehenga with hand-embroidered motifs and premium fabric. The unique color combination and intricate work make it a showstopper at any event.",
    inStock: true,
    tag: "Trending",
  },
  {
    id: "leh-004",
    slug: "traditional-lehenga",
    name: "Traditional Lehenga",
    price: 19999,
    originalPrice: 25999,
    images: ["/images/product-1.png"],
    category: "lehengas",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic traditional lehenga with authentic Indian craftsmanship. Features bandhani work and traditional motifs. A heritage piece that celebrates Indian textile traditions.",
    inStock: true,
  },
  {
    id: "leh-005",
    slug: "contemporary-lehenga",
    name: "Contemporary Lehenga",
    price: 28999,
    originalPrice: 36999,
    images: ["/images/product-2.png"],
    category: "lehengas",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Modern take on traditional lehenga with sleek design and minimal embellishments. Perfect for the contemporary bride who wants elegance with a modern edge.",
    inStock: true,
    tag: "Sale",
  },

  // === KURTIS ===
  {
    id: "kur-001",
    slug: "cotton-kurti",
    name: "Cotton Kurti",
    price: 2999,
    originalPrice: 3999,
    images: ["/images/product-3.png"],
    category: "kurtis",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Pure cotton kurti with hand block print. Breathable and comfortable, perfect for daily wear. Features traditional Ajrakh print with modern silhouette.",
    inStock: true,
    tag: "Bestseller",
  },
  {
    id: "kur-002",
    slug: "silk-kurti",
    name: "Silk Kurti",
    price: 5999,
    originalPrice: 7999,
    images: ["/images/product-4.png"],
    category: "kurtis",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Luxurious silk kurti with zari work on collar and sleeves. Perfect for office wear and formal gatherings. The rich fabric and elegant design make it a versatile addition to your wardrobe.",
    inStock: true,
    tag: "New",
  },
  {
    id: "kur-003",
    slug: "anarkali-kurti",
    name: "Anarkali Kurti",
    price: 4499,
    originalPrice: 5999,
    images: ["/images/product-1.png"],
    category: "kurtis",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Flared Anarkali kurti with chikankari work. The flowing silhouette flatters every body type. Perfect for festive occasions and family gatherings.",
    inStock: true,
    tag: "Trending",
  },
  {
    id: "kur-004",
    slug: "straight-kurti",
    name: "Straight Kurti",
    price: 3499,
    originalPrice: 4499,
    images: ["/images/product-2.png"],
    category: "kurtis",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Elegant straight cut kurti with geometric patterns. Minimalist design with maximum impact. Perfect for both casual and semi-formal occasions.",
    inStock: true,
  },
  {
    id: "kur-005",
    slug: "aline-kurti",
    name: "A-Line Kurti",
    price: 3799,
    originalPrice: 4999,
    images: ["/images/product-3.png"],
    category: "kurtis",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Trendy A-line kurti with embroidered bodice. The flattering silhouette suits all body types. Features subtle embellishments that add charm without being excessive.",
    inStock: true,
    tag: "Sale",
  },
];