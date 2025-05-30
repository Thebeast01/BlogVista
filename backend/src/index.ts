import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoute';
import blogRouter from './routes/postRoute';
import redisClient from './utils/redis';
import mailRouter from './routes/mail';
dotenv.config()
const app = express();
app.use(express.json(
  {
    limit: "50mb"
  }
))

app.use(cookieParser())
app.use(cors({
  origin: ["*", "http://localhost:3000", "https://vibetrails.vercel.app"],
  credentials: true
}))
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use('/api/auth', authRouter)
app.use('/api/post', blogRouter)
app.use('/api/mail', mailRouter)
redisClient.ping().then(() => {
  console.log("Redis is connected")
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
}).catch((error) => {
  console.error("Redis connection error:", error);
  process.exit(1);
})
