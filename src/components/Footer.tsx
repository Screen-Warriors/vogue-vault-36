import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50 pb-24 md:pb-12">
      <div className="container-luxe pt-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h3 className="display-lg">Stay in the<br/><em className="gradient-text not-italic">atelier.</em></h3>
            <p className="mt-4 text-muted-foreground max-w-md">First access to drops, designer interviews and private events. No noise.</p>
            <form className="mt-8 flex max-w-md hairline rounded-full overflow-hidden glass">
              <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-muted-foreground/60" />
              <button className="px-6 py-4 text-xs uppercase tracking-[0.24em] bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Shop", links: ["New In", "Designers", "Collections", "Trending"] },
              { title: "Studio", links: ["Sell on Maison", "Designer Login", "Atelier Tools", "Pricing"] },
              { title: "Support", links: ["Order Tracking", "Returns", "Sizing", "Contact"] },
              { title: "Maison", links: ["About", "Editorial", "Press", "Careers"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-5">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors luxe-link">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <p className="font-display text-2xl">MAISON<span className="gradient-text">.X</span></p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">© 2026 Maison X · A platform for emerging designers</p>
        </div>
      </div>
    </footer>
  );
}
