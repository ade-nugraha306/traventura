import React from 'react'
import Background from '../assets/aboutthumbnail.png'

export default function AboutHero() {
  return (
    <div className="w-full bg-black py-20">
       <div className="bg-cover bg-center h-[600px]" style={{ 
        backgroundImage:  `url(${Background})`,
      }}>
      </div>
    </div>
  )
} 
