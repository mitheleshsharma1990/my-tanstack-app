import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCT_VALUE,
  STOCK_OPTIONS,
} from '../utilities/constants/initial-values';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, updateProduct } from '../data-access/products';
import { ProductFormData } from '../models/product';
import { Root } from "../models/product"
import { ChangeEvent } from 'react';

export default function AddProductForm() {
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let initialValue = INITIAL_PRODUCT_VALUE;
  if (location.state) {
    initialValue = location.state;
  }
  useEffect(() => {
    if (location.state) {
      setIsEdit(true);
    }
  }, []);

  const [formData, setFormData] = useState<ProductFormData>(initialValue);

  const {
    mutate: addProductMutate,
    isPending,

    isSuccess,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setFormData(INITIAL_PRODUCT_VALUE);
      setTimeout(() => {
        navigate('/products');
      }, 500);
    },
  });

  const {
    mutate: editProductMutate,
    isPending: isEdting,
  } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldData: Root) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          products: oldData.products.map((product) => {
            if (product.id === location.state.id) {
              return updatedProduct;
            } else {
              return product;
            }
          }),
        };
      });
      setTimeout(() => {
        navigate('/products');
      }, 500);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value }: { name: string, value: string } = e.target;
    let formattedValue = value;
    if (name === 'availabilityStatus') {
      const selectedOption = STOCK_OPTIONS.find((option) => option.id == value);
      if (selectedOption) formattedValue = selectedOption.value;
    }
    if (name.includes('.')) {
      const [parentkey, childkey] = name.split('.') as [keyof ProductFormData, string];
      const currentChildObject = formData[parentkey] as Record<string, any>;
      setFormData({
        ...formData,
        [parentkey]: {
          ...currentChildObject,
          [childkey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    }
    console.log(formData);
  };

  const submitHandler = () => {
    // e.preventDefault();
    if (isEdit) {
      console.log('editProductMutate');
      const { id, ...restformData } = formData;
      if (id) {
        editProductMutate({
          id: id,
          body: restformData,
        });
      }
    } else {
      console.log('addProductMutate');
      addProductMutate({ body: formData });
    }
  };

  return (
    <form className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-3">{`${isEdit ? 'Edit' : 'Add New'}  Product`}</h2>
      {isSuccess && (
        <p className="mt-3 text-sm text-green-600 bg-green-50 p-2.5 rounded-xl text-center font-medium">
          Product created successfully! List updated.
        </p>
      )}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => handleChange(e)}
          value={formData.title}
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          value={formData.description}
          onChange={(e) => handleChange(e)}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            onChange={(e) => handleChange(e)}
            value={formData.brand}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={(e) => handleChange(e)}
            value={formData.category}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={(e) => handleChange(e)}
            value={formData.price}
            step="0.01"
            min="0"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="discountPercentage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Discount (%)
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            onChange={(e) => handleChange(e)}
            value={formData.discountPercentage}
            step="0.01"
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            onChange={(e) => handleChange(e)}
            value={formData.stock}
            min="0"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="minimumOrderQuantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Order Qty
          </label>
          <input
            type="number"
            id="minimumOrderQuantity"
            name="minimumOrderQuantity"
            onChange={(e) => handleChange(e)}
            value={formData.minimumOrderQuantity}
            min="1"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Weight (g)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            onChange={(e) => handleChange(e)}
            value={formData.weight}
            min="0"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <span className="block text-sm font-semibold text-gray-800 mb-3">
          Dimensions (cm)
        </span>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="width" className="block text-xs text-gray-500 mb-1">
              Width
            </label>
            <input
              type="number"
              id="width"
              name="dimensions.width"
              onChange={(e) => handleChange(e)}
              value={formData.dimensions.width}
              step="0.01"
              min="0"
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-xs text-gray-500 mb-1"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              name="dimensions.height"
              onChange={(e) => handleChange(e)}
              value={formData.dimensions.height}
              step="0.01"
              min="0"
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label htmlFor="depth" className="block text-xs text-gray-500 mb-1">
              Depth
            </label>
            <input
              type="number"
              id="depth"
              name="dimensions.depth"
              onChange={(e) => handleChange(e)}
              value={formData.dimensions.depth}
              step="0.01"
              min="0"
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="availabilityStatus"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Availability
          </label>
          <select
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm bg-white"
          >
            {STOCK_OPTIONS.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="shippingInformation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shipping Info
          </label>
          <input
            type="text"
            id="shippingInformation"
            name="shippingInformation"
            onChange={(e) => handleChange(e)}
            value={formData.shippingInformation}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="warrantyInformation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Warranty Info
          </label>
          <input
            type="text"
            id="warrantyInformation"
            name="warrantyInformation"
            onChange={(e) => handleChange(e)}
            value={formData.warrantyInformation}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="returnPolicy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Return Policy
          </label>
          <input
            type="text"
            id="returnPolicy"
            name="returnPolicy"
            onChange={(e) => handleChange(e)}
            value={formData.returnPolicy}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags (Comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          onChange={(e) => handleChange(e)}
          value={formData.tags?.join(',')}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            onChange={(e) => handleChange(e)}
            value={formData.thumbnail}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gallery Image URL
          </label>
          <input
            type="url"
            id="images"
            name="images"
            onChange={(e) => handleChange(e)}
            value={formData.images.join(',')}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50">
        <button
          type="submit"
          onClick={submitHandler}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors duration-200 cursor-pointer text-center"
        >
          {isEdit
            ? isEdting
              ? 'Saving...'
              : 'Edit Product'
            : isPending
              ? 'Saving...'
              : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
