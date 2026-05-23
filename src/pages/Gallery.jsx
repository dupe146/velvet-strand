import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const GALLERY_ITEMS = [
  { src: '/images/knotless_braids.jpeg', category: 'braids', label: 'Knotless Braids' },
  { src: '/images/colour_treatment.jpeg', category: 'colour', label: 'Colour Treatment' },
  { src: '/images/Hair Blowout.jpeg', category: 'styling', label: 'Blowout & Style' },
  { src: '/images/sleek_style.jpeg', category: 'styling', label: 'Sleek Style' },
  { src: '/images/hair_condition.jpeg', category: 'treatment', label: 'Deep Conditioning' },
  { src: '/images/frenchcurls.jpeg', category: 'styling', label: 'French Curls' },
  { src: '/images/curly_braids.jpeg', category: 'styling', label: 'Curly Braids' },
  { src: '/images/cornrows.jpeg', category: 'styling', label: 'Corn Rows' },
  { src: '/images/precision_cut.jpeg', category: 'cut', label: 'Precision Cut' },
  { src: '/images/scalp_treatment.jpeg', category: 'treatment', label: 'Scalp Treatment' },
  { src: '/images/box_braids.jpeg', category: 'braids', label: 'Box Braids' },
  { src: '/images/wiginstall.jpeg', category: 'styling', label: 'Wig Install' },
  { src: '/images/bridal_hair.jpeg', category: 'styling', label: 'Bridal Hair' },
];

const CATEGORIES = ['all', 'braids', 'colour', 'styling', 'treatment', 'cut'];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index or null

  const filtered = active === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === active);

 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox(i => Math.min(i + 1, filtered.length - 1));
      if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="gallery-page-hero">
        <div className="gallery-hero-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <p className="section-label">Our Work</p>
          <h1 className="gallery-title">Transformations &amp; <em>Results</em></h1>
          <p className="gallery-subtitle">Every photo is a real client, a real story. Browse our work — from natural hair treatments to bridal masterpieces.</p>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="filter-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      <section className="gallery-full">
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <div key={i} className="masonry-item" onClick={() => setLightbox(i)}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="masonry-overlay">
                <span className="masonry-label">{item.label}</span>
                <span className="masonry-icon">⊕</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta">
        <p className="section-label" style={{ color: 'var(--yellow-green)' }}>Ready for Yours?</p>
        <h2 className="section-heading" style={{ color: 'var(--dry-sage)', marginBottom: '1rem' }}>
          Let's Create Your <em>Transformation</em>
        </h2>
        <Link to="/#booking" className="btn-primary">Book Your Appointment</Link>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button className="lb-prev" onClick={e => { e.stopPropagation(); setLightbox(i => Math.max(i - 1, 0)); }}>‹</button>
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].label} />
            <p className="lb-label">{filtered[lightbox].label}</p>
          </div>
          <button className="lb-next" onClick={e => { e.stopPropagation(); setLightbox(i => Math.min(i + 1, filtered.length - 1)); }}>›</button>
        </div>
      )}
    </>
  );
}
