import { Context, Next } from 'hono'
import { verify } from 'hono/jwt'
import { bindings, variables } from '../types/types';
type JWTPayload = {
  id: string;
}
export const authMiddleware = async (
  c: Context<{ Bindings: bindings, Variables: variables }>,
  next: Next
) => {
  try {
    const jwt = c.req.header("Authorization")
    if (!jwt) {
      c.status(401)
      return c.json({ error: "No JWT Provided" })
    }

    // Fixed: Split by space ' ' not empty string ''
    const token = jwt
    if (!token) {
      c.status(401)
      return c.json({ error: "Invalid token format" })
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
