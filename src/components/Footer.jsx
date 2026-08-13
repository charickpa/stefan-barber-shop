import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div className="md:col-span-1">
          <Link to="/" className="flex flex-col text-xl font-black text-zinc-100 mb-3">
            <span className="text-amber-500">STEFAN MASTER CLUB</span>
            <span className="text-zinc-400 text-xs font-semibold tracking-wider">PHUKET</span>
          </Link>
          <p className="text-sm leading-relaxed text-zinc-400">
            {t('brandDesc')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">{t('quickLinks')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400 transition">{t('home')}</Link></li>
            <li><Link to="/services" className="hover:text-amber-400 transition">{t('services')}</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-400 transition">{t('gallery')}</Link></li>
            <li><Link to="/booking" className="hover:text-amber-400 transition">{t('bookNow')}</Link></li>
          </ul>
        </div>

        {/* Service Hours */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">{t('hours')}</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-zinc-200">{t('satThuHours')}</li>
            <li className="text-amber-500 font-medium">{t('friHours')}</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">{t('contactInfo')}</h4>
          <p className="text-sm mb-2">
            📞 <a href="tel:0802210009" className="hover:text-amber-400 transition">080-221-0009</a>
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            📍 {t('address')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Stefan Master Club Phuket. All rights reserved.
      </div>
    </footer>
  );
}