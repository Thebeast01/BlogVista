import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../db";
import jwt from "jsonwebtoken";
import { uploadImageOnCloudinary } from "../../utils/cloudinary";
import { generateToken, verifyToken } from "authenticator";
import { createMessage } from "../../utils/twilio";
import redisClient from "../../utils/redis";
const jwtSecret = process.env.JWT_SECRET
export const registerUser = async (req: any, res: Response) => {
  const localImagePath = req.file;
  if (!localImagePath) {
    res.status(400).json({ message: "Image is required" });
    return;
  }
  const imageUrl = await uploadImageOnCloudinary(localImagePath);
  try {
    const body = req.body;
    if (!localImagePath) {
      res.status(400).json({ message: "Image is required" });
      return
    }

    if (!body.email || !body.password || !body.username || !body.phoneNumber) {
      res.status(400).json({ message: "Email and password and Username are required" });
      return
    }
    if (body.password.length < 6) {
      res.status(400).json({ message: "Password must be at least 6 characters long" });
      return
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { username: body.username }
        ]
      }
    })
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)
    if (!imageUrl) {
      res.status(400).json({ message: "Image upload failed", });
      return
    }

    const profileUrl = imageUrl?.secure_url || imageUrl?.url;
    console.log("profileUrl", profileUrl);
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        phoneNumber: `+91${body.phoneNumber}`,
        password: hashedPassword,
        username: body.username,
        profilePicture: profileUrl,
      }
    })
    res.status(200).json({
      message: "User created successfully",
      newUser
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
// LoginUser
export const loginUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.userData },
          { username: body.userData }
        ]
      }
    })
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return
    }
    const token = jwt.sign({ id: user.id }, jwtSecret as string)

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxAge: 7 * 24 * 60 * 60 * 1000


    })
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture
      }
    })
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

}
// Send OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    // Generate Time Otp
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      res.status(400).json({ message: "Phone number is required" });
      return
    }
    const isUser = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    })
    if (!isUser) {
      res.status(400).json({ message: "User not found with this phoneNumber" });
      return
    }
    const totp = generateToken(phoneNumber + process.env.TOTP_SECRET);
    // Send OTP to user
    if (process.env.NODE_ENV === "production") {

      try {
        const result = await createMessage("Your Password Reset Otp for VibeTrails is : " + totp, phoneNumber);

        res.status(200).json({
          message: "Otp sent successfully",
          result,
          totp
        })
      }
      catch (error) {
        res.status(500).json({
          message: "Internal Server Error Or Failed to send OTP",
          error: error
        })
        return;
      }
    }
    res.status(200).json({
      message: "Otp sent successfully",
      totp: totp
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error
    })
    return;
  }
}
// Verify Otp
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { totp, phoneNumber } = req.body;
    if (!totp || !phoneNumber) {
      res.status(400).json({ message: "Phone number and Otp are required" });
      return
    }
    const isValid = verifyToken(phoneNumber + process.env.TOTP_SECRET, totp);
    if (!isValid) {

      res.status(400).json({ message: "Invalid OTP" });
      return
    }
    await redisClient.setEx(`otp_verfied:${phoneNumber}`, 300, "true")
    res.status(200).json({
      success: true,
      message: "Otp verified successfully",
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: error
    })
    return
  }
}
// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const isVerified = await redisClient.get(`otp_verfied:${body.phoneNumber}`)
    if (!isVerified) {
      res.status(400).json({ message: "This phoneNumber is not verified" });
      return
    }
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber: body.phoneNumber,
      }
    })
    if (!user) {
      res.status(400).json({ message: "User not found" })
      return
    }
    const encryptedPassword = await bcrypt.hash(body.newPassword, 10)
    const updatePassword = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: encryptedPassword
      }
    })
    res.status(200).json({
      message: "Password Updated Successfully"
    })
    await redisClient.del(`otp_verfied:${body.phoneNumber}`)
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
