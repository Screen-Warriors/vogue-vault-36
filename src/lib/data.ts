import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import designer1 from "@/assets/designer-1.jpg";
import designer2 from "@/assets/designer-2.jpg";
import designer3 from "@/assets/designer-3.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";

export type Product = {
  id: string;
  name: string;
  designer: string;
  designerId: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
};

export type Designer = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  location: string;
  image: string;
  cover: string;
  followers: string;
  pieces: number;
  verified: boolean;
};

export const products: Product[] = [
  { id: "p1", name: "Obsidian Tailored Blazer", designer: "Aria Volkov", designerId: "d1", price: 1240, image: product1, category: "Outerwear", tag: "New" },
  { id: "p2", name: "Noir Trench Architect", designer: "Kenji Mori", designerId: "d2", price: 2180, image: product2, category: "Outerwear", tag: "Limited" },
  { id: "p3", name: "Sculpted Heel Boot 04", designer: "Malik Adeyemi", designerId: "d3", price: 980, image: product3, category: "Footwear" },
  { id: "p4", name: "Ivory Structured Tote", designer: "Aria Volkov", designerId: "d1", price: 1620, image: product4, category: "Bags", tag: "Bestseller" },
  { id: "p5", name: "Voltage Silk Gown", designer: "Kenji Mori", designerId: "d2", price: 3450, image: collection2, category: "Dresses", tag: "Couture" },
  { id: "p6", name: "Monolith Wool Coat", designer: "Malik Adeyemi", designerId: "d3", price: 2890, image: collection1, category: "Outerwear" },
  { id: "p7", name: "Phantom Leather Jacket", designer: "Aria Volkov", designerId: "d1", price: 1780, image: product2, category: "Outerwear" },
  { id: "p8", name: "Mercury Cocktail Dress", designer: "Kenji Mori", designerId: "d2", price: 1340, image: product1, category: "Dresses", tag: "New" },
];

export const designers: Designer[] = [
  { id: "d1", name: "Aria Volkov", handle: "@ariavolkov", bio: "Sculptural tailoring rooted in Eastern European brutalism. Each piece is a study in restraint.", location: "Berlin, DE", image: designer2, cover: collection1, followers: "284K", pieces: 47, verified: true },
  { id: "d2", name: "Kenji Mori", handle: "@kenjimori", bio: "Architectural silhouettes meet Tokyo street ritual. Limited drops, no replenishment.", location: "Tokyo, JP", image: designer1, cover: collection2, followers: "412K", pieces: 32, verified: true },
  { id: "d3", name: "Malik Adeyemi", handle: "@malik.studio", bio: "West-African heritage reimagined through avant-garde construction and hand finishing.", location: "Lagos · Paris", image: designer3, cover: collection1, followers: "198K", pieces: 28, verified: true },
];

export const collections = [
  { id: "c1", name: "After Hours", season: "FW 26", pieces: 18, image: collection1 },
  { id: "c2", name: "Liquid Silver", season: "Resort 26", pieces: 12, image: collection2 },
  { id: "c3", name: "Brutalist Romance", season: "FW 26", pieces: 24, image: product2 },
  { id: "c4", name: "Atelier 04", season: "Couture", pieces: 9, image: product1 },
];

export const categories = ["Outerwear", "Dresses", "Tailoring", "Footwear", "Bags", "Accessories", "Knitwear", "Couture"];
