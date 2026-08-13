import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// AnimatedCounter Component
function AnimatedCounter({ end, decimals = 0, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const currentCount = progress * end;
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();

  // ข้อมูลรีวิว Google Maps จริงจากลูกค้า (ครบทั้ง 12 รีวิว)
  const googleReviews = [
    {
      name: "Waseem Mir",
      badge: "Local Resident",
      rating: 5,
      date: "3 weeks ago",
      text_th:
        "สเตฟานเป็นช่างตัดผมที่ดีที่สุดคนหนึ่งในภูเก็ต ผมอาศัยอยู่ภูเก็ตมา 10 ปีแล้ว และเขาคือช่างตัดผมที่ดีที่สุดเท่าที่เคยเจอมา ขอแนะนำอย่างยิ่งครับ!",
      text_en:
        "Stefan is one of the best barbers in Phuket. I've lived in Phuket for 10 years and he is the best barber I've ever had. Highly recommended!",
    },
    {
      name: "Natalie",
      badge: "Local Guide · 5 Photos",
      rating: 5,
      date: "3 months ago",
      text_th:
        "เป็นการตัดผมที่ดีที่สุดเท่าที่สามีและฉันเคยทำมา! ช่างมีความเป็นมืออาชีพ เอาใจใส่มาก ขอแนะนำร้านนี้ทั้งสำหรับผู้ชายและผู้หญิงเลยค่ะ",
      text_en:
        "Honestly the best haircut my husband and I have ever had! The barber was extremely professional and attentive. Highly recommended for both men and women!",
    },
    {
      name: "Christian Brousseau",
      badge: "Local Guide · 18 Reviews",
      rating: 5,
      date: "3 months ago",
      text_th:
        "ประทับใจมากครับ ทรงผมสวยสมบูรณ์แบบ บรรยากาศอบอุ่น และสัมผัสได้ถึงฝีมือและความใส่ใจในรายละเอียด แนะนำ 100%!",
      text_en:
        "Very impressed! Perfect haircut, warm atmosphere, and you can feel the craftsmanship and attention to detail. 100% recommended!",
    },
    {
      name: "Zyrax 843",
      badge: "Local Guide · Afro Hair Specialist",
      rating: 5,
      date: "Google Review",
      text_th:
        "ผมค่อนข้างพิถีพิถันเพราะผมหนา (ผมแอฟโร) ขอให้ตัด Skin Fade และโกนหนวด ช่างทำออกมาได้อย่างสมบูรณ์แบบและใส่ใจรายละเอียดมาก",
      text_en:
        "I'm very particular as I have thick Afro hair. Asked for a skin fade and clean shave—he executed it perfectly with great attention to detail.",
    },
    {
      name: "Илья Фомичев",
      badge: "Regular Customer (3 Years)",
      rating: 5,
      date: "4 weeks ago",
      text_th:
        "ผมตัดผมกับสเตฟานมา 3 ปีแล้ว เขาคือช่างตัดผมที่ดีที่สุดในย่านบางเทา/สุรินทร์อย่างไม่ต้องสงสัย ยินดีด้วยกับการเปิดร้านใหม่ครับ!",
      text_en:
        "I've been going to Stefan for 3 years. He is without a doubt the best barber in the Bangtao/Surin area. Congrats on the new shop!",
    },
    {
      name: "vikram ratiya",
      badge: "Verified Reviewer",
      rating: 5,
      date: "Google Review",
      text_th:
        "ได้ทรงผมที่ยอดเยี่ยมจากช่างซัน! บริการเป็นมืออาชีพ เป็นกันเอง และใส่ใจในรายละเอียด สถานที่สะอาด สบาย ตรงตามที่ต้องการเลยครับ",
      text_en:
        "Got a great haircut from barber Sun! Professional, friendly, and paid great attention to detail. Clean space and exactly what I wanted.",
    },
    {
      name: "Rene R",
      badge: "Local Guide · 169 Reviews",
      rating: 5,
      date: "Google Review",
      text_th:
        "ช่างตัดผมอัธยาศัยดี ใส่ใจรายละเอียดมาก ใจเย็นและไม่หวั่นไหวแม้มีลูกค้ารอคิวเยอะ ประทับใจทุกครั้งที่มาตัด ตัดมาหลายปีแล้วและจะมาอีกแน่นอน",
      text_en:
        "Very friendly barber with great attention to detail. Patient and calm even with a queue. Happy every time, been coming for years and will return!",
    },
    {
      name: "Reace Bliss",
      badge: "Local Guide · 15 Reviews",
      rating: 5,
      date: "Google Review",
      text_th:
        "โชคดีที่เดินเข้ามาใช้งานได้เลยโดยไม่ต้องนัด สเตฟานตัดผมได้ยอดเยี่ยมมาก รู้จริงเรื่องตัดผม ทรงเฟดสวยเนี๊ยบ นิสัยดี น่ารักมากครับ!",
      text_en:
        "Lucky to walk in without booking! Stefan did an amazing job, knows exactly what he's doing. Perfect fade and super friendly guy!",
    },
    {
      name: "Troy Czabania",
      badge: "Local Guide · 24 Reviews",
      rating: 5,
      date: "Google Review",
      text_th:
        "บริการดีเยี่ยม เข้าใจทรงผมที่ต้องการชัดเจน ร้านสะอาด ช่างเป็นกันเอง ราคาสมเหตุสมผลมากครับ",
      text_en:
        "Excellent barbershop that clearly understood what I wanted. Clean shop, friendly barbers, and very fair prices!",
    },
    {
      name: "Kemal Muhsin ŞAHİN",
      badge: "Verified Reviewer",
      rating: 5,
      date: "Google Review",
      text_th:
        "เพื่อนของฉันชื่อซันเป็นคนโกนหนวดให้ ทุกอย่างดีมาก บริการดีและสุภาพมาก สถานที่สะอาด จะกลับมาอีกแน่นอนครับ",
      text_en:
        "My friend Sun did my shave. Everything was great, very polite and polite service. Clean space, definitely coming back!",
    },
    {
      name: "Philemon",
      badge: "Verified Reviewer",
      rating: 5,
      date: "Google Review",
      text_th:
        "พี่น้องชาวแอฟริกันของฉัน ที่นี่คือที่ที่เหมาะสมถ้าคุณกำลังมองหาร้านตัดผมที่ให้ทรงผมสวยเป๊ะ ✊🏿❤️",
      text_en:
        "To my African brothers, this is the right place if you're looking for a fresh and proper haircut! ✊🏿❤️",
    },
    {
      name: "ALEX YUTSKOVSKIY DE RECC",
      badge: "Local Guide · 134 Reviews",
      rating: 5,
      date: "Regular Customer",
      text_th:
        "สเตฟานเป็นร้านตัดผมชื่อดังในท้องถิ่น ผมมาโกนหัวและเคราที่ร้านสัปดาห์ละครั้ง เกือบ 2 ปีแล้วครับ 🫶🏻",
      text_en:
        "Stefan is a well-known local barber. I've been coming here weekly for head and beard shaves for almost 2 years! 🫶🏻",
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans">
      {/* 1. HERO SECTION (เพิ่มภาพพื้นหลัง + Overlay มืด) */}
      <section className="relative py-24 sm:py-32 px-4 max-w-full text-center flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
        {/* 1. ภาพพื้นหลัง (ปรับ bg-[center_top] หรือ bg-[center_30%] เพื่อดันรูปภาพลงมา) */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Overlay ไล่เฉดสีมืดเพื่อให้ข้อความอ่านง่าย ชัดเจน */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/75 to-zinc-950" />

        {/* เนื้อหา Hero (อยู่ชั้นบนสุด) */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <span>✨</span>
            <span>
              {lang === "en"
                ? "Premium Barber Experience in Bangtao & Surin"
                : "ยกระดับประสบการณ์ตัดผมพรีเมียม ย่านบางเทา & สุรินทร์"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight uppercase">
            {lang === "en" ? (
              <>
                Master Barbering <br />
                <span className="text-amber-500 drop-shadow-md">
                  Crafted For Perfection
                </span>
              </>
            ) : (
              <>
                ศิลปะการตัดผมชาย <br />
                <span className="text-amber-500 drop-shadow-md">
                  ประณีตไร้ที่ติทุกรายละเอียด
                </span>
              </>
            )}
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed font-light">
            {lang === "en"
              ? "Specializing in Fades, Afro Hair, Beard Trim, and Classic Cuts. Exceptional service with professional barbers."
              : "เชี่ยวชาญด้าน Fade, Afro Hair, จัดแต่งหนวดเครา และทรงผมคลาสสิก พร้อมบริการระดับมืออาชีพ"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* <Link
              to="/booking"
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-amber-500/20 text-center uppercase tracking-wider"
            >
              {lang === "en" ? "Book Appointment Now" : "จองคิวตัดผมทันที"}
            </Link> */}
            <Link
              to="/services"
              className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold px-8 py-4 rounded-xl transition duration-300 text-center backdrop-blur-sm uppercase tracking-wider"
            >
              {lang === "en" ? "View Services & Prices" : "ดูบริการและราคา"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
              <AnimatedCounter end={10} suffix="+" />
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm">
              {lang === "en" ? "Years Experience" : "ปีแห่งประสบการณ์"}
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
              <AnimatedCounter end={4.9} decimals={1} suffix=" ★" />
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm">
              {lang === "en" ? "Google Rating" : "คะแนนรีวิว Google"}
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
              <AnimatedCounter end={100} suffix="%" />
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm">
              {lang === "en" ? "Satisfaction Rate" : "ความพึงพอใจลูกค้า"}
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
              <AnimatedCounter end={3} />
            </div>
            <div className="text-zinc-400 text-xs sm:text-sm">
              {lang === "en" ? "Locations in Phuket" : "สาขาในภูเก็ต"}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHT SERVICES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {lang === "en" ? "Featured Services" : "บริการยอดนิยม"}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {lang === "en"
              ? "Tailored haircut & grooming services for gentlemen"
              : "เลือกสรรบริการตัดผมและดูแลลุคที่เหมาะกับคุณ"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-amber-500/50 transition duration-300">
            <div className="text-amber-500 text-3xl mb-4">✂️</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "en" ? "Haircut & Skin Fade" : "ตัดผม & สกินเฟด"}
            </h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {lang === "en"
                ? "Precision haircutting, sharp skin fades, and personalized styling."
                : "ตัดแต่งทรงผม สกินเฟดไล่ระดับอย่างประณีต เหมาะกับทุกสภาพผม"}
            </p>
            <span className="text-amber-500 font-bold text-sm">
              ฿500 - ฿700
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-amber-500/50 transition duration-300">
            <div className="text-amber-500 text-3xl mb-4">🪒</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "en"
                ? "Beard Trim & Hot Towel"
                : "โกนและจัดแต่งเครา + ผ้าหน้าร้อน"}
            </h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {lang === "en"
                ? "Full beard shaping, straight razor outline, and relaxing hot towel treatment."
                : "โกนและเล็มเคราเนี๊ยบๆ พร้อมบริการประคบผ้าหน้าร้อนผ่อนคลาย"}
            </p>
            <span className="text-amber-500 font-bold text-sm">
              ฿300 - ฿500
            </span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-amber-500/50 transition duration-300">
            <div className="text-amber-500 text-3xl mb-4">👑</div>
            <h3 className="text-xl font-bold mb-2">
              {lang === "en"
                ? "Afro Hair Specialist"
                : "ผู้เชี่ยวชาญผมแอฟโร (Afro Hair)"}
            </h3>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {lang === "en"
                ? "Expert care for thick Afro hair, sharp lineups, and crisp fades."
                : "เชี่ยวชาญการตัดผมแอฟโรโดยเฉพาะ ตัดขอบคมชัด ไล่ทรงสวยสมบูรณ์แบบ"}
            </p>
            <span className="text-amber-500 font-bold text-sm">
              ฿600 - ฿800
            </span>
          </div>
        </div>
      </section>

      {/* 4. GOOGLE REVIEWS SECTION */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-800/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-amber-500/30 px-4 py-2 rounded-full mb-4 shadow-lg">
            <span className="text-amber-500 text-lg">★★★★★</span>
            <span className="text-zinc-200 font-bold text-sm">
              4.9 / 5.0 on Google Maps
            </span>
            <span className="text-zinc-500 text-xs">| 12 Real Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {lang === "en"
              ? "What Our Clients Say"
              : "เสียงตอบรับจากลูกค้าจริง"}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === "en"
              ? "Hover or touch to pause and click any review to view on Google Maps."
              : "นำเมาส์วางหรือแตะเพื่อหยุดอ่าน และกดที่รีวิวเพื่อดูบน Google Maps ได้เลย"}
          </p>
        </div>

        {/* MARQUEE CONTAINER */}
        <div className="relative w-full overflow-hidden py-4 marquee-container">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          {/* MARQUEE TRACK */}
          <div className="flex w-max animate-marquee">
            {[...googleReviews, ...googleReviews].map((rev, i) => (
              <a
                key={i}
                href="https://www.google.com/search?q=stefan+barber+shop+phuket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[300px] sm:w-[360px] bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/60 transition duration-300 p-6 rounded-2xl flex flex-col justify-between shadow-xl mx-3 shrink-0 cursor-pointer hover:scale-[1.02] block group/card"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-amber-400 text-sm tracking-widest">
                      {"★".repeat(rev.rating)}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 group-hover/card:bg-amber-500 group-hover/card:text-zinc-950 transition px-2 py-0.5 rounded">
                      Google Maps ↗
                    </span>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light italic line-clamp-4">
                    "{lang === "en" ? rev.text_en : rev.text_th}"
                  </p>
                </div>

                <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-zinc-100 text-sm group-hover/card:text-amber-400 transition">
                      {rev.name}
                    </h4>
                    <p className="text-zinc-500 text-xs">{rev.badge}</p>
                  </div>
                  <span className="text-zinc-600 text-xs">{rev.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ปุ่มดูรีวิวทั้งหมดด้านล่าง */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=stefan+barber+shop+phuket"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-amber-500 px-6 py-3 rounded-xl text-sm font-semibold transition shadow-md"
          >
            <span>📍</span>
            <span>
              {lang === "en"
                ? "View All Branches & Reviews on Google"
                : "ดูทุกสาขาและรีวิวทั้งหมดบน Google"}
            </span>
          </a>
        </div>
      </section>

      {/* 5. CALL TO ACTION (CTA) SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center border-t border-zinc-800/80">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-10 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "Ready For Your Fresh Cut?"
                : "พร้อมเปลี่ยนลุคใหม่ให้มั่นใจยิ่งขึ้น?"}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              {lang === "en"
                ? "Book your slot today and experience the best barbering in Bangtao & Surin."
                : "จองคิวออนไลน์ล่วงหน้าได้ง่ายๆ ไม่ต้องรอนาน ร้านสะอาด บรรยากาศเป็นกันเอง"}
            </p>
            {/* <Link
              to="/booking"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-10 py-4 rounded-xl transition duration-300 shadow-xl shadow-amber-500/20 text-lg"
            >
              {lang === "en" ? "Book Appointment" : "จองคิวตัดผมตอนนี้"}
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
