import React, { useState } from 'react';

export default function Booking() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Haircut & Styling', barber: 'ช่างท่านใดก็ได้', date: '', time: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`จองคิวสำเร็จ!\nคุณ ${formData.name}\nวันที่: ${formData.date} เวลา: ${formData.time}`);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">ONLINE BOOKING</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4">จองคิวตัดผม</h1>
          <p className="text-zinc-400">เลือกวัน เวลา และบริการที่ต้องการได้ง่ายๆ ในไม่กี่ขั้นตอน</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">ชื่อผู้จอง</label>
              <input
                type="text"
                required
                placeholder="กรอกชื่อของคุณ"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                required
                placeholder="08X-XXX-XXXX"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">เลือกบริการ</label>
              <select
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                <option>Haircut & Styling (฿350)</option>
                <option>Beard Trim & Hot Towel (฿250)</option>
                <option>Gentleman Full Combo (฿550)</option>
                <option>Hair Color & Highlight (฿1,200+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">เลือกช่างตัดผม</label>
              <select
                onChange={(e) => setFormData({...formData, barber: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                <option>ช่างท่านใดก็ได้</option>
                <option>Stefan (Master Barber)</option>
                <option>Alex (Senior Barber)</option>
                <option>Mike (Beard Specialist)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">วันที่ต้องการรับบริการ</label>
              <input
                type="date"
                required
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">เวลา</label>
              <select
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                <option>10:00 น.</option>
                <option>11:30 น.</option>
                <option>13:00 น.</option>
                <option>14:30 น.</option>
                <option>16:00 น.</option>
                <option>17:30 น.</option>
                <option>19:00 น.</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 rounded-xl transition text-base shadow-lg shadow-amber-500/20"
          >
            ยืนยันการจองคิว
          </button>
        </form>
      </div>
    </div>
  );
}