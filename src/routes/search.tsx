import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, collections, designers, products, type Product } from "@/lib/data";
import { normalizeSearch, rankSearchResults } from "@/lib/search";

type PriceRange = "all" | "under-10k" | "10k-15k" | "15k-plus";
type EditFilter =
  | "all"
  | "trending"
  | "newest"
  | "luxury"
  | "streetwear"
  | "ethnicwear"
  | "collections";
type SortMode = "relevance" | "newest" | "popularity" | "price-asc" | "price-desc" | "trending";

const editFilters: { value: EditFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "luxury", label: "Luxury edits" },
  { value: "streetwear", label: "Streetwear" },
  { value: "ethnicwear", label: "Ethnicwear" },
  { value: "collections", label: "Designer collections" },
];

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: "all", label: "All prices" },
  { value: "under-10k", label: "Under Rs. 10k" },
  { value: "10k-15k", label: "Rs. 10k - Rs. 15k" },
  { value: "15k-plus", label: "Rs. 15k+" },
];

const sortOptions: { value: SortMode; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price Low -> High" },
  { value: "price-desc", label: "Price High -> Low" },
  { value: "trending", label: "Trending" },
];

export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search - #Label" }] }),
});

function productMomentum(product: Product) {
  if (product.tag === "Bestseller") return 40;
  if (product.tag === "New") return 34;
  if (product.tag === "Limited") return 30;
  if (product.tag === "Couture") return 28;
  return 18;
}

function matchesPrice(product: Product, range: PriceRange) {
  if (range === "under-10k") return product.price < 10000;
  if (range === "10k-15k") return product.price >= 10000 && product.price <= 15000;
  if (range === "15k-plus") return product.price > 15000;
  return true;
}

function matchesEdit(product: Product, edit: EditFilter) {
  const category = normalizeSearch(product.category);
  const tag = normalizeSearch(product.tag ?? "");

  if (edit === "trending") return product.tag === "Bestseller" || product.tag === "Limited";
  if (edit === "newest") return product.tag === "New";
  if (edit === "luxury") return category.includes("luxe") || category.includes("couture");
  if (edit === "streetwear") return category.includes("streetwear") || category.includes("campus");
  if (edit === "ethnicwear") return category.includes("ethnic") || category.includes("indo");
  return true;
}

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const query = normalizeSearch(q);
  const [category, setCategory] = useState("all");
  const [designer, setDesigner] = useState("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [editFilter, setEditFilter] = useState<EditFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("relevance");

  const rankedDiscovery = useMemo(() => rankSearchResults(query, 32), [query]);
  const rankedProducts = useMemo(() => {
    const rankedProductIds = rankedDiscovery.results
      .filter((result) => result.type === "product")
      .map((result) => result.id);
    const seen = new Set(rankedProductIds);
    const baseProducts = [
      ...rankedProductIds
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product)),
      ...products.filter((product) => !seen.has(product.id)),
    ];

    return baseProducts
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => designer === "all" || product.designerId === designer)
      .filter((product) => matchesPrice(product, priceRange))
      .filter((product) => matchesEdit(product, editFilter))
      .sort((a, b) => {
        if (sortMode === "price-asc") return a.price - b.price;
        if (sortMode === "price-desc") return b.price - a.price;
        if (sortMode === "popularity" || sortMode === "trending") {
          return productMomentum(b) - productMomentum(a);
        }
        if (sortMode === "newest") {
          return products.findIndex((product) => product.id === b.id) - products.findIndex((product) => product.id === a.id);
        }
        return 0;
      });
  }, [category, designer, editFilter, priceRange, rankedDiscovery.results, sortMode]);

  const relatedCollections = rankedDiscovery.results
    .filter((result) => result.type === "collection")
    .slice(0, 3);
  const relatedDesigners = rankedDiscovery.results
    .filter((result) => result.type === "designer")
    .slice(0, 3);
  const hasExactFeeling = rankedDiscovery.mode === "direct";
  const resultTitle = query
    ? hasExactFeeling
      ? `Results for "${q}"`
      : `Similar luxury pieces for "${q}"`
    : "Search #Label";

  return (
    <div className="pt-32 pb-20">
      <section className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-sm border border-border/60 bg-background/30 p-6 shadow-[0_28px_120px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-10"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <p className="eyebrow text-accent mb-4 flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> Fashion discovery
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="display-lg">{resultTitle}</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                {hasExactFeeling
                  ? "Compare every relevant piece, collection, and designer before choosing your next drop."
                  : "No exact match had to become a dead end. Explore the closest premium edits, trending pieces, and creator-led alternatives."}
              </p>
            </div>
            <div className="text-left lg:text-right">
              <p className="font-display text-4xl text-foreground">{rankedProducts.length}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Pieces found
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-luxe mt-8">
        <div className="glass-strong rounded-sm p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4 text-accent" /> Refine discovery
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 rounded-sm border border-border bg-background/50 px-3 text-sm outline-none focus:border-accent"
              aria-label="Category filter"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={designer}
              onChange={(event) => setDesigner(event.target.value)}
              className="h-11 rounded-sm border border-border bg-background/50 px-3 text-sm outline-none focus:border-accent"
              aria-label="Designer filter"
            >
              <option value="all">All designers</option>
              {designers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value as PriceRange)}
              className="h-11 rounded-sm border border-border bg-background/50 px-3 text-sm outline-none focus:border-accent"
              aria-label="Price range"
            >
              {priceRanges.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-11 rounded-sm border border-border bg-background/50 px-3 text-sm outline-none focus:border-accent"
              aria-label="Sort results"
            >
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {editFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setEditFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all ${
                  editFilter === item.value
                    ? "border-accent bg-accent/10 text-foreground shadow-[0_0_30px_hsl(var(--accent)/0.12)]"
                    : "border-border text-muted-foreground hover:border-accent/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe mt-12">
        {!hasExactFeeling && query && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-sm border border-accent/30 bg-accent/10 p-4 text-sm text-muted-foreground"
          >
            No exact matches found. Similar luxury pieces, editor picks, and related creator
            collections are shown below.
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {rankedProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
              {rankedProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              className="relative overflow-hidden rounded-sm border border-border/60 bg-background/30 p-8 text-center backdrop-blur-xl"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <h2 className="font-display text-3xl">No exact matches inside these filters.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Clear a filter to keep exploring similar luxury pieces, trending edits, and designer
                collections.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setDesigner("all");
                  setPriceRange("all");
                  setEditFilter("all");
                  setSortMode("relevance");
                }}
                className="mt-6 rounded-full border border-accent/60 bg-accent/10 px-5 py-3 text-xs uppercase tracking-[0.22em] text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="container-luxe mt-20 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-accent mb-4">Matching collections</p>
          <div className="grid gap-4">
            {(relatedCollections.length ? relatedCollections : collections.slice(0, 3)).map((item) => {
              const collection =
                "designerSlug" in item
                  ? collections.find((entry) => entry.id === item.id)
                  : item;
              if (!collection) return null;
              return (
                <Link
                  key={collection.id}
                  to="/designer/$slug/collections"
                  params={{ slug: collection.designerSlug }}
                  className="group relative overflow-hidden rounded-sm border border-border/60 bg-background/30 p-5 backdrop-blur-xl transition-all hover:border-accent/70 hover:bg-foreground/[0.04]"
                >
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                    {collection.season} / {collection.designerName}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{collection.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {collection.pieces} apparel pieces
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="eyebrow text-accent mb-4">Related designers</p>
          <div className="grid gap-4">
            {(relatedDesigners.length ? relatedDesigners : designers.slice(0, 3)).map((item) => {
              const designerMatch =
                item.type === "designer" ? designers.find((entry) => entry.id === item.id) : item;
              if (!designerMatch) return null;
              return (
                <Link
                  key={designerMatch.id}
                  to="/designers/$id"
                  params={{ id: designerMatch.id }}
                  className="group flex items-center gap-4 rounded-sm border border-border/60 bg-background/30 p-4 backdrop-blur-xl transition-all hover:border-accent/70 hover:bg-foreground/[0.04]"
                >
                  <img
                    src={designerMatch.image}
                    alt=""
                    className="h-16 w-14 rounded-sm object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-xl">{designerMatch.name}</span>
                    <span className="mt-1 block truncate text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {designerMatch.location} / {designerMatch.followers} followers
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
