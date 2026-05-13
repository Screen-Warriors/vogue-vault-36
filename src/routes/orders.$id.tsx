import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Truck, MapPin, Check } from "lucide-react";
import { products } from "@/lib/data";

export const Route = createFileRoute("/orders/$id")({
  component: OrderTracking,
  head: () => ({ meta: [{ title: "Order tracking — Maison X" }] }),
});

function OrderTracking() {
  const stages = [
    { i: Check, t: "Order confirmed", d: "Mon, 12 May · 14:32", done: true },
    { i: Package, t: "Atelier picking", d: "Mon, 12 May · 18:10", done: true },
    { i: Truck, t: "In transit", d: "Tue, 13 May · 09:24", done: true, active: true },
    { i: MapPin, t: "Out for delivery", d: "Est. Wed, 14 May", done: false },
    { i: Check, t: "Delivered", d: "Pending", done: false },
  ];
  const item = products[0];

  return (
    <div className="pt-32 pb-20 container-luxe">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="eyebrow mb-3">Order #MX-1042</p>
        <h1 className="display-lg">Your piece is in <em className="gradient-text not-italic">transit.</em></h1>
        <p className="mt-3 text-muted-foreground">Estimated arrival · Wed, 14 May before 18:00</p>
      </motion.div>

      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-sm p-8">
          <div className="space-y-2">
            {stages.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.done ? "bg-accent text-accent-foreground" : "hairline text-muted-foreground"} ${s.active ? "shadow-glow" : ""}`}>
                    <s.i className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  {i < stages.length - 1 && <div className={`w-px h-12 ${s.done ? "bg-accent" : "bg-border"}`} />}
                </div>
                <div className="pt-2 pb-6">
                  <p className={`font-display text-lg ${s.active ? "text-accent" : ""}`}>{s.t}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="glass rounded-sm p-6 self-start space-y-5">
          <h3 className="font-display text-xl">Shipment</h3>
          <div className="flex gap-4">
            <img src={item.image} alt="" className="w-20 h-24 object-cover rounded-sm" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{item.designer}</p>
              <p className="text-sm mt-1">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1">Size M · Onyx</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Carrier</span><span>DHL Express</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tracking</span><span className="tabular-nums">JD0099283621</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
