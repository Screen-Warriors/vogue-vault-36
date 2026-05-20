import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { MouseEvent } from "react";
import type { Designer } from "@/lib/data";

export function DesignerCard({ designer, index = 0 }: { designer: Designer; index?: number }) {
  const navigate = useNavigate();
  const handleCardClick = () =>
    navigate({ to: "/designer/$slug/collections", params: { slug: designer.slug } });
  const handleStoryClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate({ to: "/designer/$slug/story", params: { slug: designer.slug } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, x: 2 }}
      whileTap={{ scale: 0.99 }}
      className="group/card cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-transparent bg-card transition-all duration-500 group-hover/card:border-accent/35 group-hover/card:shadow-[0_24px_80px_rgba(0,0,0,0.32),0_0_42px_hsl(var(--accent)/0.1)]">
        <div className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
        <img
          src={designer.image}
          alt={designer.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow">{designer.location}</p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl flex items-center gap-2">
            {designer.name}
            {designer.verified && <BadgeCheck className="w-5 h-5 text-accent fill-accent/20" />}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-sm">{designer.bio}</p>
          <div className="mt-4 flex flex-col gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <div className="flex items-center gap-5">
              <span>
                <span className="text-foreground tabular-nums">{designer.followers}</span> followers
              </span>
              <span>
                <span className="text-foreground tabular-nums">{designer.pieces}</span> pieces
              </span>
            </div>
            <button
              type="button"
              onClick={handleStoryClick}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-accent hover:text-foreground"
            >
              Designer story
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
