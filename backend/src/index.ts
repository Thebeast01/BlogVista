import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoute';
dotenv.config()
const app = express();
app.use(express.json())

app.use(cookieParser())
app.use(cors({
  origin: "*",
  credentials: true
}))
app.get("/", (req, res) => {
  res.send("Hello World")
})
app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
