import React from 'react';

export default function Home() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับการลงทะเบียนรับข่าวสารและส่วนลดพิเศษ!');
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-b border-zinc-800 text-center px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6">
            GENTLEMAN BARBER
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            สัมผัสประสบการณ์การตัดผม <br />
            <span className="text-amber-500">ระดับพรีเมียม</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            เราไม่ใช่แค่ร้านตัดผม แต่คือสถานที่เสริมสร้างความมั่นใจ คัดสรรช่างมืออาชีพพร้อมการดูแลเอาใจใส่ในทุกรายละเอียด
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-lg transition duration-300 shadow-lg shadow-amber-500/10"
            >
              จองคิวตัดผมออนไลน์
            </a>
            <a
              href="/services"
              className="w-full sm:w-auto border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 font-semibold px-8 py-3.5 rounded-lg transition duration-300"
            >
              ดูบริการ & ราคา
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
              alt="บรรยากาศร้าน GENTLEMAN BARBER"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">เกี่ยวกับ GENTLEMAN BARBER</h2>
            <p className="text-amber-500 text-lg font-medium mb-6">
              มากกว่า 10 ปีแห่งความประณีตและการบริการที่คุณไว้วางใจได้
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              GENTLEMAN BARBER ก่อตั้งขึ้นด้วยความตั้งใจที่จะมอบประสบการณ์การแต่งทรงผมชายแบบดั้งเดิมผสมผสานกับเทรนด์ยุคใหม่ ไม่ว่าจะเป็นทรงผมสไตล์คลาสสิก ย้อนยุค หรือทรงสตรีทร่วมสมัย ทีมช่างของเราพร้อมให้คำแนะนำและเนรมิตทรงผมที่เข้ากับรูปหน้าและบุคลิกของคุณที่สุด
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-2xl p-2 bg-amber-500/10 rounded-lg">✂️</span>
                <div>
                  <h4 className="font-semibold text-lg">ช่างตัดผมมืออาชีพ</h4>
                  <p className="text-zinc-400 text-sm">ผ่านการฝึกอบรมมาตรฐานสูงและมีประสบการณ์ยาวนาน</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
                <span className="text-2xl p-2 bg-amber-500/10 rounded-lg">💈</span>
                <div>
                  <h4 className="font-semibold text-lg">อุปกรณ์และผลิตภัณฑ์คุณภาพ</h4>
                  <p className="text-zinc-400 text-sm">ใช้อุปกรณ์สะอาดผ่านการฆ่าเชื้อ และผลิตภัณฑ์นำเข้าเกรดพรีเมียม</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEAM SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">พบกับช่างตัดผมของเรา</h2>
          <p className="text-zinc-400 text-base sm:text-lg">ทีมงานผู้เชี่ยวชาญพร้อมเนรมิตทรงผมสุดเท่ให้คุณ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-500/50 transition">
            <div className="w-full h-72 rounded-xl mb-6 overflow-hidden border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=500&q=80"
                alt="Stefan Master Barber"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Stefan</h3>
            <p className="text-amber-500 text-sm font-semibold mb-3">Master Barber (เจ้าของร้าน)</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              เชี่ยวชาญทรง Classic Fade และ Vintage Style สไตล์อเมริกัน
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-500/50 transition">
            <div className="w-full h-72 rounded-xl mb-6 overflow-hidden border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                alt="Alex Senior Barber"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Alex</h3>
            <p className="text-amber-500 text-sm font-semibold mb-3">Senior Barber</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              สาย Street Fashion และ Modern Crop ถนัดการแกะลายเส้น
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-500/50 transition">
            <div className="w-full h-72 rounded-xl mb-6 overflow-hidden border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
                alt="Mike Beard Specialist"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">Mike</h3>
            <p className="text-amber-500 text-sm font-semibold mb-3">Beard & Grooming Specialist</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              ผู้เชี่ยวชาญด้านการตัดแต่งหนวดเคราและการดูแลผิวหน้าผู้ชาย
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">พร้อมเปลี่ยนลุคใหม่ให้มั่นใจกว่าเดิมหรือยัง?</h2>
          <p className="text-zinc-400 text-base sm:text-lg mb-8">
            สำรองคิวล่วงหน้าเพื่อหลีกเลี่ยงการรอคอย เลือกวัน เวลา และช่างที่คุณชอบได้เลย
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/booking"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition duration-300 text-lg shadow-lg shadow-amber-500/10 inline-block"
            >
              จองคิวตัดผมตอนนี้
            </a>
            <a
              href="tel:0812345678"
              className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-8 py-4 rounded-xl transition duration-300 text-lg border border-zinc-700 inline-block"
            >
              📞 081-234-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}