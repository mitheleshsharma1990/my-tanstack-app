import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails } from '../data-access/products';
import ImageCarousal from '../ui/image-carousal';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate()
  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product-details', id],
    queryFn: () => fetchProductDetails({ id: Number(id) }),
  });

  const editProduct = () => {
    navigate('/products/add', { state: item })
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 font-medium">
        ...loading products
      </div>
    );
  if (isError)
    return (
      <div className="text-red-500 font-bold p-4 bg-red-50 rounded-lg">
        Error: {error.message}
      </div>
    );

  // Calculate original price before discount
  const originalPrice = (
    item ?
      item.price /
      (1 - item.discountPercentage / 100) : 0
  ).toFixed(2);

  return (

    <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 font-sans">
      {/* Header Section: Badges & Title */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Existing Badges */}
        <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
          {item?.brand}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          {item?.category}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item?.stock ?? 0 < 20 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}
        >
          {item?.availabilityStatus} ({item?.stock} left)
        </span>

        {/* FIXED: Placed inside flex wrapper, removed w-full & mb-2, adjusted padding */}
        <button
          onClick={editProduct}
          type="submit"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs py-1 px-3.5 rounded-full shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-3.5 h-3.5" // Scaled icon down slightly to fit small button text
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Edit Product
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
        {item?.title}
      </h1>
      <p className="text-sm text-gray-400 font-mono mb-6">SKU: {item?.sku}</p>
      <ImageCarousal images={item?.images || []} />
      {/* Grid: Split Pricing and Core Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6 mb-6">
        {/* Left Column: Pricing & Rating */}
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500 block mb-1">Price</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-gray-900">
                ${item?.price}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${originalPrice}
              </span>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {item?.discountPercentage}% OFF
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500 block mb-1">Rating</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {/* Simple Star Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-gray-900 font-bold ml-1.5 text-lg">
                  {item?.rating}
                </span>
              </div>
              <span className="text-sm text-gray-400">/ 5.00</span>
            </div>
          </div>
        </div>

        {/* Right Column: Description */}
        <div>
          <span className="text-sm text-gray-500 block mb-1">Description</span>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item?.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item?.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Logistics & Physical Specs */}
      <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-sm">
        <div>
          <span className="text-xs text-gray-400 block uppercase font-semibold">
            Weight
          </span>
          <p className="font-bold text-gray-800 mt-0.5">{item?.weight}g</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 block uppercase font-semibold">
            Dimensions
          </span>
          <p className="font-bold text-gray-800 mt-0.5 text-xs">
            {item?.dimensions.width} x {item?.dimensions.height} x{' '}
            {item?.dimensions.depth} cm
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-400 block uppercase font-semibold">
            Shipping
          </span>
          <p className="font-bold text-gray-800 mt-0.5">
            {item?.shippingInformation}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-400 block uppercase font-semibold">
            Warranty
          </span>
          <p className="font-bold text-gray-800 mt-0.5">
            {item?.warrantyInformation}
          </p>
        </div>
      </div>

      {/* Bottom Section: Customer Reviews Container */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          Customer Reviews
          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
            {item?.reviews.length}
          </span>
        </h3>

        <div className="space-y-3">
          {item?.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border border-gray-100 bg-white p-4 rounded-xl shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-gray-800">
                  {review.reviewerName}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                  <span>★</span> {review.rating}
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
              <span className="text-[10px] text-gray-400 block mt-2">
                {new Date(review.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
