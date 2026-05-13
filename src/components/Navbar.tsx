import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/designers", label: "Designers" },
  { to: "/collections", label: "Collections" },
  { to: "/trending", label: "Trending" },
  { to: "/dashboard", label: "Studio" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong border-b border-border/40" : ""
        }`}
      >
        <nav className="container-luxe flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl md:text-2xl tracking-tight">
              MAISON<span className="gradient-text">.X</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors luxe-link"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 hover:bg-secondary rounded-full transition-colors" aria-label="Search">
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <Link to="/wishlist" className="p-2.5 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex" aria-label="Wishlist">
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="relative p-2.5 hover:bg-secondary rounded-full transition-colors" aria-label="Cart">
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
            </Link>
            <Link to="/auth" className="p-2.5 hover:bg-secondary rounded-full transition-colors hidden md:inline-flex" aria-label="Account">
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2.5" aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden overflow-hidden glass-strong"
        >
          <ul className="container-luxe py-6 space-y-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link onClick={() => setOpen(false)} to={l.to} className="block py-2 font-display text-2xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.header>

      {/* Search overlay */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] glass-strong flex items-start pt-32 justify-center"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="container-luxe w-full" onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-border/60 pb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search designers, collections, pieces…"
                className="flex-1 bg-transparent outline-none text-2xl md:text-4xl font-display placeholder:text-muted-foreground/50"
              />
              <button onClick={() => setSearchOpen(false)} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">Close</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Avant-garde", "Tailoring FW26", "Aria Volkov", "Liquid Silver", "Boots", "Couture"].map((s) => (
                <span key={s} className="text-xs uppercase tracking-[0.2em] px-4 py-2 hairline rounded-full text-muted-foreground hover:text-foreground hover:border-foreground/40 cursor-pointer transition-all">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
