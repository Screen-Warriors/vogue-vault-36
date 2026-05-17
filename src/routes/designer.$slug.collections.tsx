import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { DesignerStoryExperience } from "@/components/DesignerStoryExperience";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { designerCollections, designers, products } from "@/lib/data";

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
      {
        name: "description",
        content: `Explore apparel collections by ${loaderData?.designer.name} on #Label.`,
      },
      { property: "og:image", content: loaderData?.designer.cover },
    ],
  }),
});

function DesignerCollectionsPage() {
  const { designer } = Route.useLoaderData();
  const collections = designerCollections.filter(
    (collection) => collection.designerId === designer.id,
  );
  const designerProducts = products.filter((product) => product.designerId === designer.id);

  return (
    <div>
      <section className="relative h-[88svh] min-h-[620px] overflow-hidden">
        <img
          src={designer.cover}
          alt={designer.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/70 to-onyx/30" />
        <div className="absolute inset-0 grain" />
        <div className="container-luxe relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
          <p className="eyebrow text-accent mb-5">
            {designer.location} / {designer.handle}
          </p>
          <h1 className="display-xl max-w-4xl">{designer.name}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {designer.bio}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {designer.followers} followers
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              {designer.pieces} pieces
            </span>
            <Link
              to="/designer/$slug/story"
              params={{ slug: designer.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-xs uppercase tracking-[0.24em] text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Read designer story
            </Link>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <SectionHeader
          eyebrow="Designer collections"
          title={`Every collection by ${designer.name}`}
        />
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to="/designer/$slug/collections"
              params={{ slug: designer.slug }}
              className="group relative overflow-hidden rounded-sm bg-card"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
              <div className="relative p-8">
                <p className="eyebrow text-accent mb-3">{collection.season}</p>
                <h2 className="display-lg">{collection.title}</h2>
                <p className="mt-4 text-muted-foreground max-w-lg">{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20 md:py-28">
        <SectionHeader eyebrow="Featured garments" title={`Select designs from ${designer.name}`} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {designerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <DesignerStoryExperience designer={designer} compact />
    </div>
  );
}
