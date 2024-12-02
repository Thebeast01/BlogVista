
import { sign } from 'hono/jwt'
import { Context } from "hono";
import { getPrisma } from "../db/db";
import { bindings } from '../types/types';

export const signUp = async (c: Context<{ Bindings: bindings }>) => {



  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json()
  const isPresent = await prisma.user.findUnique({

    where: {
      email: body.email,

    }
  })

  if (isPresent) {
    c.status(403);
    return c.json({
      error: "User Already Exists"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);

  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up", e });
  }

}

export const login = async (c: Context<{ Bindings: bindings }>) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email

    }
  })
  if (!user) {
    c.status(403);
    return c.json({
      error: "User Not Found"
    })
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({
    "Message": "User Found ",
    jwt
  })
}
