import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/india-hero.png";
import collection1 from "@/assets/india-designer-1.png";
import collection2 from "@/assets/india-designer-3.png";
import { products, designers, collections, categories } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { DesignerCard } from "@/components/DesignerCard";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "#Label - Luxury Fashion by Independent Designers" },
      { name: "description", content: "Cinematic. Curated. Limited. India's premium storytelling marketplace for modern fashion designers and the consumers who follow them." },
    ],
  }),
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroImg} alt="Editorial fashion" className="w-full h-full object-cover" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/30 to-onyx" />
      <div className="absolute inset-0 grain" />

      <motion.div style={{ opacity }} className="relative z-10 container-luxe h-full flex flex-col justify-end pb-20 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" /> India / Festive 26 / Volume IV
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl max-w-5xl"
        >
          India's next<br/>fashion <em className="gradient-text not-italic">movement.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          Modern Indian designers, limited apparel drops, and fashion-week energy for the country's new style generation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/collections" className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">
            Explore Indian drops
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/designers" className="inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.24em] glass hover:bg-foreground/10 transition-colors">
            Meet the designers
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-px h-10 bg-foreground/30" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Limited Drops", "Indian Designers", "Hand-finished", "Mumbai to Delhi", "Atelier Access", "Curated Weekly"];
  return (
    <div className="border-y border-border/50 py-6 overflow-hidden">
      <div className="flex marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-2xl md:text-4xl px-8 flex items-center gap-8">
            {t} <Star className="w-3 h-3 text-accent fill-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow mb-3">Edit by category</p>
          <h2 className="display-lg">Shop India's new silhouettes.</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.04 }}
          >
            <Link to="/trending" className="group relative block aspect-[4/5] overflow-hidden rounded-sm hairline glass hover:border-accent/50 transition-all">
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <span className="text-xs tabular-nums text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{c}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground group-hover:text-accent transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Spotlight() {
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative aspect-[4/5] lg:aspect-auto overflow-hidden rounded-sm"
        >
          <img src={collection1} alt="Spotlight" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <p className="eyebrow text-accent">Designer Spotlight</p>
            <h3 className="display-lg mt-3">Anaya Rao</h3>
            <p className="mt-3 text-muted-foreground max-w-md">"Indian luxury is craft, confidence, and city energy in one silhouette."</p>
          </div>
        </motion.div>
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}
            className="glass p-8 md:p-10 rounded-sm flex-1"
          >
            <p className="eyebrow mb-4">Why #Label India</p>
            <ul className="space-y-5 text-muted-foreground">
              <li className="flex gap-4"><span className="text-accent tabular-nums">01</span> Direct from Indian designer ateliers - no markup, no middleman.</li>
              <li className="flex gap-4"><span className="text-accent tabular-nums">02</span> Apparel rooted in Indian craft, street culture, and modern silhouettes.</li>
              <li className="flex gap-4"><span className="text-accent tabular-nums">03</span> Limited festive, campus, and streetwear drops. Once gone, gone.</li>
              <li className="flex gap-4"><span className="text-accent tabular-nums">04</span> A studio dashboard built for India's independent fashion creators.</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[{n:"320+",l:"Designers"},{n:"28",l:"Cities"},{n:"4.9",l:"Rating"}].map((s) => (
              <div key={s.l} className="hairline rounded-sm p-5 text-center">
                <p className="font-display text-3xl">{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "#Label feels like it actually understands how young India dresses - festive, street, and premium at once.", a: "Rhea M.", r: "Stylist, Mumbai" },
    { q: "The quality feels designer, but the silhouettes still make sense for Delhi dinners and weekend shoots.", a: "Arjun S.", r: "Collector, Delhi" },
    { q: "As a designer, this platform gave my craft-led label a modern audience without losing the story.", a: "Naina K.", r: "Designer, Jaipur" },
  ];
  return (
    <section className="container-luxe py-20 md:py-28">
      <SectionHeader eyebrow="Voices" title="Worn by the people who matter to us." />
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass p-8 rounded-sm flex flex-col justify-between gap-8"
          >
            <p className="font-display text-xl md:text-2xl leading-snug">"{t.q}"</p>
            <footer>
              <p className="text-sm">{t.a}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.r}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

function Landing() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="container-luxe py-20 md:py-28">
        <SectionHeader eyebrow="Trending now" title="The pieces moving fastest." link="/trending" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <Spotlight />

      <section className="container-luxe py-20 md:py-28">
        <SectionHeader eyebrow="Featured designers" title="India's new houses." link="/designers" />
        <div className="grid md:grid-cols-3 gap-6">
          {designers.map((d, i) => <DesignerCard key={d.id} designer={d} index={i} />)}
        </div>
      </section>

      <Categories />

      <section className="container-luxe py-20 md:py-28">
        <SectionHeader eyebrow="Featured collections" title="Drops, not seasons." link="/collections" />
        <div className="grid md:grid-cols-2 gap-6">
          {collections.slice(0,2).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Link to="/designer/$slug/collections" params={{ slug: c.designerSlug }} className="block group relative aspect-[16/10] overflow-hidden rounded-sm">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="eyebrow">{c.season} / {c.pieces} apparel pieces</p>
                  <h3 className="display-lg mt-2">{c.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container-luxe py-20">
        <div className="relative overflow-hidden rounded-sm">
          <img src={collection2} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-onyx/20" />
          <div className="relative p-10 md:p-20 max-w-2xl">
            <p className="eyebrow text-accent">Are you a designer?</p>
            <h2 className="display-lg mt-4">Build your Indian label on #Label.</h2>
            <p className="mt-4 text-muted-foreground">Zero setup fees. Powerful studio tools. A community of Indian fashion collectors waiting.</p>
            <Link to="/dashboard" className="mt-8 inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">
              Apply to sell <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
