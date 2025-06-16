import { Request, Response } from 'express';
import { prisma } from '../../db';
import { uploadImageOnCloudinary } from '../../utils/cloudinary';
export interface AuthenticatedRequest extends Request {
  id: string;
}
export const getFourPosts = async (req: any, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      take: 4,
      orderBy: {
        createAt: 'desc',
      }
    }
    );
    res.status(200).json({
      message: posts.length ? "Posts found" : "No posts found",
      posts
    })
    return;
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
export const getAllPosts = async (req: any, res: Response) => {
  console.log("Inside post controller")

  const id = req.id;
  console.log("ID", id)
  try {
    const post = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            profilePicture: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createAt: 'desc', // latest first
      },
    }); res.status(200).json({
      message: post.length ? "Post found" : "No posts found",
      post
    })
  } catch (e) {
    console.error("Error fetching posts:", e);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const getPostById = async (req: any, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      }

    })
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    const author = await prisma.user.findUnique({
      where: {
        id: post.authorId
      }
    })
    res.status(200).json({
      message: "Post found",
      post: {
        ...post,
        author
      }
    })
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
export const createPost = async (req: any, res: Response) => {
  const localpath = req.file;
  console.log(req.file);
  const imageUrl = await uploadImageOnCloudinary(localpath);

  try {
    const startTime = Date.now();
    const id = req.id;
    const { title, content } = req.body;
    console.log("Request bodt received: ", req.body);
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }
    if (!imageUrl) {
      res.status(400).json({ message: "Image upload failed" });
      return;
    }
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const coverImageUrl = imageUrl;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: JSON.parse(content),
        published: true,
        coverImg: coverImageUrl as string,
        authorId: id,
      }


    })
    const endTime = Date.now() - startTime;
    res.status(201).json({
      message: "Post created successfully",
      post,
      endTime
    });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
}
export const deletePost = async (req: any, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
