import { Link } from "react-router-dom";
import { SHOP } from "@/lib/shopInfo";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-maroon-dark text-brand-ivory mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-5">
          <img
  src="https://res.cloudinary.com/duiyvf4hb/image/upload/v1781103834/logo_vbhwqu.png"
  alt="Netram Molchand And Sons"
  className="h-14 w-14 rounded-full border-2 border-brand-gold/70 object-cover shrink-0"
/>
            <div className="font-serif text-2xl tracking-wide">
              {SHOP.name}
            </div>
          </div>
          <p className="text-brand-ivory/70 text-sm leading-relaxed max-w-sm">
            A heritage halwai household crafting traditional Indian mithai with
            pure ghee, hand-stirred khoya and the same family recipes since
            1854.
          </p>
          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-brand-gold-soft">
            {SHOP.since}
          </p>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-4 text-brand-gold-soft">
            Visit Us
          </h4>
          <ul className="space-y-3 text-sm text-brand-ivory/80">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-brand-gold" />
              <span>
                {SHOP.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={16} className="shrink-0 text-brand-gold" />
              <span>{SHOP.phone}</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="shrink-0 text-brand-gold" />
              <span>{SHOP.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-4 text-brand-gold-soft">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Our Sweets" },
              { to: "/about", label: "Our Heritage" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-brand-ivory/80 hover:text-brand-gold transition-colors tracking-wide"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="font-serif text-lg mt-6 mb-2 text-brand-gold-soft">
            Open
          </h4>
          <ul className="text-xs text-brand-ivory/70 space-y-1">
            {SHOP.hours.map((h) => (
              <li key={h.day}>
                <span className="text-brand-ivory/90">{h.day}</span> · {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-ivory/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-brand-ivory/60 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {SHOP.name}. All rights reserved.
          </span>
          <span className="tracking-[0.25em] uppercase">
            Crafted with ghee, saffron & patience.
          </span>
        </div>
      </div>
    </footer>
  );
}