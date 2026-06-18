import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { fetchProducts } from '../data-access/products';

const options = {
  root: null,
  rootMargin: '0px', // Triggers slightly before reaching the bottom
  threshold: 1.0, // Triggers when the sentinel is 100% visible
};

export default function ProductsView() {
  const title = "Infinite Products View"
  const triggerRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + 10;
      return nextSkip < lastPage.total ? nextSkip : undefined
    },
  });
  useEffect(() => {
    const currentTarget = triggerRef.current;
    if (!currentTarget) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, options);
    observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'error') return <div className="text-red-500 font-bold p-4 bg-red-50 rounded-lg">Error loading products</div>;

  return <div className="min-h-screen bg-gray-50 p-6 font-sans">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">{title}</h1>

    {status === 'pending' && <div className="flex justify-center items-center py-20 text-gray-500 font-medium">...loading products</div>}
    {status !== 'pending' && (
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          data.pages.flatMap((page) => page.products).map((product) => {
            return (
              // Flexbox card layout
              <li key={product.id} className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{product.category}</span>
                  <p className="font-semibold text-gray-800 text-lg mt-3 line-clamp-2">{product.title}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <p className="text-xl font-bold text-gray-900">${product.price}</p>
                </div>
              </li>
            );
          })
        }
      </ol>
    )}
    <div ref={triggerRef} style={{ padding: '20px', textAlign: 'center' }}>
      {isFetchingNextPage
        ? 'Loading more...'
        : hasNextPage
          ? 'Scroll down to load more'
          : 'No more items to load'}
    </div>
  </div>
}
