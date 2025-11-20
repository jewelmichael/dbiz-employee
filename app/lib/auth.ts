// app/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not set in environment variables");
}
const secret = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: string;
  role: string;
};

export async function createSessionToken(payload: SessionPayload) {
  // e.g. 7d – you can change via env if you want
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as SessionPayload;
}
