import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  // เพิ่ม /gallery เข้าไปใน navLinks แล้วครับ
  const navLinks = [
    { path: "/", label: t("home") },
    { path: "/services", label: t("services") },
    { path: "/gallery", label: t("gallery") }, // 👈 เพิ่มเมนู Gallery กลับเข้ามาตรงนี้
    { path: "/contact", label: t("contact") },
  ];

  return (
    <nav className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-2xl font-black tracking-wider text-amber-500 uppercase">
              STEFAN BARBER
            </span>
            <span className="text-xs tracking-widest text-zinc-400 uppercase border-l border-zinc-700 pl-2">
              MASTER CLUB PHUKET
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? "text-amber-500"
                    : "text-zinc-300 hover:text-amber-400"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* ปุ่มเปลี่ยนภาษา Desktop */}
            <button
              onClick={toggleLanguage}
              className="bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === "en" ? "TH" : "EN"}</span>
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex items-center gap-3 md:hidden">
            {/* ปุ่มเปลี่ยนภาษา Mobile */}
            <button
              onClick={toggleLanguage}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer"
            >
              {lang === "en" ? "TH" : "EN"}
            </button>

            {/* ปุ่ม Hamburger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-zinc-400 hover:text-amber-500 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition ${
                location.pathname === link.path
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  : "text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              {t("bookNow")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}