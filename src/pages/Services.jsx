import React from 'react';

export default function Services() {
  const serviceList = [
    { title: 'Haircut & Styling', price: '350', time: '45 นาที', desc: 'สระผม ตัดแต่งทรงผมตามต้องการ สระทำความสะอาด และเซ็ตทรงด้วยเซรั่มพรีเมียม' },
    { title: 'Beard Trim & Hot Towel', price: '250', time: '30 นาที', desc: 'ตัดแต่งทรงหนวดเครา ประคบผ้าหรุ่ม สครับผิวหน้า และโกนอย่างนุ่มนวล' },
    { title: 'Gentleman Full Combo', price: '550', time: '75 นาที', desc: 'บริการครบสูตร: ตัดผม + สระ + ตกแต่งหนวดเครา + ประคบผ้าหรุ่ม + นวดผ่อนคลาย', highlight: true },
    { title: 'Hair Color & Highlight', price: '1,200+', time: '90 นาที', desc: 'ทำสีผม ปิดผมขาว หรือไฮไลท์ตามเทรนด์ ด้วยผลิตภัณฑ์คุณภาพสูงถนอมหนังศีรษะ' },
    { title: 'Scalp Detox Treatment', price: '600', time: '45 นาที', desc: 'ทรีตเมนต์สปาหนังศีรษะ ขจัดสิ่งสกปรกและรังแค พร้อมนวดศีรษะผ่อนคลายความเครียด' },
    { title: 'Kids Haircut (อายุไม่เกิน 10 ขวบ)', price: '250', time: '30 นาที', desc: 'บริการตัดผมเด็ก โดยช่างผู้เชี่ยวชาญที่มีความใจเย็นและละเมียดละไม' },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">OUR SERVICES</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4">บริการ & ราคา</h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            เลือกรับบริการดูแลทรงผมและบุคลิกภาพอย่างมืออาชีพ คัดสรรวัตถุดิบและอุปกรณ์คุณภาพมาตรฐานสูง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-zinc-900 border ${
                item.highlight ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-zinc-800'
              } flex flex-col justify-between hover:border-zinc-700 transition`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-zinc-100">{item.title}</h3>
                  <span className="text-amber-400 font-extrabold text-2xl">฿{item.price}</span>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6 text-sm">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-500 font-medium">⏱️ {item.time}</span>
                <a href="/booking" className="text-amber-400 hover:text-amber-300 font-bold text-sm flex items-center gap-1">
                  จองบริการนี้ &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}