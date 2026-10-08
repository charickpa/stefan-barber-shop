import React, { useState, useRef, useEffect } from 'react';

const MONTH_NAMES_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const WEEKDAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function DatePicker({ value, onChange, minDate, lang = 'th' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // วันที่ปัจจุบันสำหรับใช้เป็นเกณฑ์
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const effectiveMinDate = minDate || todayStr;

  // เดือนและปีที่กำลังดูในปฏิทิน
  const initialDate = value ? new Date(value) : today;
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  // เมื่อ value เปลี่ยน ปรับเดือนและปีให้ตรงกัน
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentYear(d.getFullYear());
        setCurrentMonth(d.getMonth());
      }
    }
  }, [value]);

  // ปิดปฏิทินเมื่อคลิกด้านนอก
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // เลื่อนเดือน
  const prevMonth = (e) => {
    e.preventDefault();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = (e) => {
    e.preventDefault();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // คำนวณวันในเดือน
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // จัดการเลือกวัน
  const handleSelectDay = (day) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateString = `${currentYear}-${monthStr}-${dayStr}`;

    if (dateString < effectiveMinDate) return;

    onChange(dateString);
    setIsOpen(false);
  };

  // ปุ่มลัด: วันนี้
  const selectToday = (e) => {
    e.preventDefault();
    onChange(todayStr);
    setIsOpen(false);
  };

  // ปุ่มลัด: พรุ่งนี้
  const selectTomorrow = (e) => {
    e.preventDefault();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    onChange(tomorrowStr);
    setIsOpen(false);
  };

  // จัดรูปแบบแสดงผล
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    if (lang === 'en') {
      return `${day} ${MONTH_NAMES_EN[monthIndex]} ${year}`;
    }
    // ภาษาไทย แสดง พ.ศ. (+543)
    return `${day} ${MONTH_NAMES_TH[monthIndex]} ${year + 543}`;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-zinc-950 border ${
          isOpen ? 'border-amber-500' : 'border-zinc-800'
        } hover:border-zinc-700 rounded-lg p-3 text-sm text-left flex items-center justify-between transition focus:outline-none cursor-pointer`}
      >
        <span className={value ? 'text-zinc-100 font-semibold' : 'text-zinc-500'}>
          {value ? formatDisplayDate(value) : (lang === 'en' ? 'Select Date...' : 'เลือกวันที่รับบริการ...')}
        </span>
        <span className="text-amber-500 text-base">📅</span>
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-80 bg-zinc-900 border border-zinc-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {/* Shortcuts */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
            <button
              type="button"
              onClick={selectToday}
              className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs py-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/50 transition cursor-pointer"
            >
              {lang === 'en' ? 'Today' : 'วันนี้'}
            </button>
            <button
              type="button"
              onClick={selectTomorrow}
              className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs py-1.5 rounded-lg border border-zinc-800 hover:border-amber-500/50 transition cursor-pointer"
            >
              {lang === 'en' ? 'Tomorrow' : 'พรุ่งนี้'}
            </button>
          </div>

          {/* Month / Year Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition cursor-pointer"
            >
              ‹
            </button>
            <div className="text-sm font-bold text-zinc-100">
              {lang === 'en'
                ? `${MONTH_NAMES_EN[currentMonth]} ${currentYear}`
                : `${MONTH_NAMES_TH[currentMonth]} ${currentYear + 543}`}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {(lang === 'en' ? WEEKDAYS_EN : WEEKDAYS_TH).map((w, idx) => (
              <span
                key={idx}
                className={`text-xs font-semibold ${
                  idx === 0 ? 'text-rose-400' : 'text-zinc-500'
                }`}
              >
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Blank padding days for first week */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`blank-${idx}`} className="h-8 w-8" />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const mStr = String(currentMonth + 1).padStart(2, '0');
              const dStr = String(day).padStart(2, '0');
              const thisDateStr = `${currentYear}-${mStr}-${dStr}`;

              const isPast = thisDateStr < effectiveMinDate;
              const isSelected = value === thisDateStr;
              const isToday = todayStr === thisDateStr;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/30'
                      : isPast
                      ? 'text-zinc-600 cursor-not-allowed opacity-40'
                      : isToday
                      ? 'border border-amber-500 text-amber-400 hover:bg-zinc-800'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-amber-400'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
