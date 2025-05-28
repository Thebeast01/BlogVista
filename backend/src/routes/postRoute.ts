import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/posts/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPostById } from "../controllers/posts/postController";
const blogRouter = Router();
blogRouter.use(authMiddleware);
blogRouter.get("/getAllPosts", getAllPosts)
blogRouter.post("/createPost", createPost)
blogRouter.get("/getPostById/:id", getPostById)
export default blogRouter;
