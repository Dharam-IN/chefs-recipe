import { z } from 'zod'

export const RecipeSchema = z.object({
  title: z
    .string()
    .min(10, 'Title Must be at least 10 characters')
    .max(60, 'Title Must be no more then 20 characters'),
  description: z
    .string()
    .min(10, 'Description Must be at least 15 characters')
    .max(100, 'Description Must be no more then 100 characters'),
  author: z.string(),
  tags: z.array(z.string()),
  image: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.string()
    })
  ),
  instructions: z.array(z.string()),
  type: z.string()
})
