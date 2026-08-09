import React from 'react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-2xl">✂️</span>
          <span className="text-amber-500">GENTLEMAN</span>
          <span className="text-zinc-100">BARBER</span>
        </a>

        {/* MENU LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          <a href="/" className="hover:text-amber-400 transition">หน้าแรก</a>
          <a href="/services" className="hover:text-amber-400 transition">บริการ & ราคา</a>
          <a href="/gallery" className="hover:text-amber-400 transition">ผลงานทรงผม</a>
          <a href="/contact" className="hover:text-amber-400 transition">ติดต่อเรา</a>
        </nav>

        {/* BOOKING BUTTON */}
        <div>
          <a
            href="/booking"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-lg text-sm transition duration-300 shadow-md shadow-amber-500/20 inline-block"
          >
            จองคิวตัดผม
          </a>
        </div>
      </div>
    </header>
  );
}