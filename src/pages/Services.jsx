import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { lang } = useLanguage();

  // รายการบริการพร้อมราคาจากช่องที่ 2 ในรูปภาพ
  const servicesList = [
    {
      title: lang === 'en' ? "Haircut + Wash" : "ตัดผม + สระผม",
      desc: lang === 'en' 
        ? "Professional haircut, hair wash, and precision styling." 
        : "ตัดผมแต่งทรงประณีต สระผมทำความสะอาด และเซ็ตทรงสวยงาม",
      price: "900 ฿",
      time: "45 mins"
    },
    {
      title: lang === 'en' ? "Haircut" : "ตัดผม",
      desc: lang === 'en' 
        ? "Precision haircut tailored to your head shape and style." 
        : "ตัดผมทรงสวยงามประณีต เข้ากับโครงหน้าและสไตล์ของคุณ",
      price: "700 ฿",
      time: "45 mins"
    },
    {
      title: lang === 'en' ? "Beard Grooming" : "โกนหนวด & ตกแต่งเครา",
      desc: lang === 'en' 
        ? "Hot towel, precise razor line-up, and beard oil nourishment." 
        : "ประคบผ้าผืนร้อน โกนตัดแต่งทรงเคราด้วยมีดโกน และบำรุงด้วยออยล์",
      price: "300 ฿",
      time: "30 mins"
    },
    {
      title: lang === 'en' ? "Haircut & Beard" : "แพ็กเกจ ตัดผม + แต่งหนวดเครา",
      desc: lang === 'en' 
        ? "Complete grooming package including professional haircut and beard styling." 
        : "ดูแลครบสูตร บริการตัดผมพร้อมตัดแต่งทรงหนวดเคราเนี๊ยบๆ",
      price: "1,200 ฿",
      time: "60 mins"
    },
    {
      title: lang === 'en' ? "Long Hair Scissor Cut & Beard" : "ตัดผมยาวด้วยกรรไกร + แต่งหนวดเครา",
      desc: lang === 'en' 
        ? "Specialized scissor technique for long hair styling combined with full beard grooming." 
        : "เทคนิคตัดผมยาวด้วยกรรไกรโดยเฉพาะ พร้อมตกแต่งทรงหนวดเคราครบชุด",
      price: "1,000 ฿",
      time: "75 mins"
    },
    {
      title: lang === 'en' ? "Kids Haircut" : "ตัดผมเด็ก",
      desc: lang === 'en' 
        ? "Gentle and patient haircut service for children." 
        : "บริการตัดผมเด็กด้วยความประณีต เอาใจใส่ และใจเย็น",
      price: "500 ฿",
      time: "30 mins"
    },
    {
      title: lang === 'en' ? "Head Shave" : "โกนหัว (Head Shave)",
      desc: lang === 'en' 
        ? "Smooth head shave with hot towel treatment and moisturizing finish." 
        : "โกนศีรษะเรียบเนียน สะอาดตา พร้อมประคบผ้าร้อนผ่อนคลาย",
      price: "500 ฿",
      time: "30 mins"
    },
    {
      title: lang === 'en' ? "Nose or Ear Wax" : "แว็กซ์ขนหู / ขนนกจมูก",
      desc: lang === 'en' 
        ? "Quick and gentle waxing service for ear or nose hair removal." 
        : "บริการแว็กซ์กำจัดขนหูหรือขนจมูกอย่างอ่อนโยนและรวดเร็ว",
      price: "500 ฿",
      time: "15 mins"
    },
    {
      title: lang === 'en' ? "Shampoo & Styling" : "สระผม & เซ็ตทรง",
      desc: lang === 'en' 
        ? "Relaxing head wash, scalp massage, blow dry, and professional hair styling." 
        : "สระผมผ่อนคลาย นวดหนังศีรษะ เป่าแห้ง และเซ็ตทรงด้วยผลิตภัณฑ์พรีเมียม",
      price: "300 ฿",
      time: "30 mins"
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            STEFAN MASTER CLUB
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'en' ? "Services & Pricing" : "บริการ & อัตราค่าบริการ"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Professional male grooming services with premium standards and attention to detail."
              : "บริการตัดผมและดูแลบุคลิกภาพชายด้วยมาตรฐานพรีเมียมและความประณีตในทุกขั้นตอน"}
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition duration-300 shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="text-xl font-bold text-zinc-100">{service.title}</h3>
                  <span className="text-amber-500 font-extrabold text-lg whitespace-nowrap">{service.price}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs text-zinc-500">
                <span>⏱️ {service.time}</span>
                <a 
                  href="tel:0802210009" 
                  className="text-amber-500 hover:text-amber-400 font-bold transition"
                >
                  {/* {lang === 'en' ? "Call to Book →" : "โทรจองคิว →"} */}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">
            {lang === 'en' ? "Want to book an appointment?" : "ต้องการสำรองคิวตัดผม?"}
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            {lang === 'en' 
              ? "Call us to reserve your slot in advance to avoid waiting." 
              : "โทรสำรองคิวก่อนเข้าใช้บริการเพื่อความสะดวกและไม่ต้องรอคอย"}
          </p>
          <a
            href="tel:0802210009"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-xl transition duration-300 shadow-lg shadow-amber-500/10"
          >
            📞 080-221-0009
          </a>
        </div>
      </div>
    </div>
  );
}