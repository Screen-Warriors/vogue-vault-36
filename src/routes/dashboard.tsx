import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  TrendingUp,
  IndianRupee,
  Package,
  Eye,
  Plus,
  ArrowUpRight,
  X,
  Shirt,
  ShoppingBag,
  Baby,
  Users,
  Sparkles,
  CalendarDays,
  CloudSun,
  Gem,
  Search,
  ChevronDown,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";
import { products, type Product } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Studio - #Label" }] }),
});

const categoryGroups = [
  {
    name: "Men's Clothing",
    icon: Shirt,
    items: [
      "T-Shirts",
      "Shirts",
      "Polo Shirts",
      "Hoodies",
      "Sweatshirts",
      "Jackets",
      "Blazers",
      "Suits",
      "Jeans",
      "Trousers",
      "Shorts",
      "Track Pants",
      "Kurta",
      "Sherwani",
      "Ethnic Sets",
    ],
  },
  {
    name: "Women's Clothing",
    icon: ShoppingBag,
    items: [
      "Tops",
      "T-Shirts",
      "Shirts",
      "Dresses",
      "Gowns",
      "Sarees",
      "Kurtis",
      "Lehengas",
      "Co-Ord Sets",
      "Jumpsuits",
      "Skirts",
      "Jeans",
      "Trousers",
      "Leggings",
      "Jackets",
      "Blazers",
      "Hoodies",
      "Nightwear",
    ],
  },
  {
    name: "Kids Clothing",
    icon: Baby,
    items: ["Boys Wear", "Girls Wear", "Baby Clothing", "School Wear", "Party Wear", "Ethnic Wear"],
  },
  {
    name: "Unisex Clothing",
    icon: Users,
    items: ["Oversized T-Shirts", "Hoodies", "Streetwear", "Joggers", "Cargo Pants"],
  },
  {
    name: "Style-Based Clothing",
    icon: Sparkles,
    items: [
      "Casual Wear",
      "Formal Wear",
      "Streetwear",
      "Vintage Fashion",
      "Korean Fashion",
      "Minimal Fashion",
      "Luxury Fashion",
      "Sustainable Fashion",
      "Athleisure",
      "Party Wear",
    ],
  },
  {
    name: "Occasion-Based Clothing",
    icon: CalendarDays,
    items: [
      "Wedding Wear",
      "Festive Wear",
      "Office Wear",
      "Gym Wear",
      "Vacation Wear",
      "Airport Looks",
      "College Wear",
    ],
  },
  {
    name: "Seasonal Clothing",
    icon: CloudSun,
    items: ["Summer Collection", "Winter Collection", "Monsoon Wear", "Spring Collection"],
  },
  {
    name: "Premium Sections",
    icon: Gem,
    items: [
      "New Arrivals",
      "Trending Now",
      "Best Sellers",
      "Limited Edition",
      "Designer Collection",
      "Celebrity Inspired",
      "Handmade Collection",
    ],
  },
];

type StudioPiece = Product & {
  stock: number;
  sales: number;
  status: "Live" | "Paused";
};

const popularCategories = [
  "Style-Based Clothing / Streetwear",
  "Style-Based Clothing / Luxury Fashion",
  "Occasion-Based Clothing / Wedding Wear",
  "Premium Sections / New Arrivals",
  "Premium Sections / Designer Collection",
];

function CategorySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string[]>([
    categoryGroups[0].name,
    categoryGroups[1].name,
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedCategories = value ? value.split(", ").filter(Boolean) : [];
  const categoryLimit = 3;
  const hasReachedLimit = selectedCategories.length >= categoryLimit;
  const searchTerm = search.trim().toLowerCase();
  const filteredGroups = categoryGroups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.toLowerCase().includes(searchTerm) || group.name.toLowerCase().includes(searchTerm),
      ),
    }))
    .filter((group) => group.items.length > 0);
  const keyboardItems = filteredGroups.flatMap((group) =>
    group.items.map((item) => `${group.name} / ${item}`),
  );

  const updateSelected = (nextSelected: string[]) => {
    onChange(nextSelected.join(", "));
  };

  const toggleCategory = (item: string) => {
    if (selectedCategories.includes(item)) {
      updateSelected(selectedCategories.filter((categoryItem) => categoryItem !== item));
      return;
    }

    if (hasReachedLimit) {
      return;
    }

    updateSelected([...selectedCategories, item]);
  };

  const toggleGroup = (groupName: string) => {
    setExpanded((current) =>
      current.includes(groupName)
        ? current.filter((item) => item !== groupName)
        : [...current, groupName],
    );
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open || keyboardItems.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, keyboardItems.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      toggleCategory(keyboardItems[activeIndex]);
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="space-y-3" onKeyDown={handleKeyboard}>
      <label className="block text-sm uppercase tracking-[0.24em] text-muted-foreground">
        Category
      </label>

      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all hover:border-[#FFFFFF]/60 hover:shadow-[0_0_40px_rgba(209,183,115,0.12)] focus:border-[#FFFFFF] focus:outline-none"
        >
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-sm text-foreground">
              {selectedCategories.length
                ? `${selectedCategories.length} categories selected`
                : "Select premium categories"}
            </p>

            <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {selectedCategories.length
                ? `${selectedCategories
                    .slice(0, 2)
                    .map((item) => item.split(" / ")[1] || item)
                    .join(" / ")}${
                    selectedCategories.length > 2 ? ` +${selectedCategories.length - 2} more` : ""
                  }`
                : "Search, expand, and tag your piece"}
            </p>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d1b773]/30 bg-[#d1b773]/10 text-[#d1b773] transition group-hover:bg-[#d1b773]/20">
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

        {selectedCategories.length > 0 && (
          <motion.div
            layout
            className="mt-4 flex w-full flex-wrap items-center gap-3 overflow-hidden"
          >
            {selectedCategories.map((item) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-full"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(item)}
                  className="group inline-flex max-w-full items-center gap-3 rounded-full border border-[#d1b773]/30 bg-[#d1b773]/10 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-[#ead9a0] transition-all duration-300 hover:border-[#d1b773] hover:bg-[#d1b773]/20"
                >
                  <span
                    className="overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{
                      maxWidth: "220px",
                    }}
                  >
                    {item}
                  </span>

                  <X className="h-3.5 w-3.5 flex-shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={false}
          animate={open ? { opacity: 1, y: 8, height: "auto" } : { opacity: 0, y: -8, height: 0 }}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <div className="relative z-20 mt-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080808]/95 shadow-[0_28px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="sticky top-0 z-10 border-b border-white/10 bg-[#080808]/95 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 focus-within:border-[#d1b773]/70">
                <Search className="h-4 w-4 text-[#d1b773]" />

                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setActiveIndex(0);
                  }}
                  aria-label="Search categories"
                  placeholder="Search categories"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Popular Categories
                  </p>

                  <p className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-[#d1b773]">
                    {selectedCategories.length} selected
                  </p>
                </div>

                <div className="flex max-w-full flex-wrap items-center gap-2 overflow-hidden">
                  {popularCategories.map((item) => {
                    const isSelected = selectedCategories.includes(item);
                    const isDisabled = !isSelected && hasReachedLimit;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => !isDisabled && toggleCategory(item)}
                        disabled={isDisabled}
                        className={`inline-flex max-w-full items-center rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition ${
                          isSelected
                            ? "bg-[#d1b773] text-black"
                            : "border border-white/10 bg-white/[0.04] text-muted-foreground hover:border-[#d1b773]/70 hover:text-[#ead9a0]"
                        } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                        style={{
                          maxWidth: "160px",
                        }}
                      >
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.split(" / ")[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              role="listbox"
              aria-multiselectable="true"
              className="max-h-80 overflow-y-auto p-3 scroll-smooth [scrollbar-color:#d1b773_#101010] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d1b773]/70 [&::-webkit-scrollbar-track]:bg-[#101010]"
            >
              {filteredGroups.map((group) => {
                const Icon = group.icon;
                const isExpanded = expanded.includes(group.name) || Boolean(searchTerm);

                return (
                  <div key={group.name} className="rounded-2xl">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.name)}
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-white/[0.04]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d1b773]/20 bg-[#d1b773]/10 text-[#d1b773]">
                          <Icon className="h-4 w-4" />
                        </span>

                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {group.name}
                          </span>

                          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            {group.items.length} options
                          </span>
                        </span>
                      </span>

                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-90 text-[#d1b773]" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={
                        isExpanded
                          ? {
                              height: "auto",
                              opacity: 1,
                            }
                          : {
                              height: 0,
                              opacity: 0,
                            }
                      }
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-2 px-3 pb-3 sm:grid-cols-2">
                        {group.items.map((item) => {
                          const categoryValue = `${group.name} / ${item}`;

                          const isSelected = selectedCategories.includes(categoryValue);

                          const isActive = keyboardItems[activeIndex] === categoryValue;

                          return (
                            <button
                              key={categoryValue}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() =>
                                !(!isSelected && hasReachedLimit) && toggleCategory(categoryValue)
                              }
                              disabled={!isSelected && hasReachedLimit}
                              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition-all ${
                                isSelected
                                  ? "border-[#d1b773]/70 bg-[#d1b773]/15 text-[#f2dfaa] shadow-[0_0_28px_rgba(209,183,115,0.12)]"
                                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-[#d1b773]/50 hover:text-foreground"
                              } ${isActive ? "ring-1 ring-[#d1b773]/50" : ""} ${
                                !isSelected && hasReachedLimit
                                  ? "cursor-not-allowed opacity-50"
                                  : ""
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                  isSelected
                                    ? "border-[#d1b773] bg-[#d1b773] text-black"
                                    : "border-white/20"
                                }`}
                              >
                                {isSelected && <Check className="h-3.5 w-3.5" />}
                              </span>

                              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [managingPieces, setManagingPieces] = useState(false);
  const [studioPieces, setStudioPieces] = useState<StudioPiece[]>(
    products.slice(0, 5).map((product, index) => ({
      ...product,
      stock: 40 - index * 5,
      sales: 42 - index * 6,
      status: "Live",
    })),
  );
  const [pieceName, setPieceName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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
      imageFiles.length === 0
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
    setImageFiles([]);
    setUploadOpen(false);
  };

  const addPieceImage = (file: File | null | undefined) => {
    if (!file) {
      return;
    }

    setImageFiles((files) => [...files, file]);
  };

  const removePieceImage = (index: number) => {
    setImageFiles((files) => files.filter((_, fileIndex) => fileIndex !== index));
  };

  const updatePieceStock = (pieceId: string, change: number) => {
    setStudioPieces((pieces) =>
      pieces.map((piece) =>
        piece.id === pieceId ? { ...piece, stock: Math.max(0, piece.stock + change) } : piece,
      ),
    );
  };

  const togglePieceStatus = (pieceId: string) => {
    setStudioPieces((pieces) =>
      pieces.map((piece) =>
        piece.id === pieceId
          ? { ...piece, status: piece.status === "Live" ? "Paused" : "Live" }
          : piece,
      ),
    );
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
                        onChange={(event) =>
                          setSizes(event.target.value ? [event.target.value] : [])
                        }
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

                    <CategorySelector value={category} onChange={setCategory} />

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
                      <div className="space-y-3">
                        {imageFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${file.lastModified}-${index}`}
                            className="rounded-3xl border border-border bg-[#090909] p-4"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <p className="truncate text-sm text-foreground">{file.name}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                                  Image {index + 1} added
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePieceImage(index)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-foreground hover:text-background"
                                aria-label={`Remove image ${index + 1}`}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="rounded-3xl border border-border bg-[#090909] p-4">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <p className="truncate text-sm text-foreground">
                                {imageFiles.length ? "Add another image" : "No image selected"}
                              </p>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                                Preferred: 1200 x 1600px
                              </p>
                            </div>
                            <label className="cursor-pointer rounded-full bg-foreground px-4 py-3 text-xs uppercase tracking-[0.24em] text-background transition hover:bg-accent">
                              {imageFiles.length ? "Choose another" : "Choose file"}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  addPieceImage(event.target.files?.[0]);
                                  event.currentTarget.value = "";
                                }}
                                className="sr-only"
                              />
                            </label>
                          </div>
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
          <button
            type="button"
            aria-pressed={managingPieces}
            onClick={() => setManagingPieces((isManaging) => !isManaging)}
            className="text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            {managingPieces ? "Done" : "Manage"} <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="pb-3 font-normal">Piece</th>
                <th className="pb-3 font-normal">Stock</th>
                <th className="pb-3 font-normal">Price</th>
                <th className="pb-3 font-normal">Sales</th>
                <th className="pb-3 font-normal">Status</th>
                {managingPieces && <th className="pb-3 font-normal text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {studioPieces.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="py-4 flex gap-3 items-center">
                    <img src={p.image} alt="" className="w-10 h-12 object-cover rounded-sm" />
                    <span>{p.name}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      {managingPieces && (
                        <button
                          type="button"
                          onClick={() => updatePieceStock(p.id, -1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
                          aria-label={`Reduce stock for ${p.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <span className="w-7 tabular-nums">{p.stock}</span>
                      {managingPieces && (
                        <button
                          type="button"
                          onClick={() => updatePieceStock(p.id, 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
                          aria-label={`Increase stock for ${p.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="tabular-nums">{formatCurrency(p.price)}</td>
                  <td className="tabular-nums">{p.sales}</td>
                  <td>
                    {managingPieces ? (
                      <button
                        type="button"
                        onClick={() => togglePieceStatus(p.id)}
                        className={`text-xs uppercase tracking-[0.2em] transition hover:text-foreground ${
                          p.status === "Live" ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {p.status}
                      </button>
                    ) : (
                      <span
                        className={`text-xs uppercase tracking-[0.2em] ${
                          p.status === "Live" ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {p.status}
                      </span>
                    )}
                  </td>
                  {managingPieces && (
                    <td className="text-right">
                      <Link
                        to="/products/$id"
                        params={{ id: p.id }}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
                      >
                        View <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  )}
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
