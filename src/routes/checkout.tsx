import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, CreditCard, Lock, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout - #Label" }] }),
});

function Checkout() {
  const [step, setStep] = useState(1);
  const items = products.slice(0, 3);
  const total = items.reduce((s, p) => s + p.price, 0);
  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="pt-32 pb-20 container-luxe">
      <h1 className="display-lg">Checkout</h1>
      <div className="mt-8 flex items-center gap-3 mb-12">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs hairline ${step > i ? "bg-accent text-accent-foreground border-accent" : step === i + 1 ? "bg-foreground text-background" : "text-muted-foreground"}`}>
              {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs uppercase tracking-[0.24em] ${step === i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 glass-strong rounded-sm p-6 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl flex items-center gap-3"><Truck className="w-5 h-5 text-accent" /> Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {["First name", "Last name"].map((l) => <Field key={l} label={l} />)}
                <div className="md:col-span-2"><Field label="Address" /></div>
                <Field label="City" /><Field label="Postal code" /><Field label="Country" /><Field label="Phone" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl flex items-center gap-3"><CreditCard className="w-5 h-5 text-accent" /> Payment</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><Field label="Card number" /></div>
                <Field label="Cardholder name" /><Field label="Expiry · CVV" />
              </div>
              <div className="hairline rounded-sm p-4 flex items-center gap-3 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-accent" /> Encrypted payment · processed by Stripe
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Review your order</h2>
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 items-center border-b border-border pb-4">
                  <img src={i.image} alt="" className="w-16 h-20 object-cover rounded-sm" />
                  <div className="flex-1"><p className="font-medium">{i.name}</p><p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">{i.designer}</p></div>
                  <p className="tabular-nums">{formatCurrency(i.price)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-between gap-4">
            <button disabled={step === 1} onClick={() => setStep(step - 1)} className="px-6 py-3 text-xs uppercase tracking-[0.24em] hairline rounded-full disabled:opacity-30">Back</button>
            <button onClick={() => setStep(Math.min(3, step + 1))} className="px-8 py-3 text-xs uppercase tracking-[0.24em] bg-foreground text-background rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
              {step === 3 ? "Place order" : "Continue"}
            </button>
          </div>
        </motion.div>

        <aside className="glass rounded-sm p-6 md:p-8 self-start space-y-5">
          <h3 className="font-display text-xl">Summary</h3>
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground truncate pr-3">{i.name}</span>
              <span className="tabular-nums shrink-0">{formatCurrency(i.price)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-4 flex justify-between font-display text-2xl">
            <span>Total</span><span className="tabular-nums">{formatCurrency(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <input className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm transition-colors" />
    </label>
  );
}
