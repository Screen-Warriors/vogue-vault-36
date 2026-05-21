import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Flame, Sparkles, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/trending")({
  component: Trending,
  head: () => ({ meta: [{ title: "Trending - #Label" }] }),
});

const premiumEase = [0.22, 1, 0.36, 1] as const;

const trendMovements = [
  {
    title: "Streetwear India",
    momentum: "+42% Growth This Month",
    signal: "Most Saved Trend",
    badge: "Hot Now",
  },
  {
    title: "Indo Western",
    momentum: "Trending Among Creators",
    signal: "Premium Designer Favorite",
    badge: "Rising Fast",
  },
  {
    title: "Minimal Luxe",
    momentum: "Creator Pick",
    signal: "New Luxury Essential",
    badge: "Creator Pick",
  },
  {
    title: "Contemporary Ethnic",
    momentum: "Festival Growth Trend",
    signal: "Luxury Modern Indian",
    badge: "New Movement",
  },
];

function TrendingHero() {
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
        className="pointer-events-none absolute right-[8%] top-44 h-64 w-64 rounded-full bg-accent/8 blur-[110px]"
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
          <p className="eyebrow text-accent mb-4 flex items-center gap-2">
            <TrendingUp className="w-3 h-3" /> This week / Luxury Fashion Intelligence
          </p>
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 bottom-0 h-24 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-3xl"
              animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="relative font-display text-[clamp(2.55rem,7.4vw,7.05rem)] leading-[0.96] tracking-[-0.038em] max-w-4xl">
              What the world is <em className="gradient-text not-italic">wearing.</em>
            </h1>
          </div>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Creator-led signals, limited drops, and cultural luxury movements shaping India's next
            fashion cycle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TrendMovements() {
  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
      >
        <p className="eyebrow text-accent mb-4">Trend Movements</p>
        <h2 className="display-lg max-w-3xl">Creator culture turning into luxury momentum.</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {trendMovements.map((trend, index) => (
          <motion.div
            key={trend.title}
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: index * 0.07, ease: premiumEase }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            className="group relative min-h-[18rem] overflow-hidden rounded-sm border border-border/60 bg-background/30 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-500 hover:border-accent/45 hover:shadow-[0_28px_100px_rgba(0,0,0,0.34),0_0_42px_hsl(var(--accent)/0.1)]"
          >
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute -right-14 top-8 h-32 w-32 rounded-full bg-accent/8 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full min-h-[15rem] flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                  {trend.badge}
                </span>
                <h3 className="mt-5 font-display text-3xl leading-none">{trend.title}</h3>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-foreground">
                  {trend.momentum}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{trend.signal}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Discover <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrendStats() {
  const stats = [
    { value: "120K+", label: "Monthly Discoveries" },
    { value: "1800+", label: "Pieces Trending" },
    { value: "320+", label: "Independent Designers" },
    { value: "50+", label: "New Drops Weekly" },
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

function CultureNotes() {
  const notes = [
    "Luxury fashion no longer starts on runways. It starts with creators.",
    "India's independent designers are defining tomorrow's silhouettes.",
    "Fashion movements now emerge from creator culture.",
  ];

  return (
    <section className="container-luxe py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: premiumEase }}
      >
        <p className="eyebrow text-accent mb-4">Culture Notes</p>
        <h2 className="display-lg max-w-3xl">Where luxury movements begin.</h2>
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

function Trending() {
  const tags = [
    "#avantgarde",
    "#tailoring",
    "#metallic",
    "#noir",
    "#oversized",
    "#brutalist",
    "#couture",
    "#streetwear",
    "#archive",
  ];
  return (
    <div className="pb-20">
      <TrendingHero />
      <TrendMovements />
      <TrendStats />

      <section className="container-luxe py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: premiumEase }}
        >
          <p className="eyebrow text-accent mb-4">Trend Signals</p>
          <h2 className="display-lg max-w-3xl">Browse the movement index.</h2>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((t, index) => (
            <motion.button
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.035, ease: premiumEase }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 text-xs uppercase tracking-[0.24em] hairline rounded-full text-muted-foreground transition-all duration-300 hover:border-accent/70 hover:bg-accent/10 hover:text-foreground hover:shadow-[0_0_30px_hsl(var(--accent)/0.12)]"
            >
              {t}
            </motion.button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {[...products, ...products].map((p, i) => (
            <motion.div
              key={`${p.id}-${i}`}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.035, ease: premiumEase }}
              className="relative"
            >
              {i < 3 && (
                <span className="absolute -top-2 -left-2 z-10 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-sm">
                  {i + 1}
                </span>
              )}
              {i < 5 && (
                <span className="absolute top-3 right-3 z-10 rounded-full border border-accent/30 bg-onyx/55 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-accent backdrop-blur-xl">
                  {
                    ["Hot Now", "Rising Fast", "Creator Pick", "Most Saved", "Limited Drop Trend"][
                      i
                    ]
                  }
                </span>
              )}
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="container-luxe">
        <section className="glass-strong rounded-sm p-10 text-center">
          <Flame className="w-8 h-8 text-accent mx-auto" />
          <h2 className="display-lg mt-4">Hot drop in 03:14:22</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Aria Volkov's "After Hours" capsule releases at midnight CET. Members get 12-hour early
            access.
          </p>
        </section>
      </div>

      <CultureNotes />
    </div>
  );
}
