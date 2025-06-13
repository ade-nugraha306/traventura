import React from 'react'

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto my-12 sm:my-16 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Simple For You</h2>
      
      <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-16">
        {/* Feature 1 */}
        <div className="flex flex-col items-center max-w-[220px] mx-auto sm:mx-0 text-center">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Detail Describe</h3>
          <p className="text-xs sm:text-sm text-gray-600">Giving you detail information about the destination describe</p>
        </div>
        
        {/* Feature 2 */}
        <div className="flex flex-col items-center max-w-[220px] mx-auto sm:mx-0 text-center">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Easy to Find</h3>
          <p className="text-xs sm:text-sm text-gray-600">Easy to use for finding your vacation destination</p>
        </div>
        
        {/* Feature 3 */}
        <div className="flex flex-col items-center max-w-[220px] mx-auto sm:mx-0 text-center">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </div>
          <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Clear Information</h3>
          <p className="text-xs sm:text-sm text-gray-600">Provide clean information based on recent data sets</p>
        </div>
      </div>
    </div>
  )
}