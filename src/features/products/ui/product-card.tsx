import { Product } from "../models/product";

export default function ProductCard(
  { product, handleShowDetails, handleDelete }: {
    product: Product,
    handleShowDetails: (id: number) => void,
    handleDelete: (id: number) => void,
  }
) {
  return <div
    key={product.id}
    className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
  >
    <div>
      <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 border border-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>

      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
        {product.category}
      </span>
      <p className="font-semibold text-gray-800 text-lg mt-3 line-clamp-2">
        {product.title}
      </p>
    </div>

    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
      <span className="text-sm text-gray-500">Price</span>
      <p className="text-xl font-bold text-gray-900">
        ${product.price}
      </p>
    </div>

    <div className="flex items-center gap-2 mt-4 w-full">
      <button
        onClick={() => handleShowDetails(product.id)}
        className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
        Show Details
      </button>

      <button
        onClick={() => handleDelete(product.id)}
        className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
        Delete
      </button>
    </div>
  </div>
}