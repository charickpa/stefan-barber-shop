import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navbar
    home: "Home",
    services: "Services & Pricing",
    gallery: "Gallery",
    contact: "Contact Us",
    bookNow: "Call to Book",
    
    // Home Hero
    heroTag: "STEFAN MASTER CLUB PHUKET",
    heroTitle1: "Experience Premium",
    heroTitle2: "Grooming & Haircuts",
    heroDesc: "We're more than just a barbershop. We are a place to build confidence, featuring professional barbers who pay attention to every detail.",
    viewServices: "View Services",

    // Stats
    statExperience: "Years Experience",
    statClients: "Happy Clients",
    statBarbers: "Master Barbers",
    statRating: "Google Rating",

    // Popular Services Section
    popularTitle: "Popular Services",
    popularSub: "Crafted for the modern gentleman",

    // About Section
    aboutTitle: "About STEFAN MASTER CLUB",
    aboutSub: "Over 10 years of craft, precision, and trusted service.",
    aboutDesc: "STEFAN MASTER CLUB PHUKET was created with the vision to deliver traditional male grooming blended with modern styles—whether classic, vintage, or street style.",
    proBarbers: "Professional Barbers",
    proBarbersDesc: "High standards of training and years of experience.",
    qualityProducts: "Quality Equipment & Products",
    qualityProductsDesc: "Sterilized tools and premium imported grooming products.",

    // Testimonials / Google Reviews
    reviewsTitle: "What Our Clients Say",
    reviewsSub: "Real feedback from local and international clients on Google",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSub: "Everything you need to know before visiting us",

    // CTA Section
    ctaTitle: "Ready for a confident new look?",
    ctaSub: "Call us today to reserve your slot or walk in directly.",

    // Footer & Info
    brandDesc: "Elevate your style and confidence with our premium haircut and grooming services in Phuket.",
    quickLinks: "Quick Links",
    hours: "Opening Hours",
    satThuHours: "Sat - Thu: 10:00 AM - 09:00 PM",
    friHours: "Friday: 02:00 PM - 09:00 PM",
    contactInfo: "Contact Us",
    address: "322, Moo 2, Srisoontorn Road, Bangtao Beach, Cherngtalay Thalang, Phuket 83110",
  },
  th: {
    // Navbar
    home: "หน้าแรก",
    services: "บริการ & ราคา",
    gallery: "ผลงานทรงผม",
    contact: "ติดต่อเรา",
    bookNow: "โทรจองคิว",

    // Home Hero
    heroTag: "STEFAN MASTER CLUB PHUKET",
    heroTitle1: "สัมผัสประสบการณ์การตัดผม",
    heroTitle2: "ระดับพรีเมียม",
    heroDesc: "เราไม่ใช่แค่ร้านตัดผม แต่คือสถานที่เสริมสร้างความมั่นใจ คัดสรรช่างมืออาชีพพร้อมการดูแลเอาใจใส่ในทุกรายละเอียด",
    viewServices: "ดูบริการ & ราคา",

    // Stats
    statExperience: "ปีแห่งประสบการณ์",
    statClients: "ลูกค้าประทับใจ",
    statBarbers: "ช่างมืออาชีพ",
    statRating: "คะแนน รีวิว Google",

    // Popular Services Section
    popularTitle: "บริการยอดนิยม",
    popularSub: "รังสรรค์ทรงผมสุดประณีตเพื่อคุณ",

    // About Section
    aboutTitle: "เกี่ยวกับ STEFAN MASTER CLUB",
    aboutSub: "มากกว่า 10 ปีแห่งความประณีตและการบริการที่คุณไว้วางใจได้",
    aboutDesc: "STEFAN MASTER CLUB PHUKET ก่อตั้งขึ้นด้วยความตั้งใจที่จะมอบประสบการณ์การแต่งทรงผมชายแบบดั้งเดิมผสมผสานกับเทรนด์ยุคใหม่",
    proBarbers: "ช่างตัดผมมืออาชีพ",
    proBarbersDesc: "ผ่านการฝึกอบรมมาตรฐานสูงและมีประสบการณ์ยาวนาน",
    qualityProducts: "อุปกรณ์และผลิตภัณฑ์คุณภาพ",
    qualityProductsDesc: "ใช้อุปกรณ์สะอาดผ่านการฆ่าเชื้อ และผลิตภัณฑ์นำเข้าเกรดพรีเมียม",

    // Testimonials / Google Reviews
    reviewsTitle: "ความประทับใจจากลูกค้า",
    reviewsSub: "รีวิวจากลูกค้าจริงทั้งชาวไทยและต่างชาติบน Google",

    // FAQ Section
    faqTitle: "คำถามที่พบบ่อย (FAQ)",
    faqSub: "ข้อควรรู้เบื้องต้นก่อนเข้าใช้บริการ",

    // CTA Section
    ctaTitle: "พร้อมเปลี่ยนลุคใหม่ให้มั่นใจกว่าเดิมหรือยัง?",
    ctaSub: "โทรหาเราวันนี้เพื่อสำรองคิวล่วงหน้า หรือเดินทางเข้ามาที่ร้านได้เลย",

    // Footer & Info
    brandDesc: "ยกระดับสไตล์และบุคลิกภาพของคุณด้วยบริการตัดผมและเซ็ตทรงระดับพรีเมียม",
    quickLinks: "เมนูด่วน",
    hours: "เวลาเปิดทำการ",
    satThuHours: "เสาร์ - พฤหัสบดี: 10:00 - 21:00 น.",
    friHours: "ศุกร์: 14:00 - 21:00 น.",
    contactInfo: "ติดต่อเรา",
    address: "322 หมู่ 2 ถ.ศรีสุนทร หาดบางเทา ต.เชิงทะเล อ.ถลาง จ.ภูเก็ต 83110",
  }
};

const LanguageContext = createContext();

// 1. เพิ่ม export หน้า LanguageProvider
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'th' : 'en'));
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 2. เพิ่ม export หน้า useLanguage
export function useLanguage() {
  return useContext(LanguageContext);
}