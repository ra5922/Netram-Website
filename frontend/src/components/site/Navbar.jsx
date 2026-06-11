import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Clock } from "lucide-react";
import { SHOP } from "@/lib/shopInfo";

const links = [
  { to: "/", label: "Home", testId: "nav-home" },
  { to: "/products", label: "The Counter", testId: "nav-products" },
  { to: "/about", label: "Heritage", testId: "nav-about" },
  { to: "/contact", label: "Contact", testId: "nav-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Gold top bar */}
      <div className="bg-brand-maroon text-brand-ivory/90 text-[11px] tracking-[0.2em] uppercase">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={11} />
            <span>{SHOP.hours[0].day} · {SHOP.hours[0].time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={11} />
            <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`} className="hover:text-brand-gold transition-colors">
              {SHOP.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl bg-brand-ivory/95 border-b border-brand-border"
        data-testid="site-navbar"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
          <img
  src="https://res.cloudinary.com/duiyvf4hb/image/upload/v1781103834/logo_vbhwqu.png"
  alt="Netram Moolchand And Sons"
  className="h-14 w-14 rounded-full border-2 border-brand-gold/70 object-cover shrink-0"
/>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-brand-maroon text-lg sm:text-xl tracking-wide">
                {SHOP.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold">
                {SHOP.since}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={l.testId}
                className={({ isActive }) =>
                  `text-sm tracking-[0.18em] uppercase font-medium transition-colors ${
                    isActive
                      ? "text-brand-maroon"
                      : "text-brand-text/70 hover:text-brand-maroon"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 text-brand-maroon"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-brand-maroon-deep/60 backdrop-blur-sm" />
          
          {/* Slide-in panel from right */}
          <div
            className="absolute top-0 right-0 h-full w-72 bg-brand-ivory shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
              <span className="font-serif text-brand-maroon text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 w-9 flex items-center justify-center text-brand-maroon"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  data-testid={`${l.testId}-mobile`}
                  className={({ isActive }) =>
                    `py-3 px-4 rounded-sm text-sm tracking-[0.18em] uppercase font-medium transition-colors ${
                      isActive
                        ? "text-brand-maroon bg-brand-cream"
                        : "text-brand-text/70 hover:text-brand-maroon hover:bg-brand-cream"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Panel footer */}
            <div className="px-6 py-6 border-t border-brand-border space-y-2">
              <div className="flex items-center gap-2 text-xs text-brand-text/60">
                <Clock size={12} />
                <span>{SHOP.hours[0].day} · {SHOP.hours[0].time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-text/60">
                <Phone size={12} />
                <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`} className="hover:text-brand-maroon">
                  {SHOP.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}