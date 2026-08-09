import React from 'react';

export default function Contact() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">GET IN TOUCH</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4">ติดต่อเรา</h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            มีข้อสงสัยเกี่ยวกับบริการหรือต้องการสอบถามคิว สามารถติดต่อเราได้ตามช่องทางด้านล่าง
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-start gap-5">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl text-2xl">📍</div>
              <div>
                <h3 className="font-bold text-lg mb-1">ที่ตั้งร้าน</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
                </p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-start gap-5">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl text-2xl">🕒</div>
              <div>
                <h3 className="font-bold text-lg mb-1">เวลาทำการ</h3>
                <p className="text-zinc-400 text-sm">จันทร์ - อาทิตย์: 10:00 น. - 20:00 น.</p>
                <p className="text-amber-500 text-xs mt-1 font-semibold">* เปิดให้บริการทุกวัน ไม่มีวันหยุด</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-start gap-5">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl text-2xl">📞</div>
              <div>
                <h3 className="font-bold text-lg mb-1">เบอร์โทรศัพท์ & โซเชียล</h3>
                <p className="text-zinc-400 text-sm">โทร: 081-234-5678</p>
                <p className="text-zinc-400 text-sm">Line: @gentlemanbarber</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">ส่งข้อความถึงเรา</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('ส่งข้อความเรียบร้อยแล้ว!'); }}>
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-300">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  required
                  placeholder="กรอกชื่อของคุณ..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-300">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  required
                  placeholder="08X-XXX-XXXX"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-zinc-300">ข้อความ</label>
                <textarea
                  rows="4"
                  required
                  placeholder="พิมพ์ข้อความที่ต้องการสอบถาม..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-lg transition text-sm"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}