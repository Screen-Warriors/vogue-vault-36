import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
          {product.tag && (
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.24em] px-3 py-1 glass rounded-full">
              {product.tag}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="absolute top-3 right-3 p-2.5 glass rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-foreground hover:text-background"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button className="w-full py-3 bg-foreground/95 text-background text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">
              Quick view
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground truncate">{product.designer}</p>
            <h3 className="mt-1 text-sm font-medium text-foreground truncate">{product.name}</h3>
          </div>
          <p className="text-sm tabular-nums shrink-0">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
}
