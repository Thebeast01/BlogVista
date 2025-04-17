import { z } from 'zod'
export const commentSchema = z.object({
  id: z.string(),
  text: z.string(),
  post: z.string(),
  author: z.string(),
});

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  published: z.boolean().default(false),
  author: z.string(),
});

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email().optional(),
  password: z.string().min(5),
});
