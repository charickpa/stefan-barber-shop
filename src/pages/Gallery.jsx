import React, { useState } from 'react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Fade', 'Vintage', 'Modern', 'Beard'];

  const photos = [
    {
      title: 'Low Taper Fade',
      category: 'Fade',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Classic Side Part',
      category: 'Vintage',
      image: 'https://images.unsplash.com/photo-1517832606589-7150047352f2?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Modern Textured Crop',
      category: 'Modern',
      image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Beard Grooming & Shape',
      category: 'Beard',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Mid Skin Fade',
      category: 'Fade',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Slick Back Undercut',
      category: 'Vintage',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const filteredPhotos = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">PORTFOLIO</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-2 mb-4">ผลงานทรงผมของเรา</h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            ตัวอย่างทรงผมจริงจากลูกค้าที่เข้ามาใช้บริการที่ GENTLEMAN BARBER
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                filter === cat
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, index) => (
            <div
              key={index}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition duration-300"
            >
              <div className="h-72 overflow-hidden bg-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 bg-zinc-900 border-t border-zinc-800">
                <span className="text-xs text-amber-500 font-bold uppercase">{item.category}</span>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}