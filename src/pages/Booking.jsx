import React from 'react';
import BookingSection from '../components/BookingSection';

export default function Booking() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      <BookingSection isStandalonePage={true} />
    </div>
  );
}