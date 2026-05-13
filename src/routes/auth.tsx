import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({ meta: [{ title: "Sign in — Maison X" }] }),
});

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  return (
    <div className="min-h-screen pt-20 grid lg:grid-cols-2">
      <div className="relative hidden lg:block overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        <div className="absolute bottom-0 p-12">
          <p className="eyebrow text-accent">Member access</p>
          <h2 className="display-lg mt-3">Wear the<br/><em className="gradient-text not-italic">unspoken.</em></h2>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="w-full max-w-md">
          <div className="flex gap-1 p-1 hairline rounded-full mb-8">
            {(["signin","signup"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2.5 text-xs uppercase tracking-[0.24em] rounded-full transition-all ${mode === m ? "bg-foreground text-background" : "text-muted-foreground"}`}>
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="display-lg">{mode === "signin" ? "Welcome back." : "Join Maison X."}</h1>
          <p className="mt-3 text-muted-foreground">{mode === "signin" ? "Continue to your atelier." : "Discover designers worth following."}</p>

          <form className="mt-8 space-y-5">
            {mode === "signup" && <Field label="Full name" />}
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />

            <button type="button" className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-3">
              {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Google", "Apple", "X"].map((p) => (
              <button key={p} className="py-3 text-xs uppercase tracking-[0.24em] hairline rounded-full hover:bg-secondary transition-colors">{p}</button>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground text-center">By continuing you agree to our <Link to="/" className="luxe-link text-foreground">Terms</Link> and <Link to="/" className="luxe-link text-foreground">Privacy</Link>.</p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <input type={type} className="mt-2 w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm transition-colors" />
    </label>
  );
}
