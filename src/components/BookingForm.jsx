import React, { useState } from 'react';
import { SALON_CONFIG } from '../App';
import './BookingForm.css';

const SERVICES_LIST = [
  'Signature Cut & Style — ₦15,000+',
  'Colour & Highlights — ₦35,000+',
  'Bridal Package — ₦80,000+',
  'Natural Hair Treatment — ₦20,000+',
  'Knotless Braids — ₦25,000+',
  'Wig Installation — ₦18,000+',
];

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '', message: '' });
  const [status, setStatus] = useState('idle');

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`https://formspree.io/f/${SALON_CONFIG.bookingFormId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: form.service,
          date: form.date,
          time: form.time,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', service: '', date: '', time: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="booking-section">
      <div className="booking-inner">
        <div className="booking-left">
          <p className="section-label">Reserve Your Seat</p>
          <h2 className="section-heading">Book Your<br /><em>Appointment</em></h2>
          <p className="booking-sub">
            We'll confirm within 2 hours via WhatsApp. Walk-ins welcome when space is available.
          </p>
          <div className="booking-contact">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{SALON_CONFIG.address}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <a href={`tel:${SALON_CONFIG.phone}`}>{SALON_CONFIG.phone}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <span>Mon–Sat 9am–7pm · Sun 11am–4pm</span>
            </div>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          {status === 'success' ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Booking Request Sent!</h3>
              <p>We'll confirm your appointment via WhatsApp within 2 hours.</p>
              <button className="btn-primary" onClick={() => setStatus('idle')} type="button">
                Book Another
              </button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Ada Okafor" value={form.name} onChange={update} required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">WhatsApp Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="0801 234 5678" value={form.phone} onChange={update} required />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="service">Select Service</label>
                <select id="service" name="service" value={form.service} onChange={update} required>
                  <option value="" disabled>Choose a service…</option>
                  {SERVICES_LIST.map((s, i) => <option key={i}>{s}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="date">Preferred Date</label>
                  <input id="date" name="date" type="date" value={form.date} onChange={update} required min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-field">
                  <label htmlFor="time">Preferred Time</label>
                  <input id="time" name="time" type="time" value={form.time} onChange={update} required />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Extra Notes (optional)</label>
                <textarea id="message" name="message" placeholder="Any special requests or hair concerns…" value={form.message} onChange={update} rows={3} />
              </div>

              {status === 'error' && (
                <p className="form-error">Something went wrong. Please try again.</p>
              )}

              <button className="submit-btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Confirm Booking →'}
              </button>

              <p className="form-note">
                We'll reach out via WhatsApp to confirm your slot.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}