import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/designers", label: "Discover", icon: Search },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/cart", label: "Bag", icon: ShoppingBag },
  { to: "/auth", label: "Me", icon: User },
] as const;

export function MobileTabBar() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border/40">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-3 text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.16em] uppercase">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
