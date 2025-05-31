import { Router } from "express";
import { createPost, deletePost, getAllPosts, getFourPosts } from "../controllers/posts/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getPostById } from "../controllers/posts/postController";
import { upload } from "../middleware/multer";
const blogRouter = Router();
blogRouter.use(authMiddleware);
blogRouter.get("/getAllPosts", getAllPosts)
blogRouter.post("/createPost", upload.single('coverImg'), createPost)
blogRouter.get("/getPostById/:id", getPostById)
blogRouter.delete('/deletePost/:id', deletePost)
blogRouter.get('/getFourPosts', getFourPosts)
export default blogRouter;
