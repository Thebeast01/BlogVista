import { Router } from "express";
import { upload } from "../middleware/multer";
import { loginUser, registerUser, sendOtp, verifyOtp } from "../controllers/auth/authController";
import { authMiddleware } from "../middleware/authMiddleware";
const authRouter = Router();
authRouter.post("/register", upload.single("profile"), registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/sendOtp", sendOtp)
authRouter.post("/verifyOtp", verifyOtp)
export default authRouter;
