import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, Filter, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { designers, products } from "@/lib/data";
import { DesignerCard } from "@/components/DesignerCard";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const designerPositioning = {
  d1: { category: "Indo-Western Luxury", drops: "18 Drops", followers: "2.4K Followers" },
  d2: { category: "Streetwear India", drops: "24 Drops", followers: "3.1K Followers" },
  d3: { category: "Contemporary Ethnic", drops: "14 Drops", followers: "1.9K Followers" },
} as const;

export const Route = createFileRoute("/designers")({
  component: DesignersPage,
  head: () => ({
    meta: [
      { title: "Designers - #Label" },
      {
        name: "description",
        content: "Discover independent Indian apparel designers shaping modern fashion culture.",
      },
    ],
  }),
});

function DesignersHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 46]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-16 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        animate={{ x: ["-50%", "-47%", "-50%"], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-44 h-56 w-56 rounded-full bg-accent/8 blur-[100px]"
        animate={{ y: [0, 18, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grain opacity-40" />

      <div className="container-luxe relative">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="relative max-w-5xl"
        >
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> India's Independent Designer Discovery
            Platform
          </p>
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 bottom-0 h-24 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-3xl"
              animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="relative font-display text-[clamp(2.55rem,7.2vw,6.9rem)] leading-[0.96] tracking-[-0.038em]">
              Independent Indian{" "}
              <em className="gradient-text relative inline-block not-italic">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 blur-sm"
                  animate={{ x: ["-80%", "90%"], opacity: [0, 0.14, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                />
                labels
              </em>
              , no algorithm.
            </h1>
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            320 verified Indian designers. Hand-picked. Updated weekly. Built for independent
            labels, limited drops, and India's next luxury creator ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "320+ Independent Designers",
    "Limited Edition Drops",
    "Verified Labels",
    "Premium Creator Marketplace",
    "India's Designer Discovery Platform",
  ];

  return (
    <section className="mt-14 border-y border-border/50 bg-onyx/35">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
        className="container-luxe flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-6 text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:justify-between"
      >
        {items.map((item, index) => (
          <span key={item} className="inline-flex items-center gap-4">
            <span className="text-accent">✓</span>
            <span>{item}</span>
            {index < items.length - 1 && (
              <span className="hidden h-px w-7 bg-gradient-to-r from-transparent via-accent/55 to-transparent xl:inline-block" />
            )}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function FeaturedLabelsPreview() {
  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
      >
        <p className="eyebrow text-accent mb-4">Featured Independent Labels</p>
        <h2 className="display-lg max-w-3xl">Creator houses defining India's new luxury.</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {designers.slice(0, 3).map((designer, index) => {
          const meta = designerPositioning[designer.id as keyof typeof designerPositioning];
          return (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: premiumEase }}
              whileHover={{ y: -5, x: 2 }}
              whileTap={{ scale: 0.99 }}
            >
              <Link
                to="/designer/$slug/collections"
                params={{ slug: designer.slug }}
                className="group relative block overflow-hidden rounded-sm border border-border/60 bg-background/30 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-500 hover:border-accent/45 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34),0_0_42px_hsl(var(--accent)/0.1)]"
              >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/20 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-onyx/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent backdrop-blur-xl">
                    <BadgeCheck className="h-3.5 w-3.5 fill-accent/20" /> Verified Designer
                  </span>
                </div>
                <div className="pt-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                    {meta?.category ?? designer.story.identity}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">{designer.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{meta?.drops ?? `${designer.pieces} Pieces`}</span>
                    <span>{meta?.followers ?? `${designer.followers} Followers`}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function EcosystemStats() {
  const stats = [
    { value: "320+", label: "Independent Designers" },
    { value: `${products.length * 225}+`, label: "Fashion Pieces" },
    { value: "50+", label: "New Drops Monthly" },
    { value: "24", label: "Luxury Categories" },
  ];

  return (
    <section className="container-luxe py-14 md:py-20">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: premiumEase }}
            className="relative overflow-hidden rounded-sm border border-border/60 bg-background/25 p-6 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <p className="font-display text-4xl md:text-5xl">{stat.value}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DesignersPage() {
  const [region, setRegion] = useState("All");
  const regions = ["All", "Mumbai", "Delhi", "Jaipur", "Bangalore"];
  const filteredDesigners =
    region === "All"
      ? designers
      : designers.filter((designer) =>
          designer.location.toLowerCase().includes(region.toLowerCase()),
        );

  return (
    <div className="pb-20">
      <DesignersHero />
      <TrustStrip />
      <FeaturedLabelsPreview />
      <EcosystemStats />
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: premiumEase }}
          className="flex flex-wrap items-center gap-3 justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.24em] rounded-full transition-all ${region === r ? "bg-foreground text-background" : "hairline text-muted-foreground hover:text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.24em] hairline rounded-full">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.length > 0 ? (
            filteredDesigners.map((d, i) => <DesignerCard key={d.id} designer={d} index={i} />)
          ) : (
            <div className="lg:col-span-3 rounded-sm border border-border p-10 text-center text-muted-foreground">
              No designers found for “{region}”. Try another region or reset to All.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
