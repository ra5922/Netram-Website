import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";
import { SHOP } from "@/lib/shopInfo";

const INITIAL = { name: "", email: "", phone: "", message: "" };

const inputCls =
  "w-full bg-brand-ivory border border-brand-border rounded-sm px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-maroon transition-colors";

function Field({ label, required, optional, error, children, testId }) {
  return (
    <label className="block" data-testid={testId}>
      <span className="text-[11px] tracking-[0.25em] uppercase text-brand-text/70">
        {label}
        {required && <span className="text-brand-maroon"> *</span>}
        {optional && (
          <span className="text-brand-text/40 normal-case tracking-normal"> (optional)</span>
        )}
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <span className="block mt-1.5 text-xs text-brand-maroon">{error}</span>
      )}
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to reach you.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "That email doesn't look right.";
    if (!form.message.trim() || form.message.trim().length < 5)
      next.message = "A few more words, please.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      toast.success("Message received — we will be in touch shortly.");
      setForm(INITIAL);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        "Could not send your message. Please try again.";
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="bg-brand-ivory">

      {/* Header - Compact & Matching Maroon Color */}
      <section className="relative bg-brand-maroon border-b border-brand-border overflow-hidden">
        {/* Solid gold top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 md:py-16 text-center">
          {/* Ornament with lines */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-9 bg-brand-gold" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-brand-gold">Visit · Call · Write</span>
            <div className="h-px w-9 bg-brand-gold" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
  <span className="text-brand-ivory">Step into</span>{' '}
  <span className="text-brand-gold italic">the shop.</span>
</h1>
          <p className="mt-4 max-w-2xl mx-auto text-brand-ivory/65 text-sm leading-relaxed">
            Festive trays, mithai cakes or simply directions to our counter —
            we'd be delighted to hear from you.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-maroon px-6 py-2.5 rounded-sm uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-brand-ivory transition-colors"
            >
              <Mail size={13} />
              Write to us
            </a>
            
            <a
              href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 border border-brand-gold/50 text-brand-ivory/85 px-6 py-2.5 rounded-sm uppercase tracking-[0.2em] text-[11px] hover:bg-brand-ivory/10 transition-colors"
            >
              <Phone size={13} />
              Call us
            </a>
          </div>

          {/* Stats strip - more compact */}
          <div className="mt-8 pt-6 border-t border-brand-gold/25 flex justify-center divide-x divide-brand-gold/25">
            {[
              { label: "Since",  value: "1854"       },
              { label: "Open",   value: "Daily"      },
              { label: "City",   value: "Prayagraj"  },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-6">
                <div className="text-[8px] tracking-[0.3em] uppercase text-brand-gold/70 mb-1">{stat.label}</div>
                <div className="font-serif text-xl text-brand-ivory leading-none">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: info + form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10 items-start">

        {/* Left: info panel */}
        <div className="lg:col-span-4">
          <div className="bg-brand-cream border border-brand-border rounded-sm divide-y divide-brand-border">

            {/* Address */}
            <div className="flex gap-4 p-5" data-testid="contact-address">
              <div className="h-9 w-9 rounded-full bg-brand-maroon/10 text-brand-maroon flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-gold mb-1.5">Our Address</div>
                {SHOP.addressLines.map((line) => (
                  <span key={line} className="block text-sm text-brand-text/85 leading-relaxed">{line}</span>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 p-5" data-testid="contact-phone">
              <div className="h-9 w-9 rounded-full bg-brand-maroon/10 text-brand-maroon flex items-center justify-center shrink-0 mt-0.5">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-gold mb-1.5">Phone</div>
                <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`} className="block text-sm text-brand-text/85 hover:text-brand-maroon transition-colors">
                  {SHOP.phone}
                </a>
                <a href={`tel:${SHOP.altPhone.replace(/\s/g, "")}`} className="block text-sm text-brand-text/85 hover:text-brand-maroon transition-colors">
                  {SHOP.altPhone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-5" data-testid="contact-email">
              <div className="h-9 w-9 rounded-full bg-brand-maroon/10 text-brand-maroon flex items-center justify-center shrink-0 mt-0.5">
                <Mail size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-gold mb-1.5">Email</div>
                <a href={`mailto:${SHOP.email}`} className="text-sm text-brand-text/85 hover:text-brand-maroon transition-colors break-all">
                  {SHOP.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 p-5" data-testid="contact-hours">
              <div className="h-9 w-9 rounded-full bg-brand-maroon/10 text-brand-maroon flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-brand-gold mb-1.5">Counter Hours</div>
                {SHOP.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 text-sm">
                    <span className="text-brand-text/85">{h.day}</span>
                    <span className="text-brand-text/55">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: form with id for anchor link */}
        <div id="contact-form" className="lg:col-span-8">
          <div className="bg-brand-cream border border-brand-border rounded-sm p-6 md:p-10">
            <span className="divider-ornament">Write to us</span>
            <h2 className="font-serif text-brand-maroon text-2xl sm:text-3xl mt-4">
              A note for the family
            </h2>
            <p className="mt-2 text-brand-text/60 text-sm leading-relaxed">
              We read every message personally and reply within one working day.
            </p>

            <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
              <Field label="Name" required error={errors.name} testId="contact-name">
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  className={inputCls}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email" required error={errors.email} testId="contact-email-field">
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone" optional error={errors.phone} testId="contact-phone-field">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Message" required error={errors.message} testId="contact-message-field">
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  placeholder="How can we help? Festive trays, bulk orders, directions…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* Submit row */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-brand-maroon text-brand-ivory px-7 py-3 rounded-sm uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-brand-maroon-dark transition-colors disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>

                <a
                  href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-text/60 hover:text-brand-maroon transition-colors border-b border-brand-text/20 hover:border-brand-maroon pb-0.5"
                >
                  <Phone size={11} />
                  Or call us directly
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section className="border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="text-center mb-8">
            <span className="divider-ornament">Find Us</span>
            <h2 className="font-serif text-brand-maroon text-2xl sm:text-3xl mt-3">Visit our shop</h2>
          </div>
          <div className="border border-brand-border rounded-sm overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.207163143836!2d81.8521398!3d25.464757099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399aca96ddcd342f%3A0xd021d67ad4b8534f!2sNetram%20Moolchand!5e0!3m2!1sen!2sin!4v1781005196654!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Netram Molchand And Sons Location"
            />
          </div>
        </div>
      </section>

    </div>
  );
}