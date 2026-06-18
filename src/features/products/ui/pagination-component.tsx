

import { Root } from '../models/product'
import { Dispatch, SetStateAction } from 'react';

export default function PaginationComponent(
  { data, page, setPage, isPlaceholderData }
    : { data: Root | undefined, page: number, setPage: Dispatch<SetStateAction<number>>, isPlaceholderData: boolean }) {
  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 bg-gray-50">
      <button
        onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
        disabled={page === 1}
        className="rounded border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page <span className="text-blue-600">{page}</span>
      </span>

      <button
        onClick={() => {
          if (!isPlaceholderData && (data?.total || 0) > page * 10) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || (data && page * 10 >= data.total)}
        className="rounded border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
