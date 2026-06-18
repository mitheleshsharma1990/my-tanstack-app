import { getUserCart } from '../data-access/cart';
import { useAuth } from '../../authentication/components/auth-provider';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CartItemRow from '../ui/cart-item';
import { CartItem } from '../models/cart'
export default function Cart() {
  const { loginData } = useAuth();

  const {
    data: cartData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['cart', 'user', loginData?.id],
    queryFn: () => {
      if (!loginData?.id) throw new Error("User ID is missing");
      return getUserCart(loginData?.id)
    },
    enabled: !!loginData?.id,
  });

  const [cartItems, setCartItems] = useState<CartItem | null>(null);

  useEffect(() => {
    if (cartData?.carts?.[0]) {
      setCartItems(cartData.carts[0]);
    }
  }, [cartData]);

  const incrementItemQuantity = (id: number) => {
    console.log()
    let cartTotal = cartItems?.total;
    let discountedCartTotal = cartItems?.discountedTotal;
    let totalQuantityCart = cartItems?.totalQuantity;
    const newCartItems = cartItems?.products.map((item) => {
      if (item.id === id) {
        const nextQty = item.quantity + 1;
        const nextTotal = parseFloat((nextQty * item.price).toFixed(2));
        const nextDiscountedTotal = parseFloat(
          (nextTotal * (1 - item.discountPercentage / 100)).toFixed(2),
        );
        cartTotal = (cartTotal ?? 0) + item.price;
        discountedCartTotal =
          (discountedCartTotal ?? 0) +
          item.price * (1 - item.discountPercentage / 100);
        totalQuantityCart = (totalQuantityCart ?? 0) + 1;
        return {
          ...item,
          quantity: nextQty,
          total: nextTotal,
          discountedTotal: nextDiscountedTotal,
        };
      }
      return item;
    });
    console.log(cartTotal, discountedCartTotal, totalQuantityCart, newCartItems)
    setCartItems({
      ...cartItems,
      total: parseFloat((cartTotal ?? 0).toFixed(2)),
      discountedTotal: parseFloat((discountedCartTotal ?? 0).toFixed(2)),
      totalQuantity: totalQuantityCart ?? 0,
      products: newCartItems || [],
    } as CartItem);
  };

  const decrementItemQuantity = (id: number) => {
    let cartTotal = cartItems?.total;
    let discountedCartTotal = cartItems?.discountedTotal;
    let totalQuantityCart = cartItems?.totalQuantity;
    const newCartItems = cartItems?.products.map((item) => {
      if (item.id === id) {
        const nextQty = item.quantity === 0 ? 0 : item.quantity - 1;
        const nextTotal = parseFloat((nextQty * item.price).toFixed(2));
        const nextDiscountedTotal = parseFloat(
          (nextTotal * (1 - item.discountPercentage / 100)).toFixed(2),
        );
        cartTotal = (nextQty === 0) ? cartTotal : (cartTotal ?? 0) - item.price;
        discountedCartTotal =
          nextQty === 0
            ? discountedCartTotal
            : (discountedCartTotal ?? 0) -
            item.price * (1 - item.discountPercentage / 100);
        totalQuantityCart =
          nextQty == 0 ? totalQuantityCart : (totalQuantityCart ?? 0) - 1;
        return {
          ...item,
          quantity: nextQty,
          total: nextTotal,
          discountedTotal: nextDiscountedTotal,
        };
      }
      return item;
    });

    setCartItems({
      ...cartItems,
      total: parseFloat((cartTotal ?? 0).toFixed(2)),
      discountedTotal: parseFloat((discountedCartTotal ?? 0).toFixed(2)),
      totalQuantity: (totalQuantityCart ?? 0),
      products: newCartItems ?? [],
    } as CartItem);
  };
  if (!loginData?.id) return <div>Please log in to view your cart.</div>;
  if (isPending) return <div>Loading cart...</div>;
  if (isError) return <div>Error loading cart: {error.message}</div>;
  if (!cartItems) return <div>No items found in cart.</div>;

  return (
    <div>
      <div>
        <h1>Cart</h1>
        <p>
          Total Price:{cartItems?.total} | Total Products:
          {cartItems?.totalQuantity} | Total Discounted Price:
          {cartItems?.discountedTotal}
        </p>
      </div>
      {cartItems &&
        cartItems?.products.map((product) => {
          return (
            <CartItemRow
              key={product.id}
              item={product}
              handleIncrease={() => incrementItemQuantity(product.id)}
              handleDecrease={() => decrementItemQuantity(product.id)}
            />
          );
        })}
    </div>
  );
}
