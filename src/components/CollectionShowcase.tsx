import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { designerCollections, products, type Designer } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export function CollectionShowcase({ designer }: { designer: Designer }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const designerCollection = designerCollections.find((collection) => collection.designerId === designer.id) ?? designerCollections[0];
  const designerProducts = products.filter((product) => product.designerId === designer.id);
  const [activeTag, setActiveTag] = useState("All");
  const tags = useMemo(() => ["All", ...designerCollection.tags], [designerCollection.tags]);
  const filteredProducts = activeTag === "All"
    ? designerProducts
    : designerProducts.filter((product) => product.category === activeTag || product.tag === activeTag);

  return (
    <div ref={ref}>
      <section className="relative h-[92svh] min-h-[620px] overflow-hidden">
        <motion.img
          src={designerCollection.image}
          alt={designerCollection.title}
          style={{ y }}
          className="absolute inset-0 h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-onyx/25" />
        <div className="absolute inset-0 grain" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="eyebrow text-accent mb-5 flex items-center gap-3"
          >
            <Calendar className="h-3.5 w-3.5" />
            {designerCollection.season} / {designer.name}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl max-w-5xl"
          >
            {designerCollection.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {designerCollection.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {designerCollection.tags.map((tag) => (
              <span key={tag} className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent mb-4">Collection Notes</p>
            <h2 className="display-lg">A campaign built garment by garment.</h2>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed text-muted-foreground">{designerCollection.spotlight}</p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.24em] transition-all ${
                activeTag === tag ? "bg-foreground text-background" : "hairline text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {(filteredProducts.length ? filteredProducts : designerProducts).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </section>

      <section className="container-luxe pb-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[520px] overflow-hidden rounded-sm"
          >
            <img src={designer.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-10">
              <p className="eyebrow text-accent mb-3">Spotlight</p>
              <h3 className="display-lg">{designerCollection.featuredPieces[0]}</h3>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-sm p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 text-accent">
                <Sparkles className="h-4 w-4" />
                <p className="eyebrow text-accent">Featured Pieces</p>
              </div>
              <div className="mt-10 space-y-6">
                {designerCollection.featuredPieces.map((piece, index) => (
                  <div key={piece} className="flex gap-5 border-t border-border pt-5">
                    <span className="font-display text-3xl text-accent tabular-nums">0{index + 1}</span>
                    <p className="font-display text-2xl md:text-3xl">{piece}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/designer/$slug/story"
              params={{ slug: designer.slug }}
              className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground luxe-link"
            >
              Read the designer story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
