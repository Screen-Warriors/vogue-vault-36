import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { collections } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({ meta: [{ title: "Collections - #Label" }] }),
});

const premiumEase = [0.22, 1, 0.36, 1] as const;

const featuredCollections = [
  {
    title: "Festive Drop 26",
    pieces: "18 Pieces",
    mood: "Limited Release",
    meta: "Designer Collective",
    slug: collections[0]?.designerSlug,
    image: collections[0]?.image,
  },
  {
    title: "Streetwear India",
    pieces: "24 Pieces",
    mood: "Premium Capsule",
    meta: "Creator Street Culture",
    slug: collections[1]?.designerSlug,
    image: collections[1]?.image,
  },
  {
    title: "Minimal Luxe",
    pieces: "12 Pieces",
    mood: "Curated Essentials",
    meta: "Modern Indian Luxury",
    slug: collections[0]?.designerSlug,
    image: collections[0]?.image,
  },
  {
    title: "Contemporary Ethnic",
    pieces: "16 Pieces",
    mood: "Luxury Modern Indian",
    meta: "Heritage Reimagined",
    slug: collections[2]?.designerSlug,
    image: collections[2]?.image,
  },
];

function CollectionsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 44]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-16 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        animate={{ x: ["-50%", "-47%", "-50%"], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-40 h-64 w-64 rounded-full bg-accent/8 blur-[110px]"
        animate={{ y: [0, 18, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
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
            <Sparkles className="h-3.5 w-3.5 text-accent" /> India's Collection Discovery Platform
          </p>
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 bottom-0 h-24 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-3xl"
              animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="relative font-display text-[clamp(2.55rem,7.2vw,6.9rem)] leading-[0.96] tracking-[-0.038em]">
              Drops, not <em className="gradient-text not-italic">seasons.</em>
            </h1>
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Curated luxury drops from independent Indian creators. Collections as cultural moments,
            not shopping categories.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "Curated Luxury Drops",
    "Limited Edition Collections",
    "Independent Creator Fashion",
    "Premium Designer Marketplace",
    "India's Collection Discovery Platform",
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

function FeaturedDiscovery() {
  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
      >
        <p className="eyebrow text-accent mb-4">Featured Collections</p>
        <h2 className="display-lg max-w-3xl">Curated movements from India's new luxury creators.</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {featuredCollections.map((collection, index) => (
          <motion.div
            key={collection.title}
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: index * 0.07, ease: premiumEase }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
          >
            <Link
              to="/designer/$slug/collections"
              params={{ slug: collection.slug ?? collections[0].designerSlug }}
              className="group relative block min-h-[22rem] overflow-hidden rounded-sm border border-border/60 bg-background/30 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-500 hover:border-accent/45 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34),0_0_42px_hsl(var(--accent)/0.1)]"
            >
              <div className="absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={collection.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-[1500ms] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/75 to-onyx/30" />
              <div className="relative flex min-h-[19rem] flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                    {collection.mood}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-none">{collection.title}</h3>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {collection.pieces} / {collection.meta}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                    Explore <ArrowRight className="h-3 w-3" />
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

function EcosystemStats() {
  const stats = [
    { value: "120+", label: "Luxury Collections" },
    { value: "1800+", label: "Fashion Pieces" },
    { value: "320+", label: "Independent Designers" },
    { value: "50+", label: "Drops Monthly" },
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

function CollectionManifesto() {
  const lines = [
    "Fashion moves faster than tradition.",
    "Creators define trends.",
    "Collections are moments.",
    "Luxury belongs to independent voices.",
  ];

  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: premiumEase }}
        className="relative overflow-hidden rounded-sm border border-border/60 bg-background/25 p-8 shadow-[0_24px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-14"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <motion.div
          aria-hidden="true"
          className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/8 blur-[110px]"
          animate={{ x: [0, -18, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent">Collection Manifesto</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              #Label treats collections as cultural luxury movements: limited drops shaped by
              independent labels, Indian craft, and creator-led discovery.
            </p>
          </div>
          <div className="lg:col-span-8">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: premiumEase }}
                className="border-t border-border/50 py-5 font-display text-3xl leading-tight text-foreground md:text-5xl"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CuratorNotes() {
  const notes = [
    "Streetwear India explores elevated urban silhouettes inspired by India's emerging luxury street culture.",
    "Minimal Luxe celebrates refined essentials built for India's modern creative generation.",
    "Contemporary Ethnic reimagines heritage silhouettes through independent luxury design.",
  ];

  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
      >
        <p className="eyebrow text-accent mb-4">Collection Curator Notes</p>
        <h2 className="display-lg max-w-3xl">Why these movements matter.</h2>
      </motion.div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {notes.map((note, index) => (
          <motion.div
            key={note}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: premiumEase }}
            className="relative overflow-hidden rounded-sm border border-border/60 bg-background/25 p-7 backdrop-blur-xl"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
            <p className="text-[10px] uppercase tracking-[0.22em] text-accent">0{index + 1}</p>
            <p className="mt-6 font-display text-2xl leading-snug">{note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CollectionsPage() {
  return (
    <div className="pb-20">
      <CollectionsHero />
      <TrustStrip />
      <FeaturedDiscovery />
      <EcosystemStats />
      <CollectionManifesto />
      <div className="container-luxe py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: premiumEase }}
        >
          <p className="eyebrow text-accent mb-4">#Label India Campaigns</p>
          <h2 className="display-lg max-w-3xl">Explore the live collection archive.</h2>
        </motion.div>
        <div className="mt-16 space-y-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: index * 0.05, ease: premiumEase }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/designer/$slug/collections"
                params={{ slug: collection.designerSlug }}
                className="group relative block overflow-hidden rounded-sm border border-transparent aspect-[16/9] md:aspect-[21/9] transition-all duration-500 hover:border-accent/40 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34),0_0_42px_hsl(var(--accent)/0.1)]"
              >
                <div className="absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img src={collection.image} alt={collection.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                  <div className="flex items-end justify-between gap-6 flex-wrap">
                    <div>
                      <p className="eyebrow text-accent">
                        {collection.season} / {collection.pieces} apparel pieces / {collection.designerName}
                      </p>
                      <h3 className="display-xl mt-3">{collection.name}</h3>
                    </div>
                    <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground group-hover:text-foreground transition-colors">
                      View collection
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <CuratorNotes />
    </div>
  );
}
