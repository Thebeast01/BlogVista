
import { sign } from 'hono/jwt'
import { Context } from "hono";
import { getPrisma } from "../db/db";
import { bindings } from '../types/types';
import { setCookie } from 'hono/cookie';
import bcryptjs from 'bcryptjs'
import { userSchema } from '../types';
export const signUp = async (c: Context<{ Bindings: bindings }>) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json()
  console.log("This is body from signUp", body)
  const parsedBody = userSchema.safeParse(body)
  if (!parsedBody.success) {
    c.status(403);
    return c.json({
      error: "Invalid Input",
      issues: parsedBody.error.issues
    })
  }
  const isPresent = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: parsedBody.data.email
        },
        {
          username: parsedBody.data.username
        }
      ]
    }
  })

  if (isPresent) {
    c.status(403);
    return c.json({
      error: "User Already Exists with this email or username"
    })
  }
  try {
    const hashedPassword = await bcryptjs.hash(parsedBody.data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsedBody.data.email,
        username: parsedBody.data.username,
        password: hashedPassword
      }
    });
    return c.json({
      message: "User Created Successfully",
      user
    });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up", e });
  }
}

// Login Starts here
export const login = async (c: Context<{ Bindings: bindings }>) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [

          {
            username: body.userData
          },
          {
            email: body.userData
          }
        ]
      }
    })
    if (!user) {
      c.status(403);
      return c.json({
        error: "User Not Found"
      })
    }
    const isMatch = await bcryptjs.compare(body.password, user.password);
    if (!isMatch) {
      c.status(403);
      return c.json({
        error: "Invalid Password"
      })
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    setCookie(c, 'token', jwt)
    return c.json({
      Message: "Login Successful",
      user
    })
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while logging in", e });
  }

}

