import React, { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sendLineNotification } from '../lib/lineNotification';
import { sendCustomerBookingReceived, sendOwnerBookingAlert } from '../lib/emailService';
import { useLanguage } from '../context/LanguageContext';
import DatePicker from './DatePicker';

const AVAILABLE_TIMES = [
  '10:00 น.',
  '11:30 น.',
  '13:00 น.',
  '14:30 น.',
  '16:00 น.',
  '17:30 น.',
  '19:00 น.'
];

export default function BookingSection({ isStandalonePage = false }) {
  const { lang } = useLanguage();

  const initialForm = {
    name: '',
    phone: '',
    email: '',
    service: 'Haircut + Wash (฿900)',
    barber: 'ช่างท่านใดก็ได้',
    date: '',
    time: '10:00 น.',
    notes: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [checkingSlots, setCheckingSlots] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [bookedTimesForDate, setBookedTimesForDate] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  // ดึงรายการเวลาที่ถูกจองแล้วในวันที่และช่างที่เลือก
  const fetchBookedTimes = useCallback(async (selectedDate, selectedBarber) => {
    if (!selectedDate || !isSupabaseConfigured || !supabase) {
      setBookedTimesForDate([]);
      return;
    }

    setCheckingSlots(true);
    try {
      let query = supabase
        .from('bookings')
        .select('booking_time, barber')
        .eq('booking_date', selectedDate)
        .neq('status', 'cancelled');

      const { data, error } = await query;
      if (error) throw error;

      if (data) {
        const taken = data
          .filter((item) => {
            if (selectedBarber === 'ช่างท่านใดก็ได้') {
              return true;
            }
            return item.barber === selectedBarber || item.barber === 'ช่างท่านใดก็ได้';
          })
          .map((item) => item.booking_time);

        setBookedTimesForDate(taken);
      }
    } catch (err) {
      console.warn('Could not fetch booked times:', err);
    } finally {
      setCheckingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchBookedTimes(formData.date, formData.barber);
    }
  }, [formData.date, formData.barber, fetchBookedTimes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setStatusMessage({
        type: 'warning',
        title: lang === 'en' ? 'Database Not Connected Yet' : 'ยังไม่ได้เชื่อมต่อ Database (Supabase)',
        text: lang === 'en' 
          ? 'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.' 
          : 'ระบบยังไม่ได้รับค่า VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY กรุณาสร้างโปรเจกต์บน Supabase และระบุคีย์ในไฟล์ .env'
      });
      return;
    }

    if (!formData.date) {
      setLoading(false);
      setStatusMessage({
        type: 'warning',
        title: lang === 'en' ? 'Please select a date' : 'กรุณาเลือกวันที่',
        text: lang === 'en' ? 'Please choose your preferred appointment date.' : 'กรุณาเลือกวันที่ต้องการรับบริการก่อนกดยืนยัน'
      });
      return;
    }

    try {
      // 1. ตรวจสอบว่าช่วงเวลานี้ถูกจองไปแล้วหรือไม่ (กันจองซ้ำ)
      let checkQuery = supabase
        .from('bookings')
        .select('id, name, barber')
        .eq('booking_date', formData.date)
        .eq('booking_time', formData.time)
        .neq('status', 'cancelled');

      if (formData.barber !== 'ช่างท่านใดก็ได้') {
        checkQuery = checkQuery.or(`barber.eq."${formData.barber}",barber.eq."ช่างท่านใดก็ได้"`);
      }

      const { data: existingBookings, error: checkError } = await checkQuery;
      if (checkError) throw checkError;

      if (existingBookings && existingBookings.length > 0) {
        setStatusMessage({
          type: 'error',
          title: lang === 'en' ? 'Time Slot Already Booked!' : 'ช่วงเวลานี้มีผู้จองแล้ว!',
          text: lang === 'en'
            ? `Sorry, ${formData.date} at ${formData.time} is already booked for this barber. Please choose a different time.`
            : `ขออภัยครับ วันที่ ${formData.date} เวลา ${formData.time} มีการจองคิวไว้แล้ว กรุณาเลือกช่วงเวลาอื่นหรือเลือกช่างท่านอื่นครับ`
        });
        setLoading(false);
        setBookedTimesForDate((prev) => Array.from(new Set([...prev, formData.time])));
        return;
      }

      // 2. บันทึกข้อมูลการจองลง Database (พร้อมอีเมล)
      const newBooking = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        barber: formData.barber,
        booking_date: formData.date,
        booking_time: formData.time,
        notes: formData.notes.trim() || null,
        status: 'pending'
      };

      const { error: insertError } = await supabase
        .from('bookings')
        .insert([newBooking]);

      if (insertError) throw insertError;

      // 3. ส่งแจ้งเตือนอัตโนมัติในพื้นหลัง (LINE & อีเมล)
      sendLineNotification(newBooking).catch((err) => {
        console.warn('LINE notification background error:', err);
      });

      sendCustomerBookingReceived(newBooking).catch((err) => {
        console.warn('Customer email error:', err);
      });

      sendOwnerBookingAlert(newBooking).catch((err) => {
        console.warn('Owner alert email error:', err);
      });

      setStatusMessage({
        type: 'success',
        title: lang === 'en' ? 'Booking Confirmed!' : 'จองคิวสำเร็จเรียบร้อยแล้ว!',
        text: lang === 'en'
          ? `Thank you ${formData.name}. We have sent a confirmation email to ${formData.email}. Your booking for ${formData.service} on ${formData.date} at ${formData.time} is pending confirmation.`
          : `คุณ ${formData.name} ได้จองบริการ ${formData.service} วันที่ ${formData.date} เวลา ${formData.time} (ช่าง: ${formData.barber}) เรียบร้อยแล้ว ระบบได้ส่งอีเมลยืนยันไปที่ ${formData.email} และทางร้านจะตรวจสอบคิวให้ครับ`
      });

      setBookedTimesForDate((prev) => Array.from(new Set([...prev, formData.time])));
      setFormData(initialForm);
    } catch (err) {
      console.error('Error saving booking:', err);
      setStatusMessage({
        type: 'error',
        title: lang === 'en' ? 'Failed to submit booking' : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
        text: err.message || (lang === 'en' ? 'Could not save your booking. Please try again.' : 'ไม่สามารถบันทึกการจองได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อทางร้านโดยตรง')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className={`w-full ${isStandalonePage ? 'py-16' : 'py-20 border-t border-zinc-800/80'} px-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-amber-500 font-bold text-xs sm:text-sm tracking-widest uppercase">
            {lang === 'en' ? 'ONLINE BOOKING' : 'ระบบจองคิวออนไลน์'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4 tracking-tight">
            {lang === 'en' ? 'Book Your Appointment' : 'จองคิวตัดผมออนไลน์'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            {lang === 'en' 
              ? 'Select your preferred date, time, and service. Instant confirmation sent to your email.' 
              : 'เลือกวัน เวลา และบริการที่ต้องการได้ง่ายๆ พร้อมระบบส่งอีเมลยืนยันอัตโนมัติ'}
          </p>
        </div>

        {/* แจ้งเตือนสถานะ */}
        {statusMessage && (
          <div
            className={`mb-8 p-6 rounded-2xl border transition-all ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : statusMessage.type === 'warning'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl mt-0.5">
                {statusMessage.type === 'success' && '✓'}
                {statusMessage.type === 'warning' && '⚠'}
                {statusMessage.type === 'error' && '✕'}
              </div>
              <div className="grow">
                <h3 className="font-bold text-lg">{statusMessage.title}</h3>
                <p className="text-sm mt-1 opacity-90">{statusMessage.text}</p>
              </div>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="text-sm font-semibold opacity-70 hover:opacity-100 px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">
                {lang === 'en' ? 'Customer Name' : 'ชื่อผู้จอง'} <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                placeholder={lang === 'en' ? 'Your name' : 'กรอกชื่อของคุณ'}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">
                {lang === 'en' ? 'Phone Number' : 'เบอร์โทรศัพท์'} <span className="text-amber-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                placeholder={lang === 'en' ? 'Phone number' : '08X-XXX-XXXX'}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-zinc-300">
              {lang === 'en' ? 'Email Address' : 'อีเมลสำหรับรับการยืนยัน'} <span className="text-amber-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              placeholder={lang === 'en' ? 'your.email@example.com' : 'อีเมลของคุณ (เช่น name@gmail.com)'}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
            />
            <p className="text-xs text-zinc-500 mt-1">
              {lang === 'en' 
                ? 'We will send appointment confirmation and updates to this email.' 
                : 'ระบบจะส่งรายละเอียดคิวและแจ้งเตือนเมื่อแอดมินยืนยันไปยังอีเมลนี้'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">
                {lang === 'en' ? 'Select Service' : 'เลือกบริการ'} <span className="text-amber-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                <option value="Haircut + Wash (฿900)">Haircut + Wash (฿900)</option>
                <option value="Haircut (฿700)">Haircut (฿700)</option>
                <option value="Beard Grooming (฿300)">Beard Grooming (฿300)</option>
                <option value="Haircut & Beard (฿1,000)">Haircut & Beard (฿1,000)</option>
                <option value="Long Hair Scissor Cut & Beard (฿1,200)">Long Hair Scissor Cut & Beard (฿1,200)</option>
                <option value="Kids Haircut (฿500)">Kids Haircut (฿500)</option>
                <option value="Head Shave (฿500)">Head Shave (฿500)</option>
                <option value="Shampoo & Styling (฿300)">Shampoo & Styling (฿300)</option>
                <option value="Highlights (฿2,500+)">Highlights (฿2,500+)</option>
                <option value="Hair Color (฿2,500+)">Hair Color (฿2,500+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">
                {lang === 'en' ? 'Select Barber' : 'เลือกช่างตัดผม'} <span className="text-amber-500">*</span>
              </label>
              <select
                value={formData.barber}
                onChange={(e) => setFormData({ ...formData, barber: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                <option value="ช่างท่านใดก็ได้">{lang === 'en' ? 'Any Barber' : 'ช่างท่านใดก็ได้'}</option>
                <option value="Stefan (Master Barber)">Stefan (Master Barber)</option>
                <option value="Alex (Senior Barber)">Alex (Senior Barber)</option>
                <option value="Mike (Beard Specialist)">Mike (Beard Specialist)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300">
                {lang === 'en' ? 'Date' : 'วันที่ต้องการรับบริการ'} <span className="text-amber-500">*</span>
              </label>
              <DatePicker
                value={formData.date}
                minDate={today}
                lang={lang}
                onChange={(selectedDate) => setFormData({ ...formData, date: selectedDate })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-zinc-300 flex items-center justify-between">
                <span>{lang === 'en' ? 'Time' : 'เวลา'} <span className="text-amber-500">*</span></span>
                {checkingSlots && (
                  <span className="text-xs text-amber-500 animate-pulse font-normal">
                    {lang === 'en' ? 'Checking availability...' : 'กำลังตรวจสอบคิว...'}
                  </span>
                )}
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100"
              >
                {AVAILABLE_TIMES.map((timeSlot) => {
                  const isBooked = bookedTimesForDate.includes(timeSlot);
                  return (
                    <option 
                      key={timeSlot} 
                      value={timeSlot} 
                      disabled={isBooked}
                      className={isBooked ? 'text-zinc-600 bg-zinc-900' : 'text-zinc-100'}
                    >
                      {timeSlot} {isBooked ? (lang === 'en' ? '(Booked - Full)' : '(คิวเต็มแล้ว)') : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-zinc-300">
              {lang === 'en' ? 'Additional Notes (Optional)' : 'หมายเหตุเพิ่มเติม (ถ้ามี)'}
            </label>
            <textarea
              rows="3"
              value={formData.notes}
              placeholder={lang === 'en' ? 'Special requests, hair preferences...' : 'ระบุสไตล์ที่ต้องการ หรือข้อความเพิ่มเติมถึงช่าง...'}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 text-zinc-100 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || (formData.date && bookedTimesForDate.includes(formData.time))}
            className={`w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-4 rounded-xl transition text-base shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer ${
              loading || (formData.date && bookedTimesForDate.includes(formData.time)) 
                ? 'opacity-60 cursor-not-allowed' 
                : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-zinc-950" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{lang === 'en' ? 'Saving Booking...' : 'กำลังบันทึกการจอง...'}</span>
              </>
            ) : (
              lang === 'en' ? 'Confirm Booking' : 'ยืนยันการจองคิว'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
