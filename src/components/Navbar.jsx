import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SALON_CONFIG } from '../App';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo"> <img src="/images/velvetlogo-rbg.png" alt="Velvet Strand" className="nav-logo-img" /></Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><button onClick={() => scrollTo('services')}>Services</button></li>
        <li><button onClick={() => scrollTo('about')}>About</button></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><button onClick={() => scrollTo('booking')}>Book</button></li>
      </ul>

      <button className="nav-cta" onClick={() => scrollTo('booking')}>Book Now</button>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
