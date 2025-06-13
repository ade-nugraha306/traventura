import React from 'react'
import Navbar from '../Components/Navbar'
import AboutHero from '../Components/AboutHero'
import TeamMember1 from '../assets/zidan.jpg'
import TeamMember2 from '../assets/aldi_ssr.jpg'
import TeamMember3 from '../assets/adeee.jpg'
import TeamMember4 from '../assets/daibahtiar.jpg'
import TeamMember5 from '../assets/tandio.jpg'
import TeamMember6 from '../assets/laode_nayanda.jpg'

export default function About() {
  return (
    <>
      <Navbar />
      <AboutHero />
      
      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember1} alt="Team Member 1" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Muhammad Zidan Nur Fauzi</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">FEBE</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Designer</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember2} alt="Team Member 2" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Gusty Erlana Aldiansyah</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">FEBE</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Frontend Developer</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember3} alt="Team Member 3" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Ade Nugraha</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">FEBE</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Frontend Backend Developer</p>
          </div>
          
          {/* Team Member 4 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember4} alt="Team Member 4" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Muhammad Dai Bahtiar</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">ML</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Machine Learning</p>
          </div>
          
          {/* Team Member 5 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember5} alt="Team Member 5" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Tandio Dwi Oktavian</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">ML</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Machine Learning</p>
          </div>
          
          {/* Team Member 6 */}
          <div className="flex flex-col items-center p-4 sm:p-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 overflow-hidden">
              <img src={TeamMember6} alt="Team Member 6" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-center">Laode Nur Nayanda</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-1">ML</p>
            <p className="text-gray-600 text-sm sm:text-base text-center">Machine Learning</p>
          </div>
        </div>
      </div>
      
      {/* Divider Line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="border-b border-gray-300 my-4 sm:my-6"></div>
      </div>
    </>
  )
}