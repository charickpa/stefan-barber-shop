import emailjs from '@emailjs/browser';

const DEFAULT_OWNER_EMAIL = 'startdoing4you@gmail.com';
const OWNER_EMAIL = import.meta.env.VITE_SHOP_OWNER_EMAIL || DEFAULT_OWNER_EMAIL;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_TEMPLATE_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER || '';
const EMAILJS_TEMPLATE_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER || '';
const EMAILJS_TEMPLATE_CONFIRM = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM || '';

const EMAIL_WEBHOOK_URL = import.meta.env.VITE_EMAIL_WEBHOOK_URL || '';

/**
 * 1. ส่งอีเมลยืนยันการรับจองไปยังลูกค้า
 */
export async function sendCustomerBookingReceived(booking) {
  if (!booking.email) return { success: false, reason: 'no_customer_email' };

  const payload = {
    type: 'customer_received',
    to_email: booking.email,
    customer_name: booking.name,
    customer_phone: booking.phone,
    service: booking.service,
    barber: booking.barber,
    booking_date: booking.booking_date,
    booking_time: booking.booking_time,
    notes: booking.notes || '-',
    subject: '✂️ ได้รับข้อมูลการจองคิวแล้ว - Stefan Master Club Phuket',
    shop_phone: '080-221-0009',
    shop_address: '322, Moo 2, Srisoontorn Road, Bangtao Beach, Phuket'
  };

  return await dispatchEmail(payload, EMAILJS_TEMPLATE_CUSTOMER);
}

/**
 * 2. ส่งอีเมลแจ้งเตือนการจองคิวใหม่ไปยังเจ้าของร้าน (startdoing4you@gmail.com)
 */
export async function sendOwnerBookingAlert(booking) {
  const payload = {
    type: 'owner_alert',
    to_email: OWNER_EMAIL,
    owner_email: OWNER_EMAIL,
    customer_name: booking.name,
    customer_phone: booking.phone,
    customer_email: booking.email || 'ไม่ระบุ',
    service: booking.service,
    barber: booking.barber,
    booking_date: booking.booking_date,
    booking_time: booking.booking_time,
    notes: booking.notes || '-',
    subject: `🔔 มีการจองคิวใหม่จากคุณ ${booking.name} (${booking.booking_date} เวลา ${booking.booking_time})`
  };

  return await dispatchEmail(payload, EMAILJS_TEMPLATE_OWNER);
}

/**
 * 3. ส่งอีเมลแจ้งลูกค้าเมื่อแอดมินกดยืนยันคิว (Confirmed)
 */
export async function sendAdminConfirmedToCustomer(booking) {
  if (!booking.email) return { success: false, reason: 'no_customer_email' };

  const payload = {
    type: 'admin_confirmed',
    to_email: booking.email,
    customer_name: booking.name,
    customer_phone: booking.phone,
    service: booking.service,
    barber: booking.barber,
    booking_date: booking.booking_date,
    booking_time: booking.booking_time,
    notes: booking.notes || '-',
    subject: '🎉 คิวตัดผมของคุณได้รับการยืนยันแล้ว! - Stefan Master Club Phuket',
    shop_phone: '080-221-0009',
    shop_address: '322, Moo 2, Srisoontorn Road, Bangtao Beach, Phuket'
  };

  return await dispatchEmail(payload, EMAILJS_TEMPLATE_CONFIRM);
}

/**
 * ฟังก์ชันกลางสำหรับยิงส่งอีเมล (รองรับ Webhook และ EmailJS)
 */
async function dispatchEmail(payload, emailjsTemplateId) {
  // ทางเลือกที่ 1: ส่งผ่าน Webhook (เช่น Google Apps Script Webhook ที่เชื่อมกับ Gmail ฟรี)
  if (EMAIL_WEBHOOK_URL) {
    try {
      // หมายเหตุ: ต้องใช้ mode: 'no-cors' และ Content-Type: 'text/plain'
      // เพื่อป้องกันไม่ให้เบราว์เซอร์ยิงคำขอ OPTIONS (Preflight) ซึ่ง Google Apps Script ไม่รองรับ
      await fetch(EMAIL_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      console.log('Dispatched email via Webhook successfully:', payload.type, payload.to_email);
      return { success: true, method: 'webhook' };
    } catch (err) {
      console.warn('Webhook email error:', err);
    }
  }

  // ทางเลือกที่ 2: ส่งผ่าน EmailJS SDK
  if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && emailjsTemplateId) {
    try {
      const res = await emailjs.send(
        EMAILJS_SERVICE_ID,
        emailjsTemplateId,
        payload,
        EMAILJS_PUBLIC_KEY
      );
      return { success: res.status === 200, method: 'emailjs' };
    } catch (err) {
      console.warn('EmailJS error:', err);
    }
  }

  // กรณีที่ยังไม่ได้ตั้งค่า คืนค่าพร้อมแจ้งเตือนใน console
  console.info('Email service notification payload (Config pending):', payload);
  return { success: false, reason: 'email_service_not_configured', payload };
}
