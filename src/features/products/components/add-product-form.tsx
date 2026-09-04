import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCT_VALUE,
  STOCK_OPTIONS,
} from '../utilities/constants/initial-values';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, updateProduct } from '../data-access/products';
import { ProductFormData, productSchema } from "../validators/add-form-validator"
import { Root } from "../models/product"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { InputComponent } from '../ui/form-components/input-component';
import { SelectComponent } from '../ui/form-components/select-component';
import { FieldError } from "react-hook-form";
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

  const initialStockId = STOCK_OPTIONS.find(opt => opt.value === initialValue?.availabilityStatus)?.id || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      ...initialValue,
      availabilityStatus: initialStockId
    },
    resolver: zodResolver(productSchema)
  })

  const {
    mutate: addProductMutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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

  const submitHandler: SubmitHandler<ProductFormData> = (formData) => {
    console.log(formData)
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
    <form onSubmit={handleSubmit(
      submitHandler,
      (validationErrors) => console.log("❌ Validation Failed:", validationErrors)
    )}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-3">{`${isEdit ? 'Edit' : 'Add New'}  Product`}</h2>
      {isSuccess && (
        <p className="mt-3 text-sm text-green-600 bg-green-50 p-2.5 rounded-xl text-center font-medium">
          Product created successfully! List updated.
        </p>
      )}

      <InputComponent
        id="title"
        label="Product Title"
        error={errors.title}
        {...register("title")}
      />
      <InputComponent
        id="description"
        label="Description"
        error={errors.description}
        {...register("description")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputComponent
          id="brand"
          label="Brand"
          error={errors.brand}
          {...register("brand")}
        />
        <InputComponent
          id="category"
          label="Category"
          error={errors.category}
          {...register("category")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputComponent
          id="price"
          label="Price ($)"
          error={errors.price}
          {...register("price")}
          type="number"
          step="0.01"
          min="0"
        />
        <InputComponent
          id="discountPercentage"
          label="Discount (%)"
          error={errors.discountPercentage}
          {...register("discountPercentage", { valueAsNumber: true })}
          type="number"
          step="0.01"
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputComponent
          id="stock"
          label="Stock"
          error={errors.stock}
          {...register("stock", { valueAsNumber: true })}
          type="number"
          step="0.01"
          min="0"
        />
        <InputComponent
          id="minimumOrderQuantity"
          label="Min Order Qty"
          error={errors.minimumOrderQuantity}
          {...register("minimumOrderQuantity")}
          type="number"
          min="1"
        />
        <InputComponent
          id="weight"
          label="Weight (g)"
          error={errors.weight}
          {...register("weight", { valueAsNumber: true })}
          type="number"
          min="1"
        />
      </div>

      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <span className="block text-sm font-semibold text-gray-800 mb-3">
          Dimensions (cm)
        </span>
        <div className="grid grid-cols-3 gap-3">
          <InputComponent
            id="width"
            label="Weight (g)"
            error={errors.dimensions?.width}
            {...register("dimensions.width", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
          />
          <InputComponent
            id='height'
            label="Height"
            error={errors.dimensions?.height}
            {...register("dimensions.height", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
          />
          <InputComponent
            id='depth'
            label="Depth"
            error={errors.dimensions?.depth}
            {...register("dimensions.depth", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectComponent
          label="Availability"
          id='availabilityStatus'
          options={STOCK_OPTIONS}
          {...register("availabilityStatus", {
            setValueAs: (selectedId: string) => {
              const selectedOption = STOCK_OPTIONS.find(opt => opt.id === selectedId);
              return selectedOption ? selectedOption.value : selectedId;
            }
          }
          )}
        />

        <InputComponent
          id='shippingInformation'
          label="Shipping Info"
          error={errors.shippingInformation}
          {...register("shippingInformation")}
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputComponent
          id='warrantyInformation'
          label="Warranty Info"
          error={errors.warrantyInformation}
          {...register("warrantyInformation")}
        />
        <InputComponent
          label="Return Policy"
          id='returnPolicy'
          error={errors.returnPolicy}
          {...register("returnPolicy")}
        />
      </div>

      <InputComponent
        id='tags'
        label="Tags (Comma separated)"
        error={errors.tags as FieldError}
        {...register("tags", {
          setValueAs: (tags: string | string[]) => {
            if (!tags) return [];
            if (Array.isArray(tags)) return tags;
            return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
          }
        })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputComponent
          id='thumbnail'
          label="Thumbnail URL"
          error={errors.thumbnail}
          {...register("thumbnail")}
        />
        <InputComponent
          id='images'
          label="Gallery Image URL"
          error={errors.images as FieldError}
          {...register("images", {
            setValueAs: (value: string | string[]) => {
              if (!value) return [];
              if (Array.isArray(value)) return value;
              return value.split(",").map((url) => url.trim()).filter(Boolean);
            }
          })}
        />
      </div>

      <div className="pt-4 border-t border-gray-50">
        <button
          type="submit"
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
