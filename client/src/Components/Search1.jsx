import React, { useState } from 'react';

export default function Search() {
  // State untuk filter yang aktif dan visibilitas dropdown
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fungsi untuk menangani klik pada tombol filter utama
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Fungsi untuk menangani klik pada opsi filter di dropdown
  const handleSubFilterClick = (filter) => {
    if (activeSubFilter === filter) {
      setActiveSubFilter(null); // Batalkan pilihan jika diklik lagi
    } else {
      setActiveSubFilter(filter);
    }
    setShowDropdown(false); // Tutup dropdown setelah memilih
  };

  return (
    <div className="bg-black p-4 rounded-lg mb-6">
      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder="search" 
          className="input input-bordered w-full bg-white text-black rounded-2xl px-10 py-2"
        />
        <div className="absolute inset-y-0 left-3 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-black" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>
      
      {/* Filter Options */}
      <div className="relative">
        <button 
          className={`px-4 py-2 rounded-t-lg text-sm w-full text-left flex justify-between items-center ${showDropdown ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          onClick={toggleDropdown}
        >
          {activeSubFilter ? `Filter: ${activeSubFilter.charAt(0).toUpperCase() + activeSubFilter.slice(1)}` : 'Filter'}
          <svg className={`w-4 h-4 inline-block ml-1 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
            <button 
              className={`block w-full text-left px-4 py-2 text-sm ${activeSubFilter === 'price' ? 'bg-gray-200 text-black font-semibold' : 'text-black hover:bg-gray-100'}`}
              onClick={() => handleSubFilterClick('price')}
            >
              Price
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm ${activeSubFilter === 'rating' ? 'bg-gray-200 text-black font-semibold' : 'text-black hover:bg-gray-100'}`}
              onClick={() => handleSubFilterClick('rating')}
            >
              Rating
            </button>
          </div>
        )}
      </div>
    </div>
  );
}