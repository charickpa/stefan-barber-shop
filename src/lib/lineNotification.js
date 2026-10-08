/**
 * ส่งการแจ้งเตือนการจองคิวใหม่ไปยัง LINE
 * รองรับทั้ง Webhook URL (Make.com, Zapier, Cloudflare Worker หรือ Google Apps Script)
 */
export async function sendLineNotification(booking) {
  const webhookUrl = import.meta.env.VITE_LINE_WEBHOOK_URL;

  if (!webhookUrl) {
    // ไม่ได้ตั้งค่า Webhook ใน .env ข้ามการส่ง
    return { success: false, reason: 'no_webhook_configured' };
  }

  const message = 
    `💈 มีการจองคิวตัดผมใหม่!\n` +
    `━━━━━━━━━━━━━━━\n` +
    `👤 คุณ: ${booking.name}\n` +
    `📞 เบอร์โทร: ${booking.phone}\n` +
    `✂️ บริการ: ${booking.service}\n` +
    `💈 ช่าง: ${booking.barber}\n` +
    `📅 วันที่: ${booking.booking_date}\n` +
    `⏰ เวลา: ${booking.booking_time}\n` +
    (booking.notes ? `📝 หมายเหตุ: ${booking.notes}\n` : '') +
    `━━━━━━━━━━━━━━━\n` +
    `📍 Stefan Master Club Phuket`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...booking,
        message,
        text: message,
      }),
    });

    return { success: response.ok };
  } catch (error) {
    console.warn('LINE Notification could not be sent:', error);
    return { success: false, error: error.message };
  }
}
