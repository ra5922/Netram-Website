import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { ArrowUp, SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showFilters, setShowFilters] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((data) => active && setProducts(data))
      .catch(() => active && setProducts([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const highestPrice = useMemo(
    () => Math.max(...products.map((p) => p.price_inr), 2000),
    [products]
  );

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const visible = useMemo(() => {
    let result = products
      .filter((p) => activeCategory === "All" || p.category === activeCategory)
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price_inr <= maxPrice);

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price_inr - b.price_inr);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price_inr - a.price_inr);

    return result;
  }, [products, activeCategory, search, sortBy, maxPrice]);

  const resetAll = () => {
    setSearch("");
    setActiveCategory("All");
    setMaxPrice(highestPrice);
    setSortBy("default");
  };

  return (
    <div data-testid="products-page" className="bg-brand-ivory">

      {/* Header */}
      <section className="bg-brand-cream border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <span className="divider-ornament">Our Counter</span>
          <h1
            className="font-serif text-brand-maroon text-5xl sm:text-6xl lg:text-7xl mt-5"
            data-testid="products-title"
          >
            The Mithai Menu
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-brand-text/75 leading-relaxed">
            From syrup-soaked classics to ghee-rich fudges, every sweet here is
            handmade in small batches at our heritage kitchen.
          </p>
        </div>
      </section>

      {/* Sticky filters bar */}
      <section className="border-b border-brand-border bg-brand-ivory sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col gap-4">

          {/* Row 1: Search bar — full width */}
          <div className="relative w-full">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text/35 pointer-events-none"
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search sweets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3 border border-brand-border rounded-sm text-sm text-brand-text bg-brand-cream focus:outline-none focus:border-brand-maroon placeholder:text-brand-text/40 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text/40 hover:text-brand-maroon transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Row 2: Categories + sort + filter toggle + view toggle */}
          <div className="flex flex-wrap items-center gap-2">

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-sm uppercase text-[10px] tracking-[0.22em] font-medium transition-colors border ${
                    activeCategory === cat
                      ? "bg-brand-maroon text-brand-ivory border-brand-maroon"
                      : "bg-transparent text-brand-text/65 border-brand-border hover:border-brand-maroon hover:text-brand-maroon"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-brand-border shrink-0" />

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shrink-0 px-3 py-1.5 border border-brand-border rounded-sm text-[11px] tracking-wide text-brand-text/70 bg-brand-cream focus:outline-none focus:border-brand-maroon cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>

            {/* Filter toggle */}
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-sm text-[11px] tracking-wide font-medium transition-colors ${
                showFilters
                  ? "bg-brand-maroon text-brand-ivory border-brand-maroon"
                  : "border-brand-border text-brand-text/65 hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              <SlidersHorizontal size={12} />
              Filter
            </button>

            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-brand-border shrink-0" />

            {/* View toggle */}
            <div className="shrink-0 flex items-center border border-brand-border rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`px-2.5 py-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-brand-maroon text-brand-ivory"
                    : "text-brand-text/50 hover:text-brand-maroon bg-brand-cream"
                }`}
              >
                <LayoutGrid size={13} />
              </button>
              <div className="w-px h-4 bg-brand-border" />
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`px-2.5 py-1.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-brand-maroon text-brand-ivory"
                    : "text-brand-text/50 hover:text-brand-maroon bg-brand-cream"
                }`}
              >
                <List size={13} />
              </button>
            </div>
          </div>

          {/* Price range filter */}
          {showFilters && (
            <div className="bg-brand-cream border border-brand-border rounded-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-brand-text/70 shrink-0">
                Max Price
              </span>
              <input
                type="range"
                min={0}
                max={highestPrice}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-brand-maroon"
              />
              <span className="text-brand-maroon font-serif text-lg shrink-0">
                ₹{maxPrice}
              </span>
              <button
                type="button"
                onClick={resetAll}
                className="text-xs text-brand-text/50 hover:text-brand-maroon underline shrink-0"
              >
                Reset all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Products section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-sm overflow-hidden border border-brand-border">
                <div className="aspect-[4/5] bg-brand-cream animate-pulse" />
                <div className="p-4 space-y-3 bg-brand-cream">
                  <div className="h-3 w-16 bg-brand-border rounded animate-pulse" />
                  <div className="h-5 w-28 bg-brand-border rounded animate-pulse" />
                  <div className="h-3 w-full bg-brand-border rounded animate-pulse" />
                  <div className="h-4 w-16 bg-brand-border rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-5xl mb-6">🍬</span>
            <h3 className="font-serif text-brand-maroon text-3xl mb-3">
              No sweets found
            </h3>
            <p className="text-brand-text/60 max-w-sm mb-8">
              We couldn't find any mithai matching your search. Try a different
              name or reset the filters.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-maroon text-brand-ivory rounded-sm uppercase text-xs tracking-[0.2em] hover:bg-brand-maroon-dark transition-colors"
            >
              <X size={14} />
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {visible.map((p, i) => (
              <article
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group flex flex-col cursor-pointer opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 35}ms`, animationFillMode: "forwards" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream rounded-sm border border-brand-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)]">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-brand-maroon/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                    <span className="text-brand-ivory text-xs tracking-wider uppercase border border-brand-ivory/50 px-4 py-2 rounded-sm">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-1 truncate">
                        {p.category}
                      </div>
                      <h3 className="font-serif text-xl text-brand-text leading-snug">
                        {p.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-serif text-xl text-brand-maroon">
                        ₹{p.price_inr}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-brand-text/55">
                        {p.unit}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="mt-2 text-brand-text/55 text-xs leading-relaxed line-clamp-2">
                    {p.description || "Handcrafted with pure ghee • No preservatives • Family recipe"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="flex flex-col divide-y divide-brand-border border border-brand-border rounded-sm overflow-hidden">
            {visible.map((p, i) => (
              <article
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group flex items-start gap-5 px-5 py-4 bg-brand-cream hover:bg-brand-ivory transition-colors cursor-pointer opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 25}ms`, animationFillMode: "forwards" }}
              >
                <div className="shrink-0 w-16 h-16 rounded-sm overflow-hidden border border-brand-border bg-brand-ivory">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-brand-gold mb-0.5">
                    {p.category}
                  </div>
                  <h3 className="font-serif text-xl text-brand-text leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-brand-text/55 text-xs leading-relaxed line-clamp-2 max-w-md">
                    {p.description || "Handcrafted with pure ghee, following traditional family recipes passed down for 170 years."}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <div className="font-serif text-xl text-brand-maroon">
                    ₹{p.price_inr}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-brand-text/55">
                    {p.unit}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-brand-maroon text-brand-ivory shadow-lg flex items-center justify-center hover:bg-brand-maroon-dark transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Quick View Modal - Removed "Crafted With" and "Add to Box" */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="max-w-4xl w-full bg-brand-ivory rounded-sm overflow-hidden shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-80 md:h-full">
                <img 
                  src={selectedProduct.image_url} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-text/40 hover:text-brand-maroon transition-colors"
                >
                  <X size={20} />
                </button>
                
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold">
                  {selectedProduct.category}
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl text-brand-maroon mt-2">
                  {selectedProduct.name}
                </h3>
                
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-3xl text-brand-maroon">
                    ₹{selectedProduct.price_inr}
                  </span>
                  <span className="text-sm text-brand-text/50">
                    per {selectedProduct.unit}
                  </span>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-xs tracking-[0.2em] uppercase text-brand-text/60 mb-2">
                    Description
                  </h4>
                  <p className="text-brand-text/80 leading-relaxed">
                    {selectedProduct.description || "Handcrafted with pure ghee and love, following our 170-year-old family recipe passed down through five generations. Made in small batches with no preservatives or artificial colours."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}