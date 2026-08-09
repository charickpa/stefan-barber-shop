import React from 'react';

// เพิ่ม export default ตรงนี้
export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div className="md:col-span-1">
          <a href="/" className="flex items-center gap-2 text-xl font-black text-zinc-100 mb-3">
            <span>✂️</span>
            <span className="text-amber-500">GENTLEMAN</span>
            <span>BARBER</span>
          </a>
          <p className="text-sm leading-relaxed text-zinc-400">
            ยกระดับสไตล์และบุคลิกภาพของคุณด้วยบริการตัดผมและเซ็ตทรงระดับพรีเมียม
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">เมนูด่วน</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-amber-400 transition">หน้าแรก</a></li>
            <li><a href="/services" className="hover:text-amber-400 transition">บริการ & ราคา</a></li>
            <li><a href="/gallery" className="hover:text-amber-400 transition">ผลงานทรงผม</a></li>
            <li><a href="/booking" className="hover:text-amber-400 transition">จองคิวตัดผม</a></li>
          </ul>
        </div>

        {/* Service Hours */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">เวลาเปิดทำการ</h4>
          <ul className="space-y-2 text-sm">
            <li>จันทร์ - ศุกร์: 10:00 - 20:00 น.</li>
            <li>เสาร์ - อาทิตย์: 09:00 - 20:00 น.</li>
            <li className="text-amber-500 font-medium">* เปิดบริการทุกวัน</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-zinc-100 font-bold mb-4 text-sm uppercase tracking-wider">ติดต่อเรา</h4>
          <p className="text-sm mb-2">📞 081-234-5678</p>
          <p className="text-sm mb-2">💬 Line: @gentlemanbarber</p>
          <p className="text-sm">📍 สุขุมวิท กรุงเทพมหานคร</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800/80 pt-6 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} GENTLEMAN BARBER. All rights reserved.
      </div>
    </footer>
  );
}