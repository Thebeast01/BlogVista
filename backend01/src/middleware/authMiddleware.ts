import { Context, Next } from 'hono'
import { verify } from 'hono/jwt'
import { getCookie } from 'hono/cookie';
import { bindings, variables } from '../types/types';
type JWTPayload = {
  id: string;
}
export const authMiddleware = async (
  c: Context<{ Bindings: bindings, Variables: variables }>,
  next: Next
) => {
  try {
    const token = getCookie(c, "token")
    console.log("This is token from auth authMiddleware", token)
    if (!token) {
      c.status(401)
      return c.json({ error: "No JWT Provided" })
    }



    try {
      const payload = await verify(token, c.env.JWT_SECRET) as JWTPayload
      c.set('userId', payload?.id)
      await next()

    } catch (verifyError) {
      c.status(401)
      return c.json({ error: "Invalid token" })
    }

  } catch (error) {
    c.status(500)
    return c.json({ error: "Internal server error" })
  }
}
