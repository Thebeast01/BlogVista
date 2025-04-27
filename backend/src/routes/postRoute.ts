import { Router } from "express";
import { getAllPosts } from "../controllers/posts/postController";
import { authMiddleware } from "../middleware/authMiddleware";
const blogRouter = Router();
blogRouter.get("/getAllPosts", authMiddleware, getAllPosts)
export default blogRouter;
