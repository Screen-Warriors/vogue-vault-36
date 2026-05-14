import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, Package, Eye, Plus, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Studio - #Label" }] }),
});

function Dashboard() {
  const stats = [
    { label: "Revenue (30d)", value: formatCurrency(48920), change: "+24.6%", icon: IndianRupee },
    { label: "Orders", value: "127", change: "+12", icon: Package },
    { label: "Profile views", value: "12.4K", change: "+38%", icon: Eye },
    { label: "Conversion", value: "4.8%", change: "+0.6", icon: TrendingUp },
  ];

  return (
    <div className="pt-28 pb-20 container-luxe">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow mb-2">#Label Studio / Aria Volkov</p>
          <h1 className="display-lg">Your atelier.</h1>
        </motion.div>
        <button className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors">
          <Plus className="w-4 h-4" /> Upload piece
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="glass rounded-sm p-5"
          >
            <div className="flex justify-between">
              <s.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-xs text-accent">{s.change}</span>
            </div>
            <p className="font-display text-3xl mt-3 tabular-nums">{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-2 glass rounded-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl">Sales — last 14 days</h2>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Daily</span>
          </div>
          <Chart />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="glass rounded-sm p-6 md:p-8">
          <h2 className="font-display text-2xl mb-6">Recent orders</h2>
          <div className="space-y-4">
            {products.slice(0, 4).map((p, i) => (
              <div key={i} className="flex gap-3 items-center">
                <img src={p.image} alt="" className="w-12 h-14 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">#MX{1042 + i}</p>
                </div>
                <span className="text-xs text-accent">Shipped</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 glass rounded-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl">Your pieces</h2>
          <button className="text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2">Manage <ArrowUpRight className="w-3 h-3" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="pb-3 font-normal">Piece</th><th className="pb-3 font-normal">Stock</th><th className="pb-3 font-normal">Price</th><th className="pb-3 font-normal">Sales</th><th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p, i) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="py-4 flex gap-3 items-center"><img src={p.image} alt="" className="w-10 h-12 object-cover rounded-sm" /><span>{p.name}</span></td>
                  <td>{40 - i * 5}</td>
                  <td className="tabular-nums">{formatCurrency(p.price)}</td>
                  <td className="tabular-nums">{42 - i * 6}</td>
                  <td><span className="text-accent text-xs uppercase tracking-[0.2em]">Live</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}

function Chart() {
  const data = [12, 18, 14, 22, 28, 24, 32, 30, 38, 34, 42, 48, 44, 56];
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-gradient-to-t from-accent/30 to-accent rounded-t-sm hover:opacity-80 transition-opacity"
          title={`Day ${i + 1}: ${formatCurrency(v * 100)}`}
        />
      ))}
    </div>
  );
}
