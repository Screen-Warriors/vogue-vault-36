import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({ meta: [{ title: "Wishlist - #Label" }] }),
});

function Wishlist() {
  const items = products.slice(0, 6);
  return (
    <div className="pt-32 pb-20 container-luxe">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow mb-3 flex items-center gap-2"><Heart className="w-3 h-3 text-accent fill-accent" /> Saved</p>
          <h1 className="display-xl">Your <em className="gradient-text not-italic">wishlist.</em></h1>
        </div>
        <p className="text-sm text-muted-foreground">{items.length} pieces saved</p>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
