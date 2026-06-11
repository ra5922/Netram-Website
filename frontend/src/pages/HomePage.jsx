import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp } from "lucide-react";
import { fetchFeatured } from "@/lib/api";

const HERO_IMAGE =
  "https://res.cloudinary.com/duiyvf4hb/image/upload/v1781014692/IMG_4532_ih7q2a.jpg";

// Replace these with your own Cloudinary URLs later
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781014691/IMG_4529_fqri7h.jpg",
  "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781014692/IMG_4532_ih7q2a.jpg",
  "https://res.cloudinary.com/duiyvf4hb/image/upload/v1781104157/Gemini_Generated_Image_o03pk1o03pk1o03p_g2kkqp.png",
  "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781014694/IMG_4507_sfwy7k.jpg",
  "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781014696/IMG_4533_znfsql.jpg",
  "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781014693/IMG_4505_txctvc.jpg",
];

// Fade-in hook
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const [storyRef, storyVisible] = useFadeIn();
  const [featuredRef, featuredVisible] = useFadeIn();
  const [galleryRef, galleryVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  useEffect(() => {
    let active = true;
    fetchFeatured()
      .then((data) => { if (active) { setFeatured(data); setLoading(false); } })
      .catch(() => { if (active) { setFeatured([]); setLoading(false); } });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-testid="home-page">

      {/* Hero */}
      <section
        className="relative h-[88vh] min-h-[560px] grain-overlay overflow-hidden"
        data-testid="hero-section"
      >
        <img
          src={HERO_IMAGE}
          alt="A bountiful display of traditional Indian sweets"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon-deep/55 via-brand-maroon-dark/45 to-brand-maroon-deep/70" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-28">
          <span className="divider-ornament text-brand-gold-soft mb-6">
            Since 1854
          </span>
          <h1 className="font-serif text-brand-ivory text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-3xl">
            Five generations of mithai,
            <span className="italic text-brand-gold-soft"> hand-stirred </span>
            with love.
          </h1>
          <p className="mt-5 max-w-2xl text-brand-ivory/85 text-sm sm:text-lg leading-relaxed">
            Welcome to Netram Molchand And Sons — a family of halwais crafting
            India's most beloved sweets with pure ghee, seasonal milk and
            recipes passed down through five generations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-brand-gold text-brand-maroon-deep px-7 py-3.5 rounded-sm uppercase tracking-[0.2em] text-xs font-medium hover:bg-brand-ivory transition-colors"
            >
              Explore Our Counter
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-brand-ivory/60 text-brand-ivory px-7 py-3.5 rounded-sm uppercase tracking-[0.2em] text-xs font-medium hover:bg-brand-ivory/10 transition-colors"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us strip */}
      <div className="bg-brand-maroon text-brand-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🫙", label: "Pure Desi Ghee" },
            { icon: "🥛", label: "Fresh Local Milk" },
            { icon: "🚫", label: "No onion and garlic" },
            { icon: "👐", label: "Made By Hand" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[11px] tracking-[0.25em] uppercase text-brand-gold-soft">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story */}
      <section
        ref={storyRef}
        className={`bg-brand-cream transition-all duration-700 ${
          storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <span className="divider-ornament">A Family Halwai</span>
            <h2 className="font-serif text-brand-maroon text-4xl sm:text-5xl mt-5 leading-tight">
              The taste of an
              <br />
              <em className="text-brand-gold">unhurried</em> kitchen.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-brand-text/80 text-base leading-relaxed">
            <p>
              Har subah, before the city stirs, copper kadhais are set on slow
              flames. Milk reduces for hours, kesar is gently bloomed in warm
              ghee, and besan is roasted until the entire kitchen smells like
              someone's most beloved tyohaar.
            </p>
            <p>
              We do not chase shortcuts. Our gulab jamun still takes a full day,
              our barfi still rests overnight, and our jalebis are still coiled
              by the same haath that learned the art from their fathers — and
              their fathers before them.
            </p>
            <p>
              Koi machine nahi. Koi artificial colour nahi. Just fire, patience,
              and recipes that have never needed changing.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Sweets */}
      <section
        ref={featuredRef}
        className={`bg-brand-ivory transition-all duration-700 ${
          featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="divider-ornament">Mithai Du Jour</span>
              <h2 className="font-serif text-brand-maroon text-4xl sm:text-5xl mt-4">
                A taste of the shop
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-brand-maroon uppercase tracking-[0.22em] text-xs font-medium border-b border-brand-maroon/40 pb-1 hover:border-brand-maroon"
            >
              View the full counter
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-sm overflow-hidden border border-brand-border">
                    <div className="aspect-[4/5] bg-brand-cream animate-pulse" />
                    <div className="p-5 space-y-3 bg-brand-cream">
                      <div className="h-3 w-16 bg-brand-border rounded animate-pulse" />
                      <div className="h-5 w-32 bg-brand-border rounded animate-pulse" />
                      <div className="h-4 w-20 bg-brand-border rounded animate-pulse" />
                    </div>
                  </div>
                ))
              : featured.map((p) => (
                  <article
                    key={p.id}
                    className="group bg-brand-cream border border-brand-border rounded-sm overflow-hidden hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-1.5">
                        {p.category}
                      </div>
                      <h3 className="font-serif text-2xl text-brand-text">
                        {p.name}
                      </h3>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-brand-maroon font-medium">
                          ₹{p.price_inr}
                        </span>
                        <span className="text-xs text-brand-text/60">{p.unit}</span>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Strip */}
      <section
        ref={galleryRef}
        className={`bg-brand-cream border-y border-brand-border transition-all duration-700 ${
          galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="text-center mb-10">
            <span className="divider-ornament">From Our Kitchen</span>
            <h2 className="font-serif text-brand-maroon text-3xl sm:text-4xl mt-4">
              A glimpse of the shop
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {GALLERY_IMAGES.map((url, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-sm border border-brand-border group"
              >
                <img
                  src={url}
                  alt={`Sweet ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        ref={ctaRef}
        className={`bg-brand-maroon text-brand-ivory transition-all duration-700 ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 text-center">
          <span className="divider-ornament text-brand-gold-soft">
            Step Inside
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl mt-6 leading-tight">
            Festivals, weddings, or a quiet afternoon —
            <br />
            <em className="text-brand-gold-soft">our counter is open.</em>
          </h2>
          <p className="mt-6 text-brand-ivory/80 max-w-2xl mx-auto">
            Drop by the shop, ring us for festive trays, or write to us about a
            bespoke gift hamper. We'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-9 bg-brand-gold text-brand-maroon-deep px-7 py-3.5 rounded-sm uppercase tracking-[0.2em] text-xs font-medium hover:bg-brand-ivory transition-colors"
          >
            Visit Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Back to top button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-brand-maroon text-brand-ivory shadow-lg flex items-center justify-center hover:bg-brand-maroon-dark transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </div>
  );
}