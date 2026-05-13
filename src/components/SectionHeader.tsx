import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function SectionHeader({ eyebrow, title, link, linkLabel = "View all" }: { eyebrow?: string; title: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="display-lg max-w-2xl">{title}</h2>
      </motion.div>
      {link && (
        <Link to={link} className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors group shrink-0">
          {linkLabel}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
