import { createFileRoute, notFound } from "@tanstack/react-router";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { designers } from "@/lib/data";

export const Route = createFileRoute("/designer/$slug/collections")({
  component: DesignerCollectionsPage,
  loader: ({ params }) => {
    const designer = designers.find((item) => item.slug === params.slug || item.id === params.slug);
    if (!designer) throw notFound();
    return { designer };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.designer.name ?? "Designer"} Collections - #Label` },
      { name: "description", content: `Explore apparel collections by ${loaderData?.designer.name} on #Label.` },
      { property: "og:image", content: loaderData?.designer.cover },
    ],
  }),
});

function DesignerCollectionsPage() {
  const { designer } = Route.useLoaderData();
  return <CollectionShowcase designer={designer} />;
}
