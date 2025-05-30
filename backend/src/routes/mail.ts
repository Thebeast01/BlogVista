import { Router } from "express";
import { sendMail } from "../controllers/mail/mail";
const mailRouter = Router();

mailRouter.post("/send", sendMail)

export default mailRouter;
