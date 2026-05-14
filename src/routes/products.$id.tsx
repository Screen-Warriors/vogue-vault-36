import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Share2, Truck, ShieldCheck, RotateCcw, Minus, Plus } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} - #Label` },
      { name: "description", content: `${loaderData?.product.name} by ${loaderData?.product.designer}` },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
});

function Countdown() {
  const [t, setT] = useState({ d: 2, h: 14, m: 32, s: 18 });
  useEffect(() => {
    const i = setInterval(() => setT((p) => {
      let { d, h, m, s } = p;
      s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; }
      return { d, h, m, s };
    }), 1000);
    return () => clearInterval(i);
  }, []);
  const items = [["Days", t.d], ["Hrs", t.h], ["Min", t.m], ["Sec", t.s]] as const;
  return (
    <div className="flex gap-3">
      {items.map(([l, v]) => (
        <div key={l} className="glass rounded-sm px-4 py-3 text-center min-w-[64px]">
          <p className="font-display text-2xl tabular-nums">{String(v).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{l}</p>
        </div>
      ))}
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [{ n: "Onyx", c: "oklch(0.1 0 0)" }, { n: "Charcoal", c: "oklch(0.3 0 0)" }, { n: "Ivory", c: "oklch(0.95 0.01 90)" }];
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-24">
      <div className="container-luxe">
        <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground py-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/designers" className="hover:text-foreground">{product.designer}</Link> / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="space-y-3">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-sm hairline">
                  <img src={src} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:sticky lg:top-28 self-start">
            <p className="eyebrow text-accent">Limited Edition · 24/100</p>
            <h1 className="display-lg mt-3">{product.name}</h1>
            <Link to="/designers/$id" params={{ id: product.designerId }} className="mt-2 inline-block text-sm text-muted-foreground luxe-link">by {product.designer}</Link>
            <p className="mt-6 text-3xl font-display tabular-nums">{formatCurrency(product.price)}</p>

            <div className="mt-8 glass rounded-sm p-5">
              <p className="eyebrow mb-3">Drop ends in</p>
              <Countdown />
            </div>

            <div className="mt-8">
              <p className="eyebrow mb-3">Color · {colors[0].n}</p>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button key={c.n} className="w-10 h-10 rounded-full hairline ring-offset-2 ring-offset-background hover:ring-2 hover:ring-accent transition" style={{ background: c.c }} aria-label={c.n} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-3">
                <p className="eyebrow">Size</p>
                <button className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground luxe-link">Size guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`py-3 text-sm hairline rounded-sm transition-all ${size === s ? "bg-foreground text-background border-foreground" : "hover:border-foreground/40"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center hairline rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:text-accent"><Minus className="w-3.5 h-3.5" /></button>
                <span className="w-10 text-center tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:text-accent"><Plus className="w-3.5 h-3.5" /></button>
              </div>
              <button className="flex-1 bg-foreground text-background py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">Add to cart</button>
              <button className="p-4 hairline rounded-full hover:bg-secondary"><Heart className="w-4 h-4" /></button>
              <button className="p-4 hairline rounded-full hover:bg-secondary"><Share2 className="w-4 h-4" /></button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {[
                { i: Truck, l: "Free Express" },
                { i: ShieldCheck, l: "Authenticated" },
                { i: RotateCcw, l: "30d Returns" },
              ].map(({ i: Icon, l }) => (
                <div key={l} className="hairline rounded-sm py-4">
                  <Icon className="w-4 h-4 mx-auto text-accent" strokeWidth={1.5} />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <details className="group">
                <summary className="flex justify-between cursor-pointer py-3 text-sm uppercase tracking-[0.2em]"><span>Description</span><span className="group-open:rotate-45 transition">+</span></summary>
                <p className="text-muted-foreground pb-4">A study in restraint. Hand-tailored in the designer's Berlin atelier from Italian virgin wool. Cut for a relaxed, sculptural silhouette with peak lapels and horn buttons.</p>
              </details>
              <details className="group border-t border-border">
                <summary className="flex justify-between cursor-pointer py-3 text-sm uppercase tracking-[0.2em]"><span>Composition & care</span><span className="group-open:rotate-45 transition">+</span></summary>
                <p className="text-muted-foreground pb-4">100% Italian virgin wool. Lining: 100% cupro. Dry clean only. Made in Germany.</p>
              </details>
              <details className="group border-t border-border">
                <summary className="flex justify-between cursor-pointer py-3 text-sm uppercase tracking-[0.2em]"><span>Reviews · 4.9</span><span className="group-open:rotate-45 transition">+</span></summary>
                <div className="space-y-4 pb-4">
                  {[1,2].map((i) => (
                    <div key={i} className="text-sm">
                      <p className="text-accent">★★★★★</p>
                      <p className="mt-1 text-muted-foreground">"Worth every penny. Construction is impeccable, fits like couture."</p>
                      <p className="text-xs uppercase tracking-[0.2em] mt-1 text-muted-foreground">— Verified buyer</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        <section className="mt-32">
          <h2 className="display-lg mb-10">You may also <em className="gradient-text not-italic">love</em></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
