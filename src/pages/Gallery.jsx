import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const { lang } = useLanguage();

  // รายการผลงาน gallery ตรงตาม 9 รายการในหน้า Services
  const galleryItems = [
    {
      title: lang === "en" ? "Haircut" : "ตัดผมแต่งทรง",
      category: "Haircut",
      img: `${import.meta.env.BASE_URL}images/HC.jpg`
    },
    {
      title: lang === "en" ? "Beard Grooming" : "โกนหนวด & ตกแต่งเครา",
      category: "Beard",
      img: `${import.meta.env.BASE_URL}images/beard.jpg`,
    },
    {
      title:
        lang === "en"
          ? "Haircut & Beard Combo"
          : "แพ็กเกจ ตัดผม + แต่งหนวดเครา",
      category: "Combo",
      img: `${import.meta.env.BASE_URL}images/combo.jpg`,
    },
    {
      title:
        lang === "en"
          ? "Long Hair Scissor Cut & Beard"
          : "ตัดผมยาวด้วยกรรไกร + แต่งหนวดเครา",
      category: "Scissor Cut",
      img: `${import.meta.env.BASE_URL}images/lss.jpg`
    },
    {
      title: lang === "en" ? "Kids Haircut" : "ตัดผมเด็ก",
      category: "Kids",
      img: `${import.meta.env.BASE_URL}images/kids.jpg`,
    },
    {
      title: lang === "en" ? "Head Shave" : "โกนหัว (Head Shave)",
      category: "Shave",
      img: `${import.meta.env.BASE_URL}images/head-shave.jpg`,
    },
    {
      title: lang === "en" ? "Nose or Ear Wax" : "แว็กซ์ขนหู / ขนนกจมูก",
      category: "Grooming",
      img: `${import.meta.env.BASE_URL}images/wax.jpg`,
    },
    {
      title: lang === "en" ? "Shampoo & Styling" : "สระผม & เซ็ตทรง",
      category: "Styling",
      img: `${import.meta.env.BASE_URL}images/styling.jpg`,
    },
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
            {lang === "en" ? "Our Portfolio" : "ผลงานของเรา"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            {lang === "en"
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
