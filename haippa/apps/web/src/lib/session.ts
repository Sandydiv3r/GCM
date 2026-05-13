import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  role?: "BUYER" | "ARTIST" | "ADMIN";
  email?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "haippa_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax" as const,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function requireAuth(role?: "ADMIN" | "ARTIST"): Promise<SessionData> {
  const session = await getSession();
  if (!session.userId) throw new Error("UNAUTHORIZED");
  if (role === "ADMIN" && session.role !== "ADMIN") throw new Error("FORBIDDEN");
  if (role === "ARTIST" && session.role !== "ARTIST" && session.role !== "ADMIN") throw new Error("FORBIDDEN");
  return session;
}
