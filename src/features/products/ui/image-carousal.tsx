

import { useState } from 'react';


export default function ImageCarousal({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return <div className="group relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 border border-gray-50">
    {/* Fallback if images array is empty */}
    {(!images || images.length === 0) ? (
      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
        No Image Available
      </div>
    ) : (
      <>
        {/* Main Active Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Navigation Controls (Visible on Card Hover if multiple images exist) */}
        {images.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-sm backdrop-blur-xs transition-opacity duration-200 opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center border border-gray-200"
            >
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-sm backdrop-blur-xs transition-opacity duration-200 opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center border border-gray-200"
            >
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Bottom Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-xs">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-200 ${index === currentIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </>
    )}
  </div>

}