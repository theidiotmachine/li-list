import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(Deno.env.get("JWT_SECRET") || "default_secret");

export async function createJWT(payload: JWTPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return jwt;
}

export async function verifyJWT(token: string): Promise<JWTPayload | undefined> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (_error) {
    return undefined;
  }
}