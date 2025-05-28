import { Request, Response } from 'express';
import { prisma } from '../../db';
export interface AuthenticatedRequest extends Request {
  id: string;
}
export const getAllPosts = async (req: any, res: Response) => {
  console.log("Inside post controller")

  const id = req.id;
  console.log("ID", id)
  try {
    const post = await prisma.post.findMany({
      where: {
        authorId: id,
      }
    })
    if (!post) {
      res.status(404).json({ message: "Post not found" });

    }
    res.status(200).json({
      message: "Post found",
      post
    })
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export const getPostById = async (req: any, res: Response) => {
  const id = req.id;
  const postId = req.params.id;
  console.log("ID", id)
  console.log("Post ID", postId)
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: id,
      }
    })
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json({
      message: "Post found",
      post
    })
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export const createPost = async (req: any, res: Response) => {
  try {
    const id = req.id;

    const { title, content } = req.body;
    console.log("Request bodt received: ", req.body);
    console.log("ID", id)
    console.log("Title", title)
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const post = await prisma.post.create({
      data: {
        title: title,
        content,
        published: true,
        authorId: id,
      }


    })
    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
}
