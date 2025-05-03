import { Router } from "express";
import { upload } from "../middleware/multer";
import { loginUser, registerUser, sendOtp, verifyOtp } from "../controllers/auth/authController";
import { authMiddleware } from "../middleware/authMiddleware";
const authRouter = Router();
authRouter.post("/register", upload.single("profile"), registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/sendOtp", authMiddleware, sendOtp)
authRouter.post("/verifyOtp", authMiddleware, verifyOtp)
export default authRouter;
