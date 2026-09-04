import { useQuery } from '@tanstack/react-query';
import { getUserCart } from '../data-access/cart';

// export const {
//   data: cartData,
//   isPending,
//   isError,
//   error,
// } = useQuery({
//   queryKey: ['cart', 'user', loginData?.id],
//   queryFn: () => {
//     if (!loginData?.id) throw new Error('User ID is missing');
//     return getUserCart(loginData?.id);
//   },
//   enabled: !!loginData?.id,
// });
