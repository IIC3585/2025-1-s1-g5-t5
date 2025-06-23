import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    thumb_src: z.string(),
    thumb_alt: z.string().optional(),
    title: z.string(),
    description: z.string(),
    full_description: z.string().optional(),
    price: z.number(),
    color: z.string().optional(),
    colors: z.array(z.string()).optional(),
    category: z.string(),
    subcategory: z.string().optional(),
    brand: z.string().optional(),
    rating: z.number().optional(),
    reviews: z.number().optional(),
    stock: z.boolean(),
    size: z.string().optional(),
    sizes: z.object({
      XS: z.number(),
      S: z.number(),
      M: z.number(),
      L: z.number(),
      XL: z.number(),
    }).optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    features: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    details: z.string().optional(),
    data: z.object({
      Features: z.string().optional(),
      Care: z.string().optional(),
      Shipping: z.string().optional(),
      Returns: z.string().optional(),
    }).optional(),
    featuresDetails: z.object({
      Origin: z.string().optional(),
      Material: z.string().optional(),
      Dimensions: z.string().optional(),
      Finish: z.string().optional(),
      Includes: z.string().optional(),
      Considerations: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    discount: z.number().optional(),
    salePrice: z.number().optional(),
  })
});

const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    thumb_src: z.string(),
    collection: z.string().optional(),
    featured: z.boolean().default(false),
    productCount: z.number().optional(),
  })
});

export const collections = {
  'products': productsCollection,
  'categories': categoriesCollection,
}; 