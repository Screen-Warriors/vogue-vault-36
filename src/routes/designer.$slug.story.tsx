import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DesignerStoryExperience } from "@/components/DesignerStoryExperience";
import { designers } from "@/lib/data";

export const Route = createFileRoute("/designer/$slug/story")({
  component: DesignerStoryPage,
  loader: ({ params }) => {
    const designer = designers.find((item) => item.slug === params.slug || item.id === params.slug);
    if (!designer) throw notFound();
    return { designer };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.designer.name ?? "Designer"} Story - #Label` },
      { name: "description", content: loaderData?.designer.story.journey },
      { property: "og:image", content: loaderData?.designer.cover },
    ],
  }),
});

function DesignerStoryPage() {
  const { designer } = Route.useLoaderData();

  return (
    <div>
      <section className="relative h-[92svh] min-h-[620px] overflow-hidden">
        <motion.img
          src={designer.cover}
          alt={`${designer.name} story`}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/55 to-onyx/30" />
        <div className="absolute inset-0 grain" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="eyebrow text-accent mb-5"
          >
            Designer Story / #Label
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl max-w-5xl"
          >
            {designer.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {designer.story.background}
          </motion.p>
        </div>
      </section>

      <DesignerStoryExperience designer={designer} />
    </div>
  );
}
