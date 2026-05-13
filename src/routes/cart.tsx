import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, X, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart - #Label" }] }),
});

function CartPage() {
  const [items, setItems] = useState(products.slice(0, 3).map((p) => ({ ...p, qty: 1, size: "M" })));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-20 container-luxe">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="eyebrow mb-3">Your cart</p>
        <h1 className="display-lg">{items.length} pieces / curated by you</h1>
      </motion.div>

      <div className="mt-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-sm p-4 md:p-6 flex gap-4 md:gap-6"
            >
              <div className="w-24 md:w-32 aspect-[3/4] rounded-sm overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{item.designer}</p>
                    <h3 className="font-display text-lg md:text-xl mt-1 truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Size {item.size} / Onyx</p>
                  </div>
                  <button onClick={() => setItems(items.filter((x) => x.id !== item.id))} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center hairline rounded-full">
                    <button onClick={() => setItems(items.map((x) => x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} className="p-2 hover:text-accent"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                    <button onClick={() => setItems(items.map((x) => x.id === item.id ? { ...x, qty: x.qty + 1 } : x))} className="p-2 hover:text-accent"><Plus className="w-3 h-3" /></button>
                  </div>
                  <p className="font-display text-lg tabular-nums">${(item.price * item.qty).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 self-start glass-strong rounded-sm p-6 md:p-8 space-y-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="flex gap-2 hairline rounded-full p-1">
            <Tag className="w-4 h-4 ml-3 self-center text-muted-foreground" />
            <input placeholder="Promo code" className="flex-1 bg-transparent text-sm outline-none px-2" />
            <button className="px-4 py-2 text-xs uppercase tracking-[0.24em] bg-foreground text-background rounded-full">Apply</button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-accent">Complimentary</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="text-muted-foreground">at checkout</span></div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-display text-2xl">
            <span>Total</span><span className="tabular-nums">${total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-3">
            Checkout <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground text-center">Secure checkout / Free returns within 30 days</p>
        </aside>
      </div>

      <section className="mt-24">
        <h2 className="display-lg mb-10">Complete the look</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {products.slice(4, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
