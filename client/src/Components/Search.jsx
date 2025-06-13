import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`)
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 sm:my-12 px-4 sm:px-0">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search destinations..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered w-full bg-black text-white rounded-full px-10 py-2 sm:py-3 text-sm sm:text-base"
        />
        <div className="absolute inset-y-0 left-3 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 sm:h-5 sm:w-5 text-white" 
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
    </div>
  )
}