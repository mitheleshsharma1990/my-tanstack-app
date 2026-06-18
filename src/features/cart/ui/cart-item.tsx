import { Product } from '../models/cart'

export default function CartItemRow(
  { item, handleIncrease, handleDecrease }:
    { item: Product, handleIncrease: () => void, handleDecrease: () => void }
) {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      {/* Strict row layout wrapper */}
      <div className="flex flex-row items-center gap-3 sm:gap-6 rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-800">
        {/* 1. Fixed Size Image Container */}
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800 p-1 flex items-center justify-center">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-contain"
          />
          <span className="absolute top-0.5 left-0.5 rounded bg-green-500 px-1 py-0.2 text-[9px] font-bold text-white uppercase">
            -{Math.round(item.discountPercentage)}%
          </span>
        </div>

        {/* 2. Text Content (Titles & Single Unit Price) */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {item.title}
          </h3>
          <p className="hidden xs:block text-[11px] text-gray-400 dark:text-gray-500">
            ID: #{item.id}
          </p>

          <div className="mt-0.5 sm:mt-1 flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              ${(item.discountedTotal / item.quantity).toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ${item.price}
            </span>
          </div>
        </div>

        {/* 3. Compact Horizontal Quantity Controls */}
        <div className="flex-shrink-0 flex items-center rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-0.5 sm:p-1">
          <button
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded text-gray-500 hover:bg-white dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-white transition-colors disabled:opacity-20"
            aria-label="Decrease quantity"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>

          <span className="w-7 sm:w-9 text-center text-xs sm:text-sm font-semibold text-gray-800 dark:text-white select-none">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded text-gray-500 hover:bg-white dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-white transition-colors"
            aria-label="Increase quantity"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* 4. Subtotal Block aligned perfectly to the right */}
        <div className="flex-shrink-0 text-right min-w-[70px] sm:min-w-[90px]">
          <span className="block text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Total
          </span>
          <span className="block text-sm sm:text-lg font-bold text-green-600 dark:text-green-400">
            ${item.discountedTotal.toFixed(2)}
          </span>
          <span className="hidden sm:inline text-xs text-gray-400 line-through">
            ${item.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
