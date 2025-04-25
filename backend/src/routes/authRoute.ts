import { Router } from "express";
import { upload } from "../middleware/multer";
import { loginUser, registerUser } from "../controllers/auth/authController";
const authRouter = Router();
authRouter.post("/register", upload.single("profile"), registerUser);
authRouter.post("/login", loginUser);
export default authRouter;
