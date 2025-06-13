import React from 'react'
import Navbar from '../Components/Navbar'
import frame4 from '../assets/Frame4.png'
import frame5 from '../assets/Frame5.png'
import frame6 from '../assets/Frame6.png'
import highlight1 from '../assets/highlight1.png'

export default function Highlight() {
  // Sample data for highlights
  const highlights = [
    {
      id: 1,
      image: frame4,
      location: "Bali Gate",
    },
    {
      id: 2,
      image: frame5,
      location: "River Adventure",
    },
    {
      id: 3,
      image: frame6,
      location: "Mountain View",
    }
  ]
  
  return (
    <>
      <Navbar />
      <div className="w-full max-w-[600px] mx-auto pb-4">
        {/* Title with proper spacing */}
        <h1 className="text-3xl font-bold pl-5 py-5 text-gray-800 tracking-tight">Vacation Highlight</h1>

        {/* Banner image with gradient overlay */}
        <div className="w-full h-[110px] rounded-xl overflow-hidden relative mb-8 shadow-md">
          <img 
            src={highlight1} 
            alt="Travel items banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Main highlight cards */}
        <div className="px-4 grid grid-cols-1 gap-6">
          {highlights.map((item) => (
            <div key={item.id} className="rounded-2xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.025] hover:shadow-xl cursor-pointer">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt="Vacation highlight" 
                  className="w-full h-[170px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2">
                  <span className="text-white font-semibold text-lg drop-shadow">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}