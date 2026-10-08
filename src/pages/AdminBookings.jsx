import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { sendAdminConfirmedToCustomer } from '../lib/emailService';
import { useLanguage } from '../context/LanguageContext';

export default function AdminBookings() {
  const { lang } = useLanguage();

  // ระบบตรวจสอบสิทธิ์ด้วยรหัสผ่านผู้ดูแลระบบ
  const DEFAULT_PIN = import.meta.env.VITE_ADMIN_PIN || 'Stefan0987';
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ข้อมูลการจอง
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState(null);

  // ตัวกรอง (Filters)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // ฟังก์ชันดึงข้อมูลจาก Supabase
  const fetchBookings = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setError('ยังไม่ได้ตั้งค่าการเชื่อมต่อกับ Supabase');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchErr } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false })
        .order('booking_time', { ascending: true });

      if (fetchErr) throw fetchErr;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'ไม่สามารถดึงข้อมูลรายการจองได้');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, fetchBookings]);

  // ตรวจสอบรหัส PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPinInput('');
  };

  // อัปเดตสถานะคิวการจอง
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error: updateErr } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateErr) throw updateErr;

      const targetBooking = bookings.find((b) => b.id === id);

      // เมื่อแอดมินกดยืนยันคิว ให้ส่งอีเมลแจ้งเตือนลูกค้าอัตโนมัติ
      if (newStatus === 'confirmed' && targetBooking && targetBooking.email) {
        sendAdminConfirmedToCustomer(targetBooking).catch((err) => {
          console.warn('Customer confirmation email error:', err);
        });
        setNoticeMessage(`✓ ยืนยันคิวของคุณ ${targetBooking.name} เรียบร้อยแล้ว (ระบบส่งอีเมลแจ้งเตือนไปที่ ${targetBooking.email})`);
      } else {
        setNoticeMessage(`✓ อัปเดตสถานะคิวเป็น "${newStatus}" เรียบร้อยแล้ว`);
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ: ' + err.message);
    }
  };

  // ลบคิวการจอง
  const handleDeleteBooking = async (id, customerName) => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบคิวของ "${customerName}"?`)) {
      return;
    }

    try {
      const { error: deleteErr } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (deleteErr) throw deleteErr;

      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการลบ: ' + err.message);
    }
  };

  // กรองข้อมูลตามคำค้นหา วันที่ และสถานะ
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      (b.email && b.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.barber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ? true : b.status === statusFilter;

    const matchesDate =
      !dateFilter ? true : b.booking_date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // สรุปยอด
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const todayCount = bookings.filter((b) => b.booking_date === todayStr && b.status !== 'cancelled').length;

  // หากยังไม่ได้ใส่ PIN แสดงหน้าจอปลดล็อค
  if (!isAuthenticated) {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
            🔒
          </div>
          <h2 className="text-2xl font-black mb-2">ระบบจัดการการจองคิว</h2>
          <p className="text-zinc-400 text-sm mb-6">
            กรุณากรอกรหัสผ่านสำหรับผู้ดูแลระบบเพื่อเข้าถึงข้อมูล
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoFocus
                maxLength={30}
                placeholder="กรอกรหัสผ่านผู้ดูแลระบบ"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 pr-12 text-center text-lg tracking-wider text-zinc-100 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 cursor-pointer text-sm"
                title={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {pinError && (
              <p className="text-rose-400 text-xs font-semibold">
                รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <div className="mt-6">
            <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition">
              ← กลับสู่หน้าหลักร้านตัดผม
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold text-xs tracking-widest uppercase">ADMIN PANEL</span>
              <span className="bg-zinc-800 text-zinc-400 text-xs px-2.5 py-0.5 rounded-full">Stefan Master Club</span>
            </div>
            <h1 className="text-3xl font-black mt-1">รายการจองคิวทั้งหมด</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-zinc-200 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              <span className={loading ? 'animate-spin' : ''}>🔄</span>
              <span>{loading ? 'กำลังโหลด...' : 'รีเฟรช'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-zinc-900 border border-zinc-800 hover:bg-rose-950/40 hover:border-rose-500 text-zinc-400 hover:text-rose-300 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* SUMMARY STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <p className="text-xs text-zinc-400 uppercase font-semibold">คิวทั้งหมด</p>
            <p className="text-3xl font-black text-zinc-100 mt-2">{totalCount}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <p className="text-xs text-amber-500 uppercase font-semibold">รอยืนยัน (Pending)</p>
            <p className="text-3xl font-black text-amber-400 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <p className="text-xs text-emerald-400 uppercase font-semibold">ยืนยันแล้ว (Confirmed)</p>
            <p className="text-3xl font-black text-emerald-400 mt-2">{confirmedCount}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <p className="text-xs text-cyan-400 uppercase font-semibold">คิววันนี้ (Today)</p>
            <p className="text-3xl font-black text-cyan-300 mt-2">{todayCount}</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-6 rounded-2xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">ค้นหา (ชื่อ / เบอร์ / บริการ)</label>
              <input
                type="text"
                placeholder="พิมพ์เพื่อค้นหา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">สถานะ</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="all">ทั้งหมด ทุกสถานะ</option>
                <option value="pending">รอยืนยัน (Pending)</option>
                <option value="confirmed">ยืนยันแล้ว (Confirmed)</option>
                <option value="completed">เสร็จสิ้น (Completed)</option>
                <option value="cancelled">ยกเลิกแล้ว (Cancelled)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">เลือกวันที่</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 rounded-lg cursor-pointer"
                  >
                    ล้าง
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        {noticeMessage && (
          <div className="bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 p-4 rounded-xl mb-6 flex items-center justify-between">
            <div>{noticeMessage}</div>
            <button
              onClick={() => setNoticeMessage(null)}
              className="text-xs opacity-70 hover:opacity-100 font-bold px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="bg-rose-950/40 border border-rose-500/50 text-rose-200 p-4 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="py-4 px-4">วันที่ / เวลา</th>
                  <th className="py-4 px-4">ลูกค้า</th>
                  <th className="py-4 px-4">บริการ</th>
                  <th className="py-4 px-4">ช่าง</th>
                  <th className="py-4 px-4">หมายเหตุ</th>
                  <th className="py-4 px-4">สถานะ</th>
                  <th className="py-4 px-4 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-zinc-500">
                      {loading ? 'กำลังโหลดข้อมูลการจอง...' : 'ไม่พบรายการจองตามเงื่อนไขที่เลือก'}
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-zinc-800/40 transition">
                      {/* วันที่และเวลา */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-zinc-100">{b.booking_date}</div>
                        <div className="text-amber-500 text-xs font-semibold">{b.booking_time}</div>
                      </td>

                      {/* ข้อมูลลูกค้า */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-zinc-100">{b.name}</div>
                        <a
                          href={`tel:${b.phone}`}
                          className="text-xs text-amber-500 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          📞 {b.phone}
                        </a>
                        {b.email && (
                          <a
                            href={`mailto:${b.email}`}
                            className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 mt-0.5"
                          >
                            ✉️ {b.email}
                          </a>
                        )}
                      </td>

                      {/* บริการ */}
                      <td className="py-4 px-4 whitespace-nowrap text-zinc-200 font-medium">
                        {b.service}
                      </td>

                      {/* ช่างตัดผม */}
                      <td className="py-4 px-4 whitespace-nowrap text-zinc-300">
                        {b.barber}
                      </td>

                      {/* หมายเหตุ */}
                      <td className="py-4 px-4 text-zinc-400 text-xs max-w-xs truncate">
                        {b.notes || '-'}
                      </td>

                      {/* สถานะ */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : b.status === 'completed'
                              ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                              : b.status === 'cancelled'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {b.status === 'confirmed' && '✓ ยืนยันแล้ว'}
                          {b.status === 'completed' && '🏁 เสร็จสิ้น'}
                          {b.status === 'cancelled' && '✕ ยกเลิก'}
                          {b.status === 'pending' && '⏳ รอยืนยัน'}
                        </span>
                      </td>

                      {/* ปุ่มจัดการ */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {b.status !== 'confirmed' && b.status !== 'completed' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                              title="ยืนยันคิว"
                              className="bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              ยืนยัน
                            </button>
                          )}
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'completed')}
                              title="บริการเสร็จสิ้น"
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              เสร็จสิ้น
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                              title="ยกเลิกคิว"
                              className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-700/60 text-rose-300 text-xs px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              ยกเลิก
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(b.id, b.name)}
                            title="ลบข้อมูล"
                            className="text-zinc-600 hover:text-rose-400 p-1.5 transition cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
