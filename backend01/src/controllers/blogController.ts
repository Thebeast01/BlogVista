import { Context } from 'hono'
import { getPrisma } from '../db/db';
import { bindings, variables } from '../types/types';


export const blogPost = async (c: Context<{ Bindings: bindings, Variables: variables }>) => {

  const prisma = getPrisma(c.env.DATABASE_URL);
  try {
    const body = await c.req.json();
    const userid = c.get('userId')
    const posts = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        published: body.published,
        authorId: userid
      }
    })
    return c.json({ message: "This is a post request for blog" })

  } catch (error) {
    return c.json({
      error
    });
  }
};

export const blogGet = async (c: Context<{ Bindings: bindings, Variables: variables }>) => {

  const prisma = getPrisma(c.env.DATABASE_URL)
  const id = c.req.param('id')

  try {
    const post = await prisma.post.findMany({
      where: {
        authorId: id
      }
    })
    return c.json({
      post
    })

  } catch (e) {
    return c.json({ error: 'Failed to get post' }, 500);
  }
}
export const getAllBlog = async (c: Context<{ Bindings: bindings, Variables: variables }>) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  try {
    const allPosts = await prisma.post.findMany()
    return c.json({ allPosts })
  } catch (error) {
    return c.json({ error })
  }
}

export const updateBlog = async (c: Context<{ Bindings: bindings, Variables: variables }>) => {
  const userId = c.get("userId")
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json();
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        description: body.description,
        published: body.published
      }
    })
    return c.json({ message: "Post Updated" })
  } catch (error) {
    return c.json({ error })
  }
}




