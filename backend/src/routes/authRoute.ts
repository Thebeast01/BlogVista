import { Router } from "express";
import { upload } from "../middleware/multer";
import { loginUser, registerUser, resetPassword, sendOtp, verifyOtp } from "../controllers/auth/authController";
const authRouter = Router();
authRouter.post("/register", upload.single("profile"), registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/sendOtp", sendOtp)
authRouter.post("/verifyOtp", verifyOtp)
authRouter.post('/resetPassword', resetPassword)
export default authRouter;
