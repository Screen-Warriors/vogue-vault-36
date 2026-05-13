import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Instagram } from "lucide-react";
import { designers, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/designers/$id")({
  component: DesignerProfile,
  loader: ({ params }) => {
    const designer = designers.find((d) => d.id === params.id);
    if (!designer) throw notFound();
    return { designer };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.designer.name ?? "Designer"} — Maison X` },
      { name: "description", content: loaderData?.designer.bio },
      { property: "og:image", content: loaderData?.designer.cover },
    ],
  }),
});

function DesignerProfile() {
  const { designer } = Route.useLoaderData();
  const ds = products.filter((p) => p.designerId === designer.id);

  return (
    <div>
      <section className="relative h-[80svh] min-h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }}
          src={designer.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-onyx/40" />
        <div className="container-luxe relative h-full flex flex-col justify-end pb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="eyebrow text-accent">Designer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="display-xl flex items-center gap-4">
            {designer.name}
            {designer.verified && <BadgeCheck className="w-10 h-10 text-accent fill-accent/20" />}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {designer.location}</span>
            <span className="flex items-center gap-2"><Instagram className="w-4 h-4" /> {designer.handle}</span>
            <span>{designer.followers} followers</span>
            <span>{designer.pieces} pieces</span>
          </motion.div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <img src={designer.image} alt={designer.name} className="rounded-sm w-full" />
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">About</p>
            <h2 className="display-lg max-w-2xl">A house built on restraint and obsession.</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">{designer.bio}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">Trained at Central Saint Martins, {designer.name.split(" ")[0]} launched their eponymous label in 2022. Each season is produced in runs under 100 units. Every garment is signed.</p>
            <button className="mt-8 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">
              Follow designer
            </button>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="display-lg">The atelier</h2>
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground luxe-link">View archive</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {ds.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="container-luxe py-20">
        <h2 className="display-lg mb-12">Timeline</h2>
        <div className="space-y-8 max-w-3xl">
          {[
            { y: "2026", t: "FW Collection — After Hours", d: "First runway show, Berlin Fashion Week." },
            { y: "2025", t: "Featured in Vogue Italia", d: "8-page editorial spread, September issue." },
            { y: "2024", t: "Launched on Maison X", d: "Sold out first capsule in 47 minutes." },
            { y: "2022", t: "Founded the studio", d: "After 6 years at a Parisian heritage house." },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex gap-8 border-t border-border pt-6"
            >
              <span className="font-display text-3xl text-accent w-24 shrink-0">{e.y}</span>
              <div>
                <h3 className="font-display text-xl">{e.t}</h3>
                <p className="text-muted-foreground mt-1">{e.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
