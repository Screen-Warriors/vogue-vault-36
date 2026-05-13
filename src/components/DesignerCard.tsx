import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { Designer } from "@/lib/data";

export function DesignerCard({ designer, index = 0 }: { designer: Designer; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/designers/$id" params={{ id: designer.id }} className="block group">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card">
          <img src={designer.image} alt={designer.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="eyebrow">{designer.location}</p>
            <h3 className="mt-2 font-display text-2xl md:text-3xl flex items-center gap-2">
              {designer.name}
              {designer.verified && <BadgeCheck className="w-5 h-5 text-accent fill-accent/20" />}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-sm">{designer.bio}</p>
            <div className="mt-4 flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span><span className="text-foreground tabular-nums">{designer.followers}</span> followers</span>
              <span><span className="text-foreground tabular-nums">{designer.pieces}</span> pieces</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
