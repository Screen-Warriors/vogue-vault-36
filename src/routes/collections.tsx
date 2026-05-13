import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { collections } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({ meta: [{ title: "Collections - #Label" }] }),
});

function CollectionsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow mb-4">#Label India Campaigns</p>
          <h1 className="display-xl max-w-4xl">
            Drops, not <em className="gradient-text not-italic">seasons.</em>
          </h1>
        </motion.div>

        <div className="mt-16 space-y-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/designer/$slug/collections"
                params={{ slug: collection.designerSlug }}
                className="group relative block overflow-hidden rounded-sm aspect-[16/9] md:aspect-[21/9]"
              >
                <img src={collection.image} alt={collection.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
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
    </div>
  );
}
