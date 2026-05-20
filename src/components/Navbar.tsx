import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, Sparkles, User, X } from "lucide-react";
import type { FormEvent } from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useCart } from "@/hooks/use-cart";
import { normalizeSearch, rankSearchResults, type SearchResult } from "@/lib/search";

const links = [
  { to: "/", label: "Home" },
  { to: "/designers", label: "Designers" },
  { to: "/collections", label: "Collections" },
  { to: "/trending", label: "Trending" },
  { to: "/dashboard", label: "Studio" },
];

const rotatingSearchPrompts = [
  "Search streetwear drops...",
  "Search luxury ethnic...",
  "Search designer collections...",
  "Search fashion creators...",
];

const popularSearches = [
  "#StreetwearIndia",
  "#CampusFashion",
  "#LuxuryEthnic",
  "#IndoWestern",
  "#MinimalLuxe",
  "#FestiveDrop",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [pulse, setPulse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCartCount = useRef(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const { cartCount } = useCart();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const query = normalizeSearch(searchTerm);
  const searchDiscovery = useMemo(() => rankSearchResults(query), [query]);
  const searchResults = searchDiscovery.results;

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setPulse(true);
      const timeout = window.setTimeout(() => setPulse(false), 420);
      prevCartCount.current = cartCount;
      return () => window.clearTimeout(timeout);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    if (!searchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || searchTerm) return;

    const interval = window.setInterval(() => {
      setPromptIndex((current) => (current + 1) % rotatingSearchPrompts.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [searchOpen, searchTerm]);

  function closeSearch() {
    setSearchOpen(false);
    setSearchTerm("");
  }

  function openSearchWithSuggestion(suggestion: string) {
    setSearchTerm(suggestion);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function navigateToResult(result: SearchResult) {
    closeSearch();

    if (result.type === "product") {
      navigate({ to: "/products/$id", params: { id: result.id } });
      return;
    }

    if (result.type === "designer") {
      navigate({ to: "/designers/$id", params: { id: result.id } });
      return;
    }

    if (result.type === "collection") {
      navigate({ to: "/designer/$slug/collections", params: { slug: result.designerSlug } });
      return;
    }

    navigate({ to: "/collections" });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    closeSearch();
    navigate({ to: "/search", search: { q: searchTerm.trim() || query } });
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-border/40 shadow-card"
            : "bg-onyx/70 backdrop-blur-xl border-b border-foreground/10"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="container-luxe flex items-center justify-between h-16 md:h-20"
        >
          <Link to="/" className="flex items-center gap-2 group" aria-label="#Label home">
            <span className="font-display text-xl md:text-2xl tracking-tight">
              <span className="gradient-text">#</span>Label
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors luxe-link"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 hover:bg-secondary rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              to="/wishlist"
              className="p-2.5 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <Link
              to="/cart"
              className="relative p-2.5 hover:bg-secondary rounded-full transition-colors"
              aria-label="Cart"
            >
              <motion.span
                animate={
                  pulse
                    ? { scale: [1, 1.08, 0.98, 1], rotate: [0, 2, -1, 0] }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center justify-center"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </motion.span>
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.div
                    key="cart-count"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-500/20 border border-amber-300/40 backdrop-blur-sm shadow-[0_4px_12px_rgba(251,146,60,0.15)]"
                  >
                    <span className="text-[11px] font-semibold text-amber-50 px-1 tabular-nums">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">{cartCount} items in cart</span>
            </Link>
            <Link
              to="/auth"
              className="p-2.5 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2.5" aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden overflow-hidden glass-strong"
        >
          <ul className="container-luxe py-6 space-y-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  onClick={() => setOpen(false)}
                  to={link.to}
                  className="block py-2 font-display text-2xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.header>
      <div className="h-16 md:h-20" aria-hidden="true" />

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-onyx/88 px-4 pb-12 pt-16 md:pt-24"
            onClick={closeSearch}
          >
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-10 h-52 w-[34rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[84px]"
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
              <div className="absolute inset-0 grain opacity-35" />
            </div>

            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="container-luxe relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.45 }}
                  className="eyebrow text-accent"
                >
                  Trending Now
                </motion.p>
                <button
                  type="button"
                  onClick={closeSearch}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/30 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:border-accent/70 hover:bg-foreground/10 hover:text-foreground hover:shadow-[0_0_32px_hsl(var(--accent)/0.16)]"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>

              <motion.form
                onSubmit={submitSearch}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/35 p-3.5 shadow-[0_22px_90px_rgba(0,0,0,0.46)] backdrop-blur-2xl transition-all duration-500 focus-within:border-accent/70 focus-within:bg-background/50 focus-within:shadow-[0_0_64px_hsl(var(--accent)/0.12)] md:p-4"
                role="search"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-60" />
                <motion.div
                  className="pointer-events-none absolute -inset-x-20 top-0 h-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 blur-xl group-focus-within:opacity-100"
                  animate={{ x: ["-35%", "35%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent shadow-[0_0_24px_hsl(var(--accent)/0.12)] md:h-12 md:w-12">
                    <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                  <div className="relative min-w-0 flex-1">
                    {!searchTerm && (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={rotatingSearchPrompts[promptIndex]}
                          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                          animate={{ opacity: 0.42, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 truncate font-display text-xl text-muted-foreground md:text-4xl"
                        >
                          {rotatingSearchPrompts[promptIndex]}
                        </motion.span>
                      </AnimatePresence>
                    )}
                    <input
                      ref={inputRef}
                      autoFocus
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder=""
                      className="relative z-10 w-full min-w-0 bg-transparent py-2 font-display text-xl text-foreground caret-accent outline-none md:text-4xl"
                      aria-label="Search designers, collections, and apparel"
                    />
                  </div>
                  <motion.span
                    aria-hidden="true"
                    className="hidden h-10 w-px bg-accent/40 shadow-[0_0_20px_hsl(var(--accent)/0.45)] md:block"
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 flex flex-wrap gap-2 md:gap-3"
              >
                {popularSearches.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    onClick={() => openSearchWithSuggestion(suggestion)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.035, duration: 0.38 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full border border-border/60 bg-background/25 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:border-accent/70 hover:bg-accent/10 hover:text-foreground hover:shadow-[0_0_30px_hsl(var(--accent)/0.12)]"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>

              <div className="mt-7">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent/90">
                      {query
                        ? searchDiscovery.mode === "direct"
                          ? "Designer Discovery"
                          : searchDiscovery.mode === "similar"
                            ? "Similar pieces you may like"
                            : "Curated recommendations"
                        : "Curated For Creators"}
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-foreground md:text-3xl">
                      {query
                        ? searchDiscovery.mode === "direct"
                          ? "Live search results"
                          : "Fashion discovery picks"
                        : "Editorial picks"}
                    </h2>
                  </div>
                  {query && (
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {searchResults.length} found
                    </p>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {searchResults.length > 0 ? (
                    <motion.div
                      layout
                      className="grid gap-4 md:grid-cols-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {searchResults.map((result, index) => (
                        <motion.button
                          layout
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => navigateToResult(result)}
                          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          transition={{
                            delay: index * 0.035,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          whileHover={{ y: -5, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/28 p-3 text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:border-accent/70 hover:bg-foreground/[0.06] hover:shadow-[0_0_54px_hsl(var(--accent)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.06] via-transparent to-accent/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="relative flex gap-4">
                            {"image" in result ? (
                              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary md:h-28 md:w-24">
                                <motion.img
                                  src={result.image}
                                  alt=""
                                  className="absolute inset-0 h-full w-full object-cover"
                                  whileHover={{ scale: 1.08 }}
                                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />
                              </div>
                            ) : (
                              <span className="flex h-24 w-20 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[inset_0_0_26px_hsl(var(--accent)/0.08)] md:h-28 md:w-24">
                                <Sparkles className="h-6 w-6" strokeWidth={1.5} />
                              </span>
                            )}
                            <span className="flex min-w-0 flex-1 flex-col justify-center">
                              <span className="mb-2 flex items-center gap-2">
                                <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-accent">
                                  {result.type}
                                </span>
                                <span className="truncate text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                  {result.eyebrow}
                                </span>
                              </span>
                              <span className="block truncate font-display text-xl text-foreground md:text-2xl">
                                {result.title}
                              </span>
                              <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {result.description}
                              </span>
                              <span className="mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                Tap to discover
                              </span>
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                      className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/30 p-8 text-sm text-muted-foreground shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                    >
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                      No matches yet. Try a designer name, collection, or style like Indo-Western.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
