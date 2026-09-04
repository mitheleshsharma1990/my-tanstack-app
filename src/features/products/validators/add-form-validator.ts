import { z } from 'zod';

// 1. Define the nested Dimensions schema first
const dimensionsSchema = z.object({
  width: z
    .number({ error: 'Width is required' })
    .positive('Width must be greater than 0'),
  height: z
    .number({ error: 'Height is required' })
    .positive('Height must be greater than 0'),
  depth: z
    .number({ error: 'Depth is required' })
    .positive('Depth must be greater than 0'),
});

// 2. Define the Review schema if needed (referenced in your original type)
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  reviewerName: z.string(),
});

// 3. Define the Meta schema
const metaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 4. Build the main Product Schema
export const productSchema = z.object({
  id: z.number().optional(), // Optional if the backend generates it on creation
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be detailed'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be a positive number'),
  discountPercentage: z.number().min(0).max(100),
  rating: z.number().min(0).max(5).default(0).optional(),
  stock: z
    .number({ error: 'Stock cannot be empty' })
    .int()
    .nonnegative('Stock cannot be negative'),

  // Array of strings (tags & images)
  tags: z.array(z.string()),
  images: z.array(z.string().url('Must be a valid URL')),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),

  brand: z.string().min(1, 'Brand is required'),
  sku: z.string().min(1, 'SKU is required').optional(),
  weight: z.number({ error: 'Weight is required' }).positive(),

  // Connect the nested schemas here
  dimensions: dimensionsSchema,
  reviews: z.array(reviewSchema).default([]).optional(),
  meta: metaSchema.optional(),

  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  returnPolicy: z.string(),
  minimumOrderQuantity: z
    .number({ error: 'Minimun Quantity is 1' })
    .int()
    .positive(),
});

// This automatically extracts a strict TypeScript type from your Zod definition
export type ProductFormData = z.infer<typeof productSchema>;
