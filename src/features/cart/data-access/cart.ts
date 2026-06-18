import { CartRoot } from '../models/cart';

export const getUserCart = async (userId: number): Promise<CartRoot> => {
  const url = `https://dummyjson.com/carts/user/${userId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('fetching cart failed');
  }
  const data = await response.json();
  return data;
};
