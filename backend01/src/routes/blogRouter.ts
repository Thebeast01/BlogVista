import { Hono } from 'hono';
import { blogGet, blogPost, getAllBlog, updateBlog } from '../controllers/blogController';
import { authMiddleware } from '../middleware/authMiddleware';
import { bindings, variables } from '../types/types';

const blogRouter = new Hono<{ Bindings: bindings, Variables: variables }>();
blogRouter.use(authMiddleware)
blogRouter.post('/postBlogs', blogPost)
blogRouter.get('/getBlogs/:id', blogGet)
blogRouter.get('/getAllBlogs', getAllBlog)
blogRouter.put('/updateBlog', updateBlog)

export default blogRouter 
