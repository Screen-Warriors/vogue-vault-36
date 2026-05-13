import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useState } from "react";
import { designers } from "@/lib/data";
import { DesignerCard } from "@/components/DesignerCard";

export const Route = createFileRoute("/designers")({
  component: DesignersPage,
  head: () => ({ meta: [{ title: "Designers - #Label" }, { name: "description", content: "Discover independent Indian apparel designers shaping modern fashion culture." }] }),
});

function DesignersPage() {
  const [region, setRegion] = useState("All");
  const regions = ["All", "Mumbai", "Delhi", "Jaipur", "Bangalore"];
  return (
    <div className="pt-32 pb-20">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow mb-4">The Indian Marketplace</p>
          <h1 className="display-xl max-w-4xl">Independent Indian <em className="gradient-text not-italic">labels</em>, no algorithm.</h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg">320 verified Indian designers. Hand-picked. Updated weekly.</p>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button key={r} onClick={() => setRegion(r)} className={`px-5 py-2.5 text-xs uppercase tracking-[0.24em] rounded-full transition-all ${region === r ? "bg-foreground text-background" : "hairline text-muted-foreground hover:text-foreground"}`}>{r}</button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.24em] hairline rounded-full">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...designers, ...designers, ...designers].map((d, i) => (
            <DesignerCard key={`${d.id}-${i}`} designer={d} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
