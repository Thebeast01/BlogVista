
import { Hono } from 'hono';
import authRouter from './routes/authRouter';
import blogRouter from './routes/blogRouter';
import { bindings, variables } from './types/types';
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: bindings
  Variable: variables
}>();

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.get('/', (c) => c.json('Working'))
app.route('/api/v1/auth', authRouter)
app.route('/api/v1/blog', blogRouter)

export default app;
