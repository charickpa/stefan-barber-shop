import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { lang } = useLanguage();

  const galleryItems = [
    {
      title: lang === 'en' ? "Classic Fade" : "ตัดผมสไตล์ คลาสสิก เฟด",
      category: "Haircut",
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: lang === 'en' ? "Beard Grooming & Styling" : "โกนหนวดและแต่งทรงเครา",
      category: "Beard",
      img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: lang === 'en' ? "Modern Crop & Line Up" : "โมเดิร์น ครอป พร้อมกันขอบ",
      category: "Haircut",
      img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: lang === 'en' ? "Vintage Side Part" : "วินเทจ ไซด์พาร์ท",
      category: "Haircut",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: lang === 'en' ? "Gentleman Hair Treatment" : "ทรีตเมนต์และเซ็ตทรงผมชาย",
      category: "Treatment",
      img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: lang === 'en' ? "Slick Back Classic" : "สลิกแบ็ก ย้อนยุค",
      category: "Haircut",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            STEFAN MASTER CLUB
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'en' ? "Our Portfolio" : "ผลงานของเรา"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Explore haircuts and grooming styles crafted by our professional barbers in Phuket."
              : "รับชมตัวอย่างทรงผมและสไตล์การแต่งทรงจากช่างตัดผมมืออาชีพของเรา"}
          </p>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition duration-300 shadow-lg"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition" />
                <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}