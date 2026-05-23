# Velvet Strand — Vite + React

A luxury hair salon website. Multi-page, mobile-friendly, WhatsApp booking, gallery with lightbox.

---

## 🚀 Running the Project

### 1. Install Node.js
Download LTS from: https://nodejs.org

### 2. Open in VSCode
File → Open Folder → select the `velvet-strand` folder

### 3. Install & run
Open the VSCode terminal (Ctrl + ` ) and run:
```
npm install
npm run dev
```
Open http://localhost:5173 in your browser ✅

> Note: Vite uses port 5173, not 3000 like the old Create React App.

---

## ✏️ Editing for a Real Client

Open `src/App.jsx` — change the `SALON_CONFIG` object at the top.
Name, phone, WhatsApp, address, hours — everything updates site-wide automatically.

**Change services:** `src/pages/Home.jsx` → edit the `SERVICES` array
**Swap images:** `src/pages/Home.jsx` → edit the `IMAGES` object at the top
**Edit gallery:** `src/pages/Gallery.jsx` → edit the `GALLERY_ITEMS` array

---

## 📬 Booking Form Setup (Formspree — free)

The form currently sends booking details via WhatsApp pre-fill.
To also receive email notifications:

1. Go to https://formspree.io → sign up free
2. New Form → copy your Form ID (e.g. xpwzgkab)
3. Paste it in `src/App.jsx`: `bookingFormId: 'xpwzgkab'`
4. In `src/components/BookingForm.jsx`, uncomment the fetch block

---

## 🌐 Deploy Free on Netlify

```
npm run build
```
Drag the `/dist` folder (not `/build` — Vite uses `/dist`) into https://netlify.com
You get a free live link instantly.

---

## 📁 Project Structure

```
velvet-strand/
├── index.html                 ← Root HTML (Vite style)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               ← Entry point
    ├── App.jsx                ← SALON_CONFIG + routes
    ├── index.css              ← Global CSS variables
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── BookingForm.jsx / .css
    │   └── WhatsAppFloat.jsx / .css
    └── pages/
        ├── Home.jsx / .css
        └── Gallery.jsx / .css
```

---

## Key Differences from Create React App (CRA)

| | CRA (old) | Vite (new) ✅ |
|---|---|---|
| Start command | `npm start` | `npm run dev` |
| Port | 3000 | 5173 |
| Build output | `/build` | `/dist` |
| Speed | Slow | Very fast |
| Warnings | Many | Zero |
