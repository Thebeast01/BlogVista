import { Request, Response } from 'express';
import { prisma } from '../../db';

// Get Post
export interface AuthenticatedRequest extends Request {
  id?: string;
}
export const getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
  console.log("Inside post controller")

  const id = req.id;
  console.log("ID", id)
  try {
    const post = await prisma.post.findMany({
      where: {
        id: id,
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
