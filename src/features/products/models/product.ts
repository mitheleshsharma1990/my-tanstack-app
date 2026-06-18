export interface Root {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type ProductFormData = Omit<
  Product,
  'id' | 'rating' | 'sku' | 'reviews' | 'meta'
> & { id?: Product['id'] };

export interface DeleteProduct extends Product {
  isDeleted: boolean;
  deletedOn: string | Date; // Use Date if parsing to object, or string for ISO strings
}

export interface Categories {
  slug: string;
  name: string;
  url: string;
}

export interface StockOptions {
  id: string;
  value: string;
}
