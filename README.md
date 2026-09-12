# Undangan Pernikahan Widya & Habib

Modern wedding invitation built with **React + TypeScript + Vite + Tailwind CSS**.

## Tech Stack
- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)

## Fitur
- Cover opening animation
- Live countdown ke hari H
- Section Bride & Groom
- Save the Date (Akad + Resepsi) + Maps
- Love Story timeline
- Wedding Gift (rekening + copy)
- RSVP & Wishes (localStorage-ready)
- Music player
- Soft realistic / elegant design
- Fully responsive

## Cara Menjalankan

```bash
cd undangan-widya-habib
npm install
npm run dev
```

Buka http://localhost:5173

## Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `dist/`. Bisa di-deploy ke Vercel, Netlify, atau GitHub Pages.

## Customization
Edit data di `src/App.tsx` (nama, tanggal, alamat, rekening, love story, dll).
Ganti audio di komponen `MusicPlayer`.
