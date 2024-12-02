import { Hono } from "hono";
import { login, signUp } from "../controllers/authController";
import { bindings } from "../types/types";

const authRouter = new Hono<{ Bindings: bindings }>();
authRouter.post('/signup', signUp)
authRouter.post('/login', login)
export default authRouter
