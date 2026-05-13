import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/trending")({
  component: Trending,
  head: () => ({ meta: [{ title: "Trending — Maison X" }] }),
});

function Trending() {
  const tags = ["#avantgarde", "#tailoring", "#metallic", "#noir", "#oversized", "#brutalist", "#couture", "#streetwear", "#archive"];
  return (
    <div className="pt-32 pb-20 container-luxe">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="eyebrow text-accent mb-4 flex items-center gap-2"><TrendingUp className="w-3 h-3" /> This week</p>
        <h1 className="display-xl max-w-4xl">What the world is <em className="gradient-text not-italic">wearing.</em></h1>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button key={t} className="px-5 py-2.5 text-xs uppercase tracking-[0.24em] hairline rounded-full hover:border-accent hover:text-accent transition-all">{t}</button>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {[...products, ...products].map((p, i) => (
          <div key={`${p.id}-${i}`} className="relative">
            {i < 3 && (
              <span className="absolute -top-2 -left-2 z-10 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-sm">
                {i + 1}
              </span>
            )}
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>

      <section className="mt-24 glass-strong rounded-sm p-10 text-center">
        <Flame className="w-8 h-8 text-accent mx-auto" />
        <h2 className="display-lg mt-4">Hot drop in 03:14:22</h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">Aria Volkov's "After Hours" capsule releases at midnight CET. Members get 12-hour early access.</p>
      </section>
    </div>
  );
}
