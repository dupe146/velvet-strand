import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SALON_CONFIG } from '../App';
import BookingForm from '../components/BookingForm';
import './Home.css';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=85&fit=crop',
  about: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80&fit=crop',
  services: [
    { src: '/images/precision_cut.jpeg',      position: 'center 70%'    },
    { src: '/images/colour_treatment.jpeg',   position: 'center 20%'   },
    { src: '/images/Wedding hair.jpeg',       position: 'center 60%'    },
    { src: '/images/hair_condition.jpeg',     position: 'center 15%'   },
    { src: '/images/knotless_braids.jpeg',    position: 'center top'    },
    { src: '/images/wiginstall.jpeg',         position: 'center 35%'    },
  ],
};
/* SERVICES DATA  */
const SERVICES = [
  { num: '01', name: 'Signature Cut & Style', desc: 'Precision cut tailored to your face shape. Includes consultation, wash, and blowout.', price: '₦15,000' },
  { num: '02', name: 'Colour & Highlights', desc: 'Balayage to bold full colour — crafted for your skin tone by our colour artistes.', price: '₦35,000' },
  { num: '03', name: 'Bridal Package', desc: 'Full bridal glam — trial session, morning styling, and touch-up kit included.', price: '₦80,000' },
  { num: '04', name: 'Natural Hair Treatment', desc: 'Deep conditioning and protein treatment for 4B/4C natural hair that thrives.', price: '₦20,000' },
  { num: '05', name: 'Knotless Braids', desc: 'Lightweight, tension-free knotless braids in any length. Your scalp will thank you.', price: '₦25,000' },
  { num: '06', name: 'Wig Installation', desc: 'Flawless lace fronts and closure wigs installed for a natural, undetectable finish.', price: '₦18,000' },
];

const TESTIMONIALS = [
  { text: 'My bridal hair was absolutely perfect. Every guest asked who did it. I felt like royalty on my wedding day.', author: 'Chisom A.', location: 'Bride' },
  { text: "I've been natural for 6 years and struggled with breakage. After my first treatment here, the difference was night and day.", author: 'Adaeze O.', location: 'Lagos Island' },
  { text: 'The atmosphere alone is worth it. My knotless braids lasted 8 weeks. Worth every kobo.', author: 'Temi F.', location: 'Lekki' },
];

const MARQUEE_ITEMS = ['Hair Transformation', 'Luxury Treatments', 'Bridal Styling', 'Natural Hair Care', 'Colour Artistry', 'Knotless Braids'];

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  useReveal();

  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <GalleryPreview />
      <Testimonials />
      <section id="booking"><BookingForm /></section>
      <Footer />
    </main>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">
          <span className="eyebrow-line"></span>
          {SALON_CONFIG.tagline}
        </p>
        <h1 className="hero-title">
          Wear Your<br />Hair Like a<br /><em>Crown</em>
        </h1>
        <p className="hero-desc">
          Premium hair artistry for the modern Nigerian woman. Precision cuts, colour, and treatments — in a space designed to feel like a retreat.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Appointment
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Services
          </button>
        </div>
        <div className="hero-stats">
          {SALON_CONFIG.stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <img src={IMAGES.hero} alt="Velvet Strand Hair Studio interior" className="hero-img" loading="eager" />
        <div className="hero-overlay"></div>
        <div className="hero-badge">Est. 2016 — Lagos</div>
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-bar">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-dot">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── SERVICES ── */
function Services() {
  return (
    <section className="services" id="services">
      <div className="services-intro reveal">
        <div>
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">Our <em>Signature</em><br />Services</h2>
        </div>
        <p className="services-note">Every service delivered with intention, skill, and a deep love for the craft.</p>
      </div>
      <div className="services-grid reveal reveal-delay-1">
        {SERVICES.map((s, i) => (
          <div className="svc-card" key={i}>
            <img
  src={IMAGES.services[i].src}
  alt={s.name}
  className="svc-img"
  loading="lazy"
  style={{ objectPosition: IMAGES.services[i].position }}
/>
            <div className="svc-body">
              <span className="svc-num">{s.num}</span>
              <div className="svc-line"></div>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-price">From {s.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section className="about" id="about">
      <div className="about-img-side">
        <img src={IMAGES.about} alt="Stylist at work" className="about-img" loading="lazy" />
        <div className="about-badge">Est. 2016</div>
      </div>
      <div className="about-content reveal">
        <p className="section-label">About Velvet Strand</p>
        <h2 className="section-heading" style={{ color: 'var(--dry-sage)' }}>
          Hair Care That<br />Goes <em>Beyond</em><br />the Chair
        </h2>
        <p className="about-text">
          Founded in the heart of Lekki, Velvet Strand was built on one belief — every woman deserves to walk out feeling extraordinary. We combine technique, care, and a warm atmosphere to make that happen, every single visit.
        </p>
        <ul className="feature-list">
          {[
            ['Certified Hair Artistes', 'Every stylist is continuously trained in the latest global techniques.'],
            ['Premium, Safe Products', 'Professional-grade, sulphate-free products that protect your hair\'s health.'],
            ['A Retreat, Not Just a Salon', 'Our studio is calm, beautiful, and completely dedicated to your experience.'],
          ].map(([title, text], i) => (
            <li key={i} className="feature-item">
              <div className="feature-dot"></div>
              <div>
                <p className="feature-title">{title}</p>
                <p className="feature-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── GALLERY PREVIEW ── */
function GalleryPreview() {
  const featured = [
    
    { src: '/images/knotless_braids.jpeg', label: 'Knotless Braids' },
    { src: '/images/bridal_hair.jpeg', label: 'Bridal Style' },
    { src: '/images/wiginstall.jpeg', label: 'Wig Install' },
    { src: '/images/sleek_style.jpeg', label: 'Sleek Styles' },
  ];

  return (
    <section className="gallery-preview" id="gallery-preview">
      <div className="gallery-header reveal">
        <div>
          <p className="section-label">Our Work</p>
          <h2 className="section-heading">Before &amp; <em>After</em></h2>
        </div>
        <Link to="/gallery" className="btn-ghost">See All Transformations →</Link>
      </div>

      <div className="oval-grid reveal reveal-delay-1">
        {featured.map((item, i) => (
          <Link to="/gallery" key={i} className="oval-item">
            <div className="oval-frame">
              <img src={item.src} alt={item.label} loading="lazy" />
            </div>
            <p className="oval-label">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="gallery-cta-row reveal">
        <Link to="/gallery" className="btn-primary">View All Transformations</Link>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  return (
    <section className="testimonials">
      <div className="reveal">
        <p className="section-label">Client Love</p>
        <h2 className="section-heading" style={{ color: 'var(--dry-sage)' }}>
          What Our <em>Clients</em> Say
        </h2>
      </div>
      <div className="t-grid reveal reveal-delay-1">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="t-card">
            <div className="t-stars">★★★★★</div>
            <div className="t-quote-mark">"</div>
            <p className="t-text">{t.text}</p>
            <p className="t-author">— {t.author}, {t.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo"><img src="/images/velvetlogo-rbg.png" alt="Velvet Strand" style={{ height: '80px', width: 'auto' }} />
</div>
          <p className="footer-tagline">Premium hair artistry for the<br />modern Nigerian woman.</p>
        </div>
        <div>
          <p className="footer-heading">Studio Hours</p>
          <ul className="footer-list">
            {SALON_CONFIG.hours.map((h, i) => (
              <li key={i}>{h.day}: {h.time}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-list">
            <li>{SALON_CONFIG.address}</li>
            <li>{SALON_CONFIG.email}</li>
            <li>{SALON_CONFIG.phone}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 {SALON_CONFIG.name}. All rights reserved.</span>
        <div className="social-row">
          <a href={SALON_CONFIG.instagram} target="_blank" rel="noreferrer" className="social-btn">Instagram</a>
          <a href={SALON_CONFIG.tiktok} target="_blank" rel="noreferrer" className="social-btn">TikTok</a>
          <a href={`https://wa.me/${SALON_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" className="social-btn">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
