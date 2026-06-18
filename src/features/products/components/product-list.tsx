import PaginationComponent from '../ui/pagination-component';
import { getProducts, deleteProduct } from '../data-access/products';
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import ProductCard from '../ui/product-card';
import { useNavigate, useOutletContext } from 'react-router-dom';
export default function ProductList() {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { searchText } = useOutletContext<{ searchText: string }>();
  const { data, isLoading, isPlaceholderData, isError, error } = useQuery({
    queryKey: ['products', searchText, page],
    queryFn: () => getProducts({ query: searchText, skip: page }),
    placeholderData: keepPreviousData,
  });
  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleShowDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleDelete = (id: number) => {
    deleteProductMutate({ id: id });
  };

  if (isError)
    return (
      <div className="text-red-500 font-bold p-4 bg-red-50 rounded-lg">
        Error: {error.message}
      </div>
    );

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center py-20 text-gray-500 font-medium">
          ...loading products
        </div>
      )}

      {!isLoading && (
        <ol className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.products?.map((product) => {
            return (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  handleShowDetails={handleShowDetails}
                  handleDelete={handleDelete}
                />
              </li>
            );
          })}
        </ol>
      )}

      <PaginationComponent
        data={data}
        page={page}
        setPage={setPage}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
}
