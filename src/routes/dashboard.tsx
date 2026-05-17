import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { TrendingUp, IndianRupee, Package, Eye, Plus, ArrowUpRight, X } from "lucide-react";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Studio - #Label" }] }),
});

function Dashboard() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pieceName, setPieceName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const stats = [
    { label: "Revenue (30d)", value: formatCurrency(48920), change: "+24.6%", icon: IndianRupee },
    { label: "Orders", value: "127", change: "+12", icon: Package },
    { label: "Profile views", value: "12.4K", change: "+38%", icon: Eye },
    { label: "Conversion", value: "4.8%", change: "+0.6", icon: TrendingUp },
  ];

  useEffect(() => {
    if (!uploadOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [uploadOpen]);

  const handleUploadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !pieceName ||
      !price ||
      !stock ||
      sizes.length === 0 ||
      !description ||
      !category ||
      !imageFile
    ) {
      alert("Please complete all upload fields.");
      return;
    }
    alert(`Uploaded ${pieceName} successfully!`);
    setPieceName("");
    setPrice("");
    setStock("");
    setSizes([]);
    setDescription("");
    setCategory("");
    setImageFile(null);
    setUploadOpen(false);
  };

  return (
    <div className="pt-28 pb-20 container-luxe">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-2">#Label Studio / Aria Volkov</p>
          <h1 className="display-lg">Your atelier.</h1>
        </motion.div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.24em] hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Plus className="w-4 h-4" /> Upload piece
        </button>
      </div>

      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 p-4 sm:p-6">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-onyx shadow-2xl">
            <button
              type="button"
              onClick={() => setUploadOpen(false)}
              className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground transition hover:bg-foreground hover:text-background"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex lg:grid lg:grid-cols-[380px_1fr]">
              <div className="hidden lg:flex flex-col justify-between gap-8 bg-[radial-gradient(circle_at_top_left,_rgba(255,212,96,0.12),_transparent_30%),linear-gradient(180deg,_rgba(14,14,15,0.95),_rgba(6,6,7,0.98))] p-10 text-white">
                <div className="space-y-4">
                  <span className="eyebrow text-accent">New collection piece</span>
                  <h2 className="display-lg max-w-xs">Launch a premium product listing.</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Write a strong headline, add sizes, category, and a crisp image to help buyers
                    discover your new piece.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Why this matters
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Complete listings perform better in the studio dashboard and make the drop
                      feel more premium.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                      Tip
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Use the description to call out fabric, fit, and styling details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-background">
                <form onSubmit={handleUploadSubmit} className="flex flex-col">
                  <div className="border-b border-border/80 bg-background/95 backdrop-blur-sm px-8 py-6 md:px-10 md:py-8">
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                      Upload piece
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl mt-4">Add a new design</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      Use the form below to add your next piece to the studio catalog.
                    </p>
                  </div>

                  <div className="px-8 py-8 md:px-10 md:py-8 space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Piece name
                      </label>
                      <input
                        value={pieceName}
                        onChange={(event) => setPieceName(event.target.value)}
                        className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                        placeholder="E.g. Midnight Kurta Jacket"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                          Price
                        </label>
                        <input
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                          className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                          placeholder="₹12,400"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                          Stock
                        </label>
                        <input
                          value={stock}
                          onChange={(event) => setStock(event.target.value)}
                          className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                          placeholder="24"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Available sizes
                      </label>
                      <select
                        value={sizes[0] ?? ""}
                        onChange={(event) => setSizes(event.target.value ? [event.target.value] : [])}
                        className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                      >
                        <option value="" className="bg-background text-muted-foreground">
                          Select a size
                        </option>
                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                          <option key={size} value={size} className="bg-background text-foreground">
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Category
                      </label>
                      <input
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                        placeholder="Streetwear India, Minimal Luxe, etc."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={5}
                        className="w-full rounded-3xl border border-border bg-[#090909] px-4 py-4 text-sm text-foreground outline-none transition focus:border-foreground"
                        placeholder="Describe the piece, materials, fit, and story."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Piece image
                      </label>
                      <div className="rounded-3xl border border-border bg-[#090909] p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <p className="truncate text-sm text-foreground">
                              {imageFile?.name ?? "No image selected"}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                              Preferred: 1200 x 1600px
                            </p>
                          </div>
                          <label className="cursor-pointer rounded-full bg-foreground px-4 py-3 text-xs uppercase tracking-[0.24em] text-background transition hover:bg-accent">
                            Choose file
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/80 bg-background/95 backdrop-blur-sm px-8 py-5 md:px-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-relaxed text-muted-foreground sm:max-w-md">
                        Once uploaded, your new piece will appear in the studio dashboard.
                      </p>
                      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={() => setUploadOpen(false)}
                          className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground sm:w-auto"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-[0.24em] text-background hover:bg-accent transition-colors sm:w-auto"
                        >
                          Upload piece
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="glass rounded-sm p-5"
          >
            <div className="flex justify-between">
              <s.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-xs text-accent">{s.change}</span>
            </div>
            <p className="font-display text-3xl mt-3 tabular-nums">{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mt-1">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-2 glass rounded-sm p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl">Sales — last 14 days</h2>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Daily</span>
          </div>
          <Chart />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass rounded-sm p-6 md:p-8"
        >
          <h2 className="font-display text-2xl mb-6">Recent orders</h2>
          <div className="space-y-4">
            {products.slice(0, 4).map((p, i) => (
              <div key={i} className="flex gap-3 items-center">
                <img src={p.image} alt="" className="w-12 h-14 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                    #MX{1042 + i}
                  </p>
                </div>
                <span className="text-xs text-accent">Shipped</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 glass rounded-sm p-6 md:p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl">Your pieces</h2>
          <button className="text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
            Manage <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="pb-3 font-normal">Piece</th>
                <th className="pb-3 font-normal">Stock</th>
                <th className="pb-3 font-normal">Price</th>
                <th className="pb-3 font-normal">Sales</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p, i) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="py-4 flex gap-3 items-center">
                    <img src={p.image} alt="" className="w-10 h-12 object-cover rounded-sm" />
                    <span>{p.name}</span>
                  </td>
                  <td>{40 - i * 5}</td>
                  <td className="tabular-nums">{formatCurrency(p.price)}</td>
                  <td className="tabular-nums">{42 - i * 6}</td>
                  <td>
                    <span className="text-accent text-xs uppercase tracking-[0.2em]">Live</span>
                  </td>
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
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-gradient-to-t from-accent/30 to-accent rounded-t-sm hover:opacity-80 transition-opacity"
          title={`Day ${i + 1}: ${formatCurrency(v * 100)}`}
        />
      ))}
    </div>
  );
}
