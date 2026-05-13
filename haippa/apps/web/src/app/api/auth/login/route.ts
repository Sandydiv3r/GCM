import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@haippa/db";
import { getSession } from "@/lib/session";
import { apiSuccess, apiError, handleApiError } from "@/lib/api";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(req: NextRequest) {
  try {
    const { email, password } = schema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
    if (!user?.passwordHash) return apiError("Invalid email or password", 401);
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return apiError("Invalid email or password", 401);
    if (user.status !== "ACTIVE") return apiError("Your account has been suspended", 403);
    const session = await getSession();
    session.userId = user.id;
    session.role   = user.role;
    session.email  = user.email;
    await session.save();
    return apiSuccess({ user: { id: user.id, email: user.email, role: user.role, firstName: user.profile?.firstName, lastName: user.profile?.lastName } });
  } catch (err) {
    return handleApiError(err);
  }
}
