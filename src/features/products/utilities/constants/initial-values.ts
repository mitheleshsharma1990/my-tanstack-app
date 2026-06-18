import { ProductFormData, StockOptions } from '../../models/product';

export const INITIAL_PRODUCT_VALUE: ProductFormData = {
  title: 'Eyeshadow Palette with Mirror',
  description:
    "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
  category: 'beauty',
  price: 19.99,
  discountPercentage: 18.19,
  stock: 34,
  tags: ['beauty', 'eyeshadow'],
  brand: 'Glamour Beauty',
  weight: 9,
  dimensions: {
    width: 9.26,
    height: 22.47,
    depth: 27.67,
  },
  warrantyInformation: '1 year warranty',
  shippingInformation: 'Ships in 2 weeks',
  availabilityStatus: 'In Stock',

  returnPolicy: '7 days return policy',
  minimumOrderQuantity: 20,
  images: [
    'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
  ],
  thumbnail:
    'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
};

export const STOCK_OPTIONS: StockOptions[] = [
  { id: 'InStock', value: 'In Stock' },
  { id: 'OutOfStock', value: 'Out of Stock' },
];
