import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { lang, t } = useLanguage();

  // สร้าง URL ค้นหา Google Maps อัตโนมัติจากชื่อร้านและที่อยู่
  const mapSearchUrl = "https://maps.google.com/maps?q=322%20Moo%202%20Srisoontorn%20Road%20Bangtao%20Beach%20Cherngtalay%20Thalang%20Phuket&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const externalMapUrl = "https://www.google.com/maps/search/?api=1&query=322+Moo+2+Srisoontorn+Road+Bangtao+Beach+Cherngtalay+Thalang+Phuket";

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            STEFAN MASTER CLUB
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'en' ? "Contact Us" : "ติดต่อเรา"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            {lang === 'en'
              ? "Visit our barbershop in Bangtao Beach, Phuket or call us for appointments."
              : "แวะมาหาเราที่หาดบางเทา ภูเก็ต หรือโทรสอบถาม / สำรองคิวล่วงหน้า"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: INFO */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-2">📍 {lang === 'en' ? "Location" : "สถานที่ตั้ง"}</h3>
              <p className="text-zinc-200 font-semibold text-lg mb-1">Stefan Master Club Phuket</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('address')}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-2">📞 {lang === 'en' ? "Phone & Booking" : "เบอร์โทรศัพท์ / จองคิว"}</h3>
              <a 
                href="tel:0802210009" 
                className="text-2xl font-black text-zinc-100 hover:text-amber-400 transition inline-block mb-1"
              >
                080-2210009
              </a>
              <p className="text-zinc-400 text-xs">
                {lang === 'en' ? "* Call us directly during operating hours" : "* โทรหาเราโดยตรงในเวลาทำการ"}
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-2">⏰ {t('hours')}</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span>SATURDAY - THURSDAY</span>
                  <span className="font-bold text-zinc-100">10:00 AM - 09:00 PM</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-amber-400 font-semibold">FRIDAY</span>
                  <span className="font-bold text-amber-400">02:00 PM - 09:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: MAP */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-[420px] lg:h-[520px] flex flex-col justify-between shadow-xl">
            <div className="w-full h-full rounded-xl overflow-hidden border border-zinc-800">
              <iframe
                title="Stefan Master Club Phuket Location"
                src={mapSearchUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div className="pt-4 text-center">
              <a
                href={externalMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-2.5 rounded-lg text-sm transition shadow-md shadow-amber-500/10"
              >
                🗺️ {lang === 'en' ? "Open in Google Maps" : "เปิดแผนที่ใน Google Maps"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}