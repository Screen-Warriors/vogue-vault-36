import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Feather, Sparkles } from "lucide-react";
import { useRef } from "react";
import type { Designer } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function DesignerStoryExperience({ designer, compact = false }: { designer: Designer; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const story = designer.story;

  return (
    <section ref={ref} className={compact ? "container-luxe py-20 md:py-28" : "py-20 md:py-32"}>
      <div className={compact ? "" : "container-luxe"}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid lg:grid-cols-12 gap-10 md:gap-14 items-start"
        >
          <motion.div variants={reveal} className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow text-accent mb-4">Designer Story</p>
            <h2 className="display-lg max-w-2xl">The making of {designer.name.split(" ")[0]}.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{story.journey}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Journey", "Vision", "Identity", "Goals"].map((item) => (
                <div key={item} className="glass rounded-sm p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={reveal} className="lg:col-span-7">
            <div className="relative min-h-[640px] overflow-hidden rounded-sm">
              <motion.img
                src={designer.cover}
                alt={`${designer.name} collection atmosphere`}
                style={{ y: imageY }}
                className="absolute inset-0 h-[115%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <motion.blockquote
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl font-display text-3xl md:text-5xl leading-tight"
                >
                  "{story.quote}"
                </motion.blockquote>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 glass rounded-sm p-8 md:p-12"
          >
            <div className="flex items-center gap-3 text-accent">
              <Feather className="w-4 h-4" />
              <p className="eyebrow text-accent">Designer Manifesto</p>
            </div>
            <div className="mt-8 space-y-6">
              {story.manifesto.map((line, index) => (
                <p key={line} className="font-display text-3xl md:text-5xl leading-tight">
                  <span className="mr-4 text-accent/70 tabular-nums">0{index + 1}</span>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 grid gap-4"
          >
            <div className="hairline rounded-sm p-7">
              <p className="eyebrow text-accent mb-4">Inspired By</p>
              <div className="flex flex-wrap gap-2">
                {story.inspiration.map((item) => (
                  <span key={item} className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="hairline rounded-sm p-7">
              <p className="eyebrow text-accent mb-4">Artistic Identity</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{story.identity}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <img src={designer.image} alt={designer.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
          </motion.div>
          <div>
            <p className="eyebrow text-accent mb-4">Creative Vision</p>
            <h3 className="display-lg">A philosophy in motion.</h3>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{story.vision}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{story.philosophy}</p>
            <div className="mt-8 glass rounded-sm p-6">
              <p className="eyebrow mb-3">Fashion Goal</p>
              <p className="font-display text-2xl leading-snug">{story.goals}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="eyebrow text-accent mb-4">Creative Process</p>
          <div className="grid md:grid-cols-3 gap-4">
            {story.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="glass rounded-sm p-7 group hover:border-accent/40 transition-colors"
              >
                <p className="font-display text-5xl text-accent/80">{step.step}</p>
                <h4 className="mt-8 font-display text-2xl">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                <ArrowRight className="mt-8 w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="flex items-center gap-3 mb-10">
            <Award className="w-4 h-4 text-accent" />
            <p className="eyebrow text-accent">Highlighted Achievements</p>
          </div>
          <div className="relative max-w-4xl">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            {story.achievements.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="relative grid md:grid-cols-[120px_1fr] gap-6 pb-10 pl-14 md:pl-0"
              >
                <div className="absolute left-3 top-2 h-4 w-4 rounded-full border border-accent bg-background shadow-glow" />
                <p className="font-display text-3xl text-accent md:pl-16">{item.year}</p>
                <div className="glass rounded-sm p-6">
                  <h4 className="font-display text-2xl">{item.title}</h4>
                  <p className="mt-2 text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 flex items-center gap-3 text-accent"
          >
            <Sparkles className="w-4 h-4" />
            <p className="eyebrow text-accent">Presented by #Label</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
