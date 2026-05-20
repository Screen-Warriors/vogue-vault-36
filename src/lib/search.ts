import { categories, collections, designers, products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export type SearchResult =
  | {
      id: string;
      type: "product";
      title: string;
      eyebrow: string;
      description: string;
      image: string;
      searchText: string;
      titleText: string;
      priority: number;
      score?: number;
    }
  | {
      id: string;
      type: "designer";
      title: string;
      eyebrow: string;
      description: string;
      image: string;
      searchText: string;
      titleText: string;
      priority: number;
      score?: number;
    }
  | {
      id: string;
      type: "collection";
      title: string;
      eyebrow: string;
      description: string;
      image: string;
      designerSlug: string;
      searchText: string;
      titleText: string;
      priority: number;
      score?: number;
    }
  | {
      id: string;
      type: "category";
      title: string;
      eyebrow: string;
      description: string;
      searchText: string;
      titleText: string;
      priority: number;
      score?: number;
    };

export function normalizeSearch(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/#/g, "")
    .replace(/[^\w\s-]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeSearch(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

const searchExpansions: Record<string, string[]> = {
  black: ["midnight", "dark", "couture", "minimal", "jacket"],
  wedding: ["festive", "couture", "saree", "ethnic", "mirrorwork"],
  lux: ["luxury", "luxe", "premium", "couture", "designer"],
  luxury: ["luxe", "premium", "couture", "designer"],
  jacket: ["blazer", "overshirt", "saree", "layer"],
  oversized: ["boxy", "relaxed", "streetwear", "campus"],
  modern: ["contemporary", "ethnicwear", "minimal", "indo"],
  ethnic: ["ethnicwear", "festive", "mirrorwork", "angrakha"],
  street: ["streetwear", "campus", "cargo", "boxy"],
  kur: ["kurta", "angrakha", "ethnic"],
};

function expandQueryTokens(tokens: string[]) {
  return [...new Set(tokens.flatMap((token) => [token, ...(searchExpansions[token] ?? [])]))];
}

function levenshteinDistance(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 0; i < a.length; i += 1) {
    const current = [i + 1];

    for (let j = 0; j < b.length; j += 1) {
      current[j + 1] =
        a[i] === b[j]
          ? previous[j]
          : Math.min(previous[j] + 1, current[j] + 1, previous[j + 1] + 1);
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function tokenSimilarity(queryToken: string, candidateToken: string) {
  if (queryToken === candidateToken) return 1;
  if (candidateToken.startsWith(queryToken)) return 0.88;
  if (queryToken.startsWith(candidateToken) && candidateToken.length > 2) return 0.78;
  if (candidateToken.includes(queryToken) || queryToken.includes(candidateToken)) return 0.68;

  const distance = levenshteinDistance(queryToken, candidateToken);
  const longest = Math.max(queryToken.length, candidateToken.length);

  if (longest <= 4 && distance <= 1) return 0.64;
  if (longest <= 8 && distance <= 2) return 0.52;
  if (longest > 8 && distance <= 3) return 0.42;

  return 0;
}

function bestTokenScore(queryToken: string, candidateTokens: string[]) {
  return candidateTokens.reduce(
    (best, candidateToken) => Math.max(best, tokenSimilarity(queryToken, candidateToken)),
    0,
  );
}

export const searchableItems: SearchResult[] = [
  ...products.map((product) => ({
    id: product.id,
    type: "product" as const,
    title: product.name,
    eyebrow: `${product.designer} / ${product.category}`,
    description: `${formatCurrency(product.price)}${product.tag ? ` / ${product.tag}` : ""}`,
    image: product.image,
    titleText: product.name,
    priority: product.tag === "Bestseller" || product.tag === "New" ? 10 : 6,
    searchText: [
      product.name,
      product.designer,
      product.category,
      product.tag,
      "apparel",
      "product",
      "premium",
      "designer",
      "fashion",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  })),
  ...designers.map((designer) => ({
    id: designer.id,
    type: "designer" as const,
    title: designer.name,
    eyebrow: `${designer.location} / ${designer.handle}`,
    description: designer.bio,
    image: designer.image,
    titleText: designer.name,
    priority: designer.verified ? 8 : 5,
    searchText: [
      designer.name,
      designer.handle,
      designer.location,
      designer.bio,
      designer.story.identity,
      "designer",
      "creator",
      "premium",
      "fashion",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  })),
  ...collections.map((collection) => ({
    id: collection.id,
    type: "collection" as const,
    title: collection.name,
    eyebrow: `${collection.season} / ${collection.designerName}`,
    description: `${collection.pieces} apparel pieces`,
    image: collection.image,
    designerSlug: collection.designerSlug,
    titleText: collection.name,
    priority: 7,
    searchText: [
      collection.name,
      collection.season,
      collection.designerName,
      "collection",
      "drop",
      "editorial",
      "premium",
      "fashion",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  })),
  ...categories.map((category) => ({
    id: category,
    type: "category" as const,
    title: category,
    eyebrow: "Category",
    description: "Explore matching collections and apparel",
    titleText: category,
    priority: 4,
    searchText: `${category} category apparel collection`.toLowerCase(),
  })),
];

export function rankSearchResults(query: string, limit = 8) {
  const originalTokens = tokenize(query);
  const expandedTokens = expandQueryTokens(originalTokens);

  if (!originalTokens.length) {
    return {
      results: searchableItems.slice(0, limit),
      mode: "curated" as const,
    };
  }

  const scored = searchableItems
    .map((item) => {
      const titleTokens = tokenize(item.titleText);
      const allTokens = tokenize(item.searchText);
      const compactTitle = normalizeSearch(item.titleText).replace(/\s+/g, "");
      const compactQuery = normalizeSearch(query).replace(/\s+/g, "");

      const directTitleScore =
        compactTitle === compactQuery ? 220 : compactTitle.includes(compactQuery) ? 150 : 0;

      const originalScore = originalTokens.reduce((score, token) => {
        const titleScore = bestTokenScore(token, titleTokens) * 62;
        const metadataScore = bestTokenScore(token, allTokens) * 30;
        return score + Math.max(titleScore, metadataScore);
      }, 0);

      const expansionScore = expandedTokens
        .filter((token) => !originalTokens.includes(token))
        .reduce((score, token) => score + bestTokenScore(token, allTokens) * 18, 0);

      return {
        ...item,
        score: directTitleScore + originalScore + expansionScore + item.priority,
      } as SearchResult;
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const bestScore = scored[0]?.score ?? 0;
  const threshold = originalTokens.length > 1 ? 40 : 28;
  const strongResults = scored.filter((entry) => (entry.score ?? 0) >= threshold).slice(0, limit);

  if (strongResults.length > 0) {
    return {
      results: strongResults,
      mode: bestScore >= threshold * 1.8 ? ("direct" as const) : ("similar" as const),
    };
  }

  return {
    results: scored
      .filter((entry) => entry.type === "product" || entry.type === "collection")
      .slice(0, limit),
    mode: "curated" as const,
  };
}
