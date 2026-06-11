// AboutPage.jsx
import { useEffect, useRef } from 'react';

const STORY_IMAGES = {
  hero: "https://images.pexels.com/photos/37219215/pexels-photo-37219215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
  kitchen: "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863800/IMG_7624_cwm2da.png",
  counter: "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780999722/Motichoor-Ladoo.jpg_zkixvj.webp",
  closeup: "https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863794/55048826_crpqvd.gif",
};

const MILESTONES = [
  {
    year: "1854",
    title: "A copper kadhai in Old City",
    body: "Shri Netram begins selling pedas and ladoos from a single brass tray at the corner of Heritage Bazaar — recipes brought from his grandmother's village kitchen.",
  },
  {
    year: "Late 1800s",
    title: "Shri Molchand carries the flame",
    body: "Shri Molchand joins his father's counter, and the signboard is proudly repainted: Netram Molchand And Sons. Festive trays begin travelling to weddings across the district.",
  },
  {
    year: "1920s – 1930s",
    title: "Shri Shyam Bihari steps in",
    body: "The third generation takes charge, expanding the kitchen while staying true to the original recipes. Every sweet remains hand-shaped, every syrup slow-cooked.",
  },
  {
    year: "Mid 1900s",
    title: "Shri Krishna Bihari carries it forward",
    body: "Under the fourth generation, the shop deepens its roots — a trusted name for every festival, wedding and celebration in the city.",
  },
  {
    year: "1987",
    title: "And Sons — five generations strong",
    body: "The fifth and ongoing generation takes the helm, honouring every recipe, every tradition and every relationship built over more than a century.",
  },
];

const VALUES = [
  {
    icon: "🥛",
    title: "Pure Ghee",
    description: "Churned & clarified in-house every morning from local farm butter.",
  },
  {
    icon: "🌿",
    title: "Fresh Daily",
    description: "No leftover milk, no overnight batter — only what's made fresh today.",
  },
  {
    icon: "❌",
    title: "No Onion and garlic",
    description:"Pure vegetarian sweets, traditionally made without onion or garlic. Just authentic taste and holy ingredients.",
  },
  {
    icon: "📜",
    title: "Family Recipe",
    description: "The same secret ratios, passed down hand-to-hand for 170 years.",
  },
];

export default function AboutPage() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('line-drawn');
        });
      },
      { threshold: 0.2 }
    );
    const timelineLine = document.querySelector('.timeline-line-draw');
    if (timelineLine) observer.observe(timelineLine);
    return () => { if (timelineLine) observer.unobserve(timelineLine); };
  }, []);

  return (
    <div data-testid="about-page" className="bg-brand-ivory">

            {/* Hero - Fixed image fit */}
            <section className="relative h-[70vh] min-h-[550px] overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/duiyvf4hb/image/upload/v1781112686/c20ed5077582d06806417237237b7058_sivrqq.jpg"
            alt="Heritage of Netram Molchand And Sons"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon/60 via-brand-maroon/70 to-brand-maroon/80" />
<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 lg:px-10 flex flex-col items-center justify-center text-center">
          <span className="divider-ornament text-brand-gold-soft mb-6 animate-fade-in">Est. 1854</span>
          <h1
            className="font-serif text-brand-ivory text-5xl sm:text-6xl lg:text-7xl leading-[1.05] animate-slide-up"
            data-testid="about-title"
          >
            Our Heritage
          </h1>
          <p className="mt-6 text-brand-ivory/85 max-w-2xl text-base sm:text-lg leading-relaxed animate-slide-up animation-delay-200">
            Five generations of halwais. One kadhai. A thousand afternoons stirred into magic.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-7 bg-brand-cream border border-brand-border rounded-sm p-8 md:p-12 hover:shadow-xl transition-shadow duration-500">
            <span className="divider-ornament">The Beginning</span>
            <h2 className="font-serif text-brand-maroon text-3xl sm:text-4xl mt-5">
              Ek choti si dukaan, ek badi pehchaan.
            </h2>
            <p className="mt-6 text-brand-text/80 leading-relaxed">
              It began simply — Shri Netram, a small shop, and an unshakeable belief that mithai made
              with pure ghee and honest hands needs no advertisement. Word travelled through the gullies
              of the Old City faster than any signboard could. Neighbours became regulars, regulars became family.
            </p>
            <p className="mt-4 text-brand-text/80 leading-relaxed">
              Generation after generation, the dukaan grew — not by chasing scale, but by earning trust.
              Shri Molchand widened the counter. Shri Shyaam Bihari strengthened the kitchen. Shri Krishna
              Bihari built the relationships. And the fifth generation carries it all forward today.
            </p>
          </div>
          <div className="md:col-span-5 rounded-sm overflow-hidden border border-brand-border group">
            <img src={STORY_IMAGES.kitchen} alt="Slow-cooked sweets in a copper kadhai"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="md:col-span-5 rounded-sm overflow-hidden border border-brand-border group">
            <img src={STORY_IMAGES.counter} alt="A heritage sweet counter"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="md:col-span-7 bg-brand-maroon text-brand-ivory rounded-sm p-8 md:p-12 hover:shadow-xl transition-shadow duration-500">
            <span className="divider-ornament text-brand-gold-soft">Our Promise</span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-5">
              Pure ghee. Local milk.<br />
              <em className="text-brand-gold-soft">Recipes that haven't changed.</em>
            </h2>
            <p className="mt-6 text-brand-ivory/85 leading-relaxed">
              We make ghee in-house every morning. Our milk arrives from farms within a few kilometres.
              We use no artificial colours, no synthetic flavours, no shortcuts. Some sweets take a day;
              some take two. We'd rather wait.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-br from-brand-cream to-white py-24 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="divider-ornament">The Netram Way</span>
            <h2 className="font-serif text-brand-maroon text-4xl sm:text-5xl mt-5">Crafted with conviction</h2>
            <p className="text-brand-text/70 max-w-2xl mx-auto mt-4">
              Four pillars that have held up our legacy for five generations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, idx) => (
              <div
                key={value.title}
                className="bg-white rounded-sm p-8 text-center border border-brand-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl text-brand-maroon mb-2">{value.title}</h3>
                <p className="text-brand-text/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <div className="bg-brand-maroon py-20 md:py-28 text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <p className="font-serif text-brand-gold-soft text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight italic">
            "Ek kadhai, paanch peedhiyaan, ek hi vaada."
          </p>
          <p className="text-brand-ivory/60 text-sm tracking-wider mt-6 uppercase">
            — The taste of trust since 1854
          </p>
        </div>
      </div>

      {/* ── Compact Timeline ── */}
      <section className="bg-brand-cream py-16 border-b border-brand-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="divider-ornament">Five Generations</span>
            <h2 className="font-serif text-brand-maroon text-4xl sm:text-5xl mt-5">A timeline of mithai</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              ref={timelineRef}
              className="timeline-line-draw absolute left-[7px] top-2 bottom-2 w-px bg-brand-gold/40 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />

            <div className="space-y-0">
              {MILESTONES.map((m, idx) => (
                <div key={m.year} className="relative flex gap-6 group">
                  {/* Dot */}
                  <div className="relative shrink-0 mt-5">
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-brand-gold bg-brand-cream group-hover:bg-brand-gold transition-colors duration-300 z-10 relative" />
                  </div>

                  {/* Card */}
                  <div className={`pb-7 flex-1 ${idx === MILESTONES.length - 1 ? 'pb-0' : ''}`}>
                    <div className="bg-white border border-brand-border rounded-sm px-5 py-4 hover:shadow-md transition-shadow duration-300">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-brand-gold mb-1">
                        {m.year}
                      </div>
                      <h3 className="font-serif text-lg text-brand-maroon leading-snug mb-1">
                        {m.title}
                      </h3>
                      <p className="text-brand-text/70 text-sm leading-relaxed">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 rounded-sm overflow-hidden border border-brand-border group">
          <img src={STORY_IMAGES.closeup} alt="A jewel-like Indian sweet"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="md:col-span-6">
          <span className="divider-ornament">A Note From The Family</span>
          <h2 className="font-serif text-brand-maroon text-4xl mt-5 leading-tight">
            Thank you for choosing a small shop.
          </h2>
          <p className="mt-6 text-brand-text/80 leading-relaxed">
            Every box of barfi you carry home, every dabba of ladoos you send for a wedding, every morning
            jalebi — keeps a family tradition alive. From our kitchen to your table, with gratitude.
          </p>
          <p className="mt-6 font-serif italic text-brand-maroon">— The Netram Molchand Family</p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .hero-parallax-container { perspective: 1px; overflow-x: hidden; overflow-y: auto; }
        .hero-parallax-image {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          transform: translateZ(-1px) scale(1.5); transform-origin: center;
          height: 120%; top: -10%;
        }
        @keyframes drawLine { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .timeline-line-draw.line-drawn { animation: drawLine 1s ease-out forwards; }
        @media (max-width: 768px) {
          .hero-parallax-image { transform: translateZ(-1px) scale(1.2); height: 130%; top: -15%; }
        }
      `}</style>
    </div>
  );
}