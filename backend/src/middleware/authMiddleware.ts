import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  console.log("Inside middleware")
  const token = req.cookies.token;

  console.log("Token", token)
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return

  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }
    // @ts-ignore
    console.log("Decoded Token", decodedToken);
    req.id = (decodedToken as any).id;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

