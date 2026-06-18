import {
  Root,
  ProductFormData,
  Product,
  DeleteProduct,
  Categories,
} from '../models/product';

export const fetchProducts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Root> => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${pageParam}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

export const fetchProductDetails = async ({
  id,
}: {
  id: number;
}): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const product = await response.json();
  return product;
};

export const searchProducts = async ({
  query,
}: {
  query: string;
}): Promise<Root> => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data.products;
};

export const getProducts = async ({
  query,
  skip,
}: {
  query: string;
  skip: number;
}): Promise<Root> => {
  const skipValue = query ? 0 : skip * 10;
  const url = query
    ? `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${skipValue}`
    : `https://dummyjson.com/products?limit=10&skip=${skipValue}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

export const addProduct = async ({
  body,
}: {
  body: ProductFormData;
}): Promise<Product> => {
  const url = 'https://dummyjson.com/products/add';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const updateProduct = async ({
  id,
  body,
}: {
  id: number;
  body: ProductFormData;
}): Promise<Product> => {
  const url = `https://dummyjson.com/products/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const deleteProduct = async ({
  id,
}: {
  id: number;
}): Promise<DeleteProduct> => {
  const url = `https://dummyjson.com/products/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};

export const getProductCategories = async (): Promise<Categories[]> => {
  const url = 'https://dummyjson.com/products/categories';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('failed to get categories');
  }
  const data = await response.json();
  return data;
};
