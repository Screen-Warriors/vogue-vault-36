import indiaHero from "@/assets/india-hero.png";
import indiaDesigner1 from "@/assets/india-designer-1.png";
import indiaDesigner2 from "@/assets/india-designer-2.png";
import indiaDesigner3 from "@/assets/india-designer-3.png";

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

export type DesignerStory = {
  quote: string;
  journey: string;
  background: string;
  inspiration: string[];
  vision: string;
  philosophy: string;
  manifesto: string[];
  process: { step: string; title: string; text: string }[];
  achievements: { year: string; title: string; detail: string }[];
  goals: string;
  identity: string;
};

export type DesignerCollection = {
  id: string;
  designerId: string;
  slug: string;
  title: string;
  season: string;
  description: string;
  image: string;
  tags: string[];
  featuredPieces: string[];
  spotlight: string;
};

export type Designer = {
  id: string;
  slug: string;
  name: string;
  handle: string;
  bio: string;
  location: string;
  image: string;
  cover: string;
  followers: string;
  pieces: number;
  verified: boolean;
  story: DesignerStory;
};

export const products: Product[] = [
  { id: "p1", name: "Bombay Drape Blazer", designer: "Anaya Rao", designerId: "d1", price: 12400, image: indiaDesigner1, category: "Indo-Western", tag: "New" },
  { id: "p2", name: "Delhi Cargo Kurta Set", designer: "Kabir Mehta", designerId: "d2", price: 9800, image: indiaDesigner2, category: "Streetwear India", tag: "Limited" },
  { id: "p3", name: "Jaipur Mirrorwork Co-ord", designer: "Meera Iyer", designerId: "d3", price: 16800, image: indiaDesigner3, category: "Contemporary Ethnic" },
  { id: "p4", name: "Ivory Handloom Overshirt", designer: "Anaya Rao", designerId: "d1", price: 11200, image: indiaDesigner1, category: "Minimal Luxe", tag: "Bestseller" },
  { id: "p5", name: "Midnight Saree Jacket", designer: "Kabir Mehta", designerId: "d2", price: 24500, image: indiaHero, category: "Couture Edit", tag: "Couture" },
  { id: "p6", name: "Indigo Relaxed Angrakha", designer: "Meera Iyer", designerId: "d3", price: 13800, image: indiaDesigner3, category: "Modern Ethnicwear" },
  { id: "p7", name: "Bandra Boxy Tee Jacket", designer: "Anaya Rao", designerId: "d1", price: 7600, image: indiaDesigner1, category: "Oversized Fits" },
  { id: "p8", name: "Bangalore Co-ord Shirt", designer: "Kabir Mehta", designerId: "d2", price: 8900, image: indiaDesigner2, category: "Campus Fashion", tag: "New" },
];

export const designers: Designer[] = [
  {
    id: "d1",
    slug: "anaya-rao",
    name: "Anaya Rao",
    handle: "@anayarawstudio",
    bio: "Mumbai-born Indo-western tailoring shaped by street culture, handloom textures, and the confidence of India's new fashion generation.",
    location: "Mumbai, IN",
    image: indiaDesigner1,
    cover: indiaHero,
    followers: "284K",
    pieces: 47,
    verified: true,
    story: {
      quote: "Indian luxury is not quiet because it is shy. It is quiet because the craft already speaks.",
      journey: "Anaya began by reworking family sarees into structured jackets for college shoots in Bandra, then built a studio where drape, tailoring, and streetwear sit in the same wardrobe.",
      background: "Her Mumbai atelier works with handloom panels, sharp blazer blocks, and saree-inspired movement, creating apparel for creators who move between galleries, gigs, weddings, and late-night cafes.",
      inspiration: ["Bandra street style", "Vintage saree borders", "Mumbai art nights", "Handloom tailoring"],
      vision: "Her creative vision is modern Indian power dressing: relaxed, cinematic, deeply wearable, and rooted in local textile memory.",
      philosophy: "A garment should feel current without erasing where it comes from.",
      manifesto: ["Drape can be streetwear.", "Craft belongs in everyday luxury.", "India's new wardrobe is hybrid by nature."],
      process: [
        { step: "01", title: "Textile Edit", text: "The studio starts with handloom, deadstock silk, and vintage borders sourced from Indian markets." },
        { step: "02", title: "Urban Fitting", text: "Shapes are tested on creators, stylists, and students who live in the clothes all day." },
        { step: "03", title: "Atelier Finish", text: "Each limited piece is pressed, signed, and checked for movement before release." },
      ],
      achievements: [
        { year: "2026", title: "Mumbai Drape Capsule", detail: "Presented an invite-only campaign during fashion week season." },
        { year: "2025", title: "Vogue India Digital Feature", detail: "Profiled as a new voice in Indo-western tailoring." },
        { year: "2024", title: "#Label Launch", detail: "Sold out the first handloom blazer drop in under an hour." },
      ],
      goals: "To build a house where Indian textile memory becomes everyday luxury for a new generation.",
      identity: "Mumbai polish, saree-inspired structure, handloom surfaces, and modern creator culture.",
    },
  },
  {
    id: "d2",
    slug: "kabir-mehta",
    name: "Kabir Mehta",
    handle: "@kabirmehta.in",
    bio: "Delhi streetwear meets modern kurta construction. Oversized fits, cargo details, and festival-ready apparel in limited drops.",
    location: "Delhi, IN",
    image: indiaDesigner2,
    cover: indiaDesigner2,
    followers: "412K",
    pieces: 32,
    verified: true,
    story: {
      quote: "The kurta was always streetwear. I just changed the volume, pockets, and attitude.",
      journey: "Kabir started cutting oversized kurtas for music collectives in Delhi before turning campus fits, cargo utility, and festive layering into a label language.",
      background: "His studio samples in Shahpur Jat and shoots across Delhi rooftops, mixing technical cottons, hand embroidery, and relaxed silhouettes for India's young creative class.",
      inspiration: ["Delhi music scenes", "Campus fashion", "Utility cargos", "Festive street styling"],
      vision: "Kabir imagines Indian streetwear as apparel that can go from a college fest to a Diwali party without feeling costume-like.",
      philosophy: "Comfort is not casual when the proportions are intentional.",
      manifesto: ["Oversized is a silhouette, not a size.", "Festive can be functional.", "Indian menswear needs more ease."],
      process: [
        { step: "01", title: "Street Research", text: "The team studies metro stations, college festivals, and creator shoots before sketching." },
        { step: "02", title: "Pocket Mapping", text: "Utility details are placed around movement, phone use, and all-day wear." },
        { step: "03", title: "Drop Edit", text: "Only the strongest apparel pieces make it into each limited release." },
      ],
      achievements: [
        { year: "2026", title: "Campus Couture Drop", detail: "A limited oversized kurta collection styled by Indian creators." },
        { year: "2025", title: "Delhi Fashion Week Salon", detail: "Recognized for pushing modern Indian streetwear." },
        { year: "2024", title: "Festival Utility Capsule", detail: "Released cargo-inspired festive apparel across India." },
      ],
      goals: "To make Indian streetwear feel premium, functional, and unmistakably local.",
      identity: "Delhi energy, oversized kurtas, cargo structure, and youth-culture confidence.",
    },
  },
  {
    id: "d3",
    slug: "meera-iyer",
    name: "Meera Iyer",
    handle: "@meeraatelier",
    bio: "Jaipur craft and Bangalore minimalism translated into contemporary ethnicwear, co-ords, and modern festive apparel.",
    location: "Jaipur / Bangalore, IN",
    image: indiaDesigner3,
    cover: indiaDesigner3,
    followers: "198K",
    pieces: 28,
    verified: true,
    story: {
      quote: "Craft is not nostalgia. It is the most future-ready thing Indian fashion has.",
      journey: "Meera learned block printing and mirrorwork through artisan clusters around Jaipur, then refined the silhouettes for Bangalore's clean, modern fashion scene.",
      background: "Her atelier works with craft partners and young pattern cutters to create co-ords, modern ethnic sets, and festival pieces that feel light, sharp, and collectible.",
      inspiration: ["Jaipur craft clusters", "Bangalore minimalism", "Mirrorwork details", "Modern festive dressing"],
      vision: "Meera's vision is contemporary ethnicwear that respects handwork while feeling relevant for dinners, concerts, launches, and weddings.",
      philosophy: "The hand should remain visible, but the silhouette should feel like today.",
      manifesto: ["Craft is a future fabric.", "Festive wear can be minimal.", "Indian apparel should move with modern lives."],
      process: [
        { step: "01", title: "Craft Dialogue", text: "Each collection starts with conversations around textile, motif, and technique." },
        { step: "02", title: "Clean Drafting", text: "Traditional details are balanced with relaxed co-ord shapes and easy proportions." },
        { step: "03", title: "Final Handwork", text: "Embroidery, trims, and finishing are completed in small numbered runs." },
      ],
      achievements: [
        { year: "2026", title: "Jaipur After Dark", detail: "A contemporary ethnicwear campaign shot with Indian Gen-Z creators." },
        { year: "2025", title: "Craft Futures Showcase", detail: "Featured for modernizing regional handwork." },
        { year: "2024", title: "Festive Co-ord Sellout", detail: "Her first #Label drop sold across Mumbai, Delhi, and Bangalore." },
      ],
      goals: "To create a modern Indian festive wardrobe that feels premium, wearable, and craft-led.",
      identity: "Jaipur handwork, Bangalore restraint, mirror accents, and contemporary ethnic ease.",
    },
  },
];

export const designerCollections: DesignerCollection[] = [
  {
    id: "c1",
    designerId: "d1",
    slug: "bombay-drape",
    title: "Bombay Drape",
    season: "Festive 26",
    description: "A Mumbai campaign of draped blazers, handloom overshirts, and Indo-western layers built for India's new fashion generation.",
    image: indiaHero,
    tags: ["Indo-Western", "Minimal Luxe", "Urban Essentials"],
    featuredPieces: ["Bombay Drape Blazer", "Ivory Handloom Overshirt", "Bandra Boxy Tee Jacket"],
    spotlight: "The collection turns saree movement into modern tailoring, balancing craft, restraint, and city-night confidence.",
  },
  {
    id: "c2",
    designerId: "d2",
    slug: "campus-couture",
    title: "Campus Couture",
    season: "Drop 26",
    description: "Oversized kurtas, utility cargos, and relaxed co-ords made for college festivals, creator shoots, and Delhi nights.",
    image: indiaDesigner2,
    tags: ["Streetwear India", "Oversized Fits", "Campus Fashion"],
    featuredPieces: ["Delhi Cargo Kurta Set", "Midnight Saree Jacket", "Bangalore Co-ord Shirt"],
    spotlight: "A streetwear drop where the kurta becomes oversized, functional, and sharply Indian.",
  },
  {
    id: "c3",
    designerId: "d3",
    slug: "jaipur-after-dark",
    title: "Jaipur After Dark",
    season: "Festive 26",
    description: "Craft-led co-ords, mirrorwork jackets, and modern ethnicwear for celebrations that feel intimate, urban, and cinematic.",
    image: indiaDesigner3,
    tags: ["Contemporary Ethnic", "Festive Drops", "Modern Ethnicwear"],
    featuredPieces: ["Jaipur Mirrorwork Co-ord", "Indigo Relaxed Angrakha"],
    spotlight: "A premium festive edit that keeps the hand visible and the silhouette easy.",
  },
];

export const collections = designerCollections.map((collection) => {
  const designer = designers.find((d) => d.id === collection.designerId);
  return {
    id: collection.id,
    name: collection.title,
    season: collection.season,
    pieces: collection.featuredPieces.length * 6,
    image: collection.image,
    designerId: collection.designerId,
    designerSlug: designer?.slug ?? collection.designerId,
    designerName: designer?.name ?? "Designer",
    slug: collection.slug,
  };
});

export const categories = [
  "Streetwear India",
  "Indo-Western",
  "Contemporary Ethnic",
  "Oversized Fits",
  "Minimal Luxe",
  "Campus Fashion",
  "Festive Drops",
  "Urban Essentials",
  "Couture Edit",
  "Modern Ethnicwear",
];
