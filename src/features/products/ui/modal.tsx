
import { createPortal } from 'react-dom'
import { ReactNode } from 'react';

export default function Modal({ isOpen, onClose, children }:
  { isOpen: boolean, onClose: () => void, children: ReactNode }
) {
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card: Animates smoothly, sets a max-width, and handles clipping */}
      <div
        className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 scale-100 ease-out dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button: Positioned in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Dynamic Content Container */}
        <div className="mt-2 text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}