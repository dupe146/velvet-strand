import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Gallery from './pages/Gallery'

/* ─────────────────────────────────────────────────────────────
   QUICK-EDIT SECTION — Change these when working for a real client
   ─────────────────────────────────────────────────────────────── */
export const SALON_CONFIG = {
  name: 'Velvet Strand',
  tagline: 'Luxury Hair Studio · Lagos',
  address: '14 Admiralty Way, Lekki Phase 1, Lagos',
  phone: '08123456789',
  whatsappNumber: '2348123456789', // country code + number, no +
  email: 'hello@velvetstrand.com',
  instagram: 'https://instagram.com/velvetstrand',
  tiktok: 'https://tiktok.com/@velvetstrand',
  bookingFormId: 'xzdwvpqg', // Formspree ID here
  hours: [
    { day: 'Monday – Friday', time: '9am – 7pm' },
    { day: 'Saturday',        time: '9am – 6pm' },
    { day: 'Sunday',          time: '11am – 4pm' },
  ],
  stats: [
    { num: '500+', label: 'Clients Served' },
    { num: '8yrs', label: 'Experience'     },
    { num: '4.9★', label: 'Google Rating'  },
  ],
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <WhatsAppFloat />
    </>
  )
}
