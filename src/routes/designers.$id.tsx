import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck, BookOpen, Instagram, Layers, MapPin } from "lucide-react";
import { DesignerStoryExperience } from "@/components/DesignerStoryExperience";
import { ProductCard } from "@/components/ProductCard";
import { designers, products } from "@/lib/data";

export const Route = createFileRoute("/designers/$id")({
  component: DesignerProfile,
  loader: ({ params }) => {
    const designer = designers.find((d) => d.id === params.id || d.slug === params.id);
    if (!designer) throw notFound();
    return { designer };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.designer.name ?? "Designer"} - #Label` },
      { name: "description", content: loaderData?.designer.bio },
      { property: "og:image", content: loaderData?.designer.cover },
    ],
  }),
});

function DesignerProfile() {
  const { designer } = Route.useLoaderData();
  const designerProducts = products.filter((product) => product.designerId === designer.id);

  return (
    <div>
      <section className="relative h-[84svh] min-h-[540px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={designer.cover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/60 to-onyx/40" />
        <div className="absolute inset-0 grain" />
        <div className="container-luxe relative h-full flex flex-col justify-end pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="eyebrow text-accent"
          >
            Designer / #Label
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="display-xl flex items-center gap-4"
          >
            {designer.name}
            {designer.verified && <BadgeCheck className="w-10 h-10 text-accent fill-accent/20" />}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {designer.location}</span>
            <span className="flex items-center gap-2"><Instagram className="w-4 h-4" /> {designer.handle}</span>
            <span>{designer.followers} followers</span>
            <span>{designer.pieces} apparel pieces</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/designer/$slug/story"
              params={{ slug: designer.slug }}
              className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Read story
            </Link>
            <Link
              to="/designer/$slug/collections"
              params={{ slug: designer.slug }}
              className="inline-flex items-center gap-3 px-7 py-3.5 text-xs uppercase tracking-[0.24em] glass hover:bg-foreground/10 transition-colors"
            >
              <Layers className="w-4 h-4" /> View collection
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <img src={designer.image} alt={designer.name} className="rounded-sm w-full" />
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">About</p>
            <h2 className="display-lg max-w-2xl">A house built on story, silhouette, and obsession.</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">{designer.bio}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{designer.story.background}</p>
          </div>
        </div>
      </section>

      <DesignerStoryExperience designer={designer} compact />

      <section className="container-luxe py-20">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <h2 className="display-lg">The atelier</h2>
          <Link
            to="/designer/$slug/collections"
            params={{ slug: designer.slug }}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground luxe-link"
          >
            View collection
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {designerProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>
    </div>
  );
}
