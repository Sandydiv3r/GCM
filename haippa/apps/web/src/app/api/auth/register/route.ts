import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@haippa/db";
import { getSession } from "@/lib/session";
import { apiSuccess, apiError, handleApiError } from "@/lib/api";

const schema = z.object({
  email:     z.string().email("Invalid email address"),
  password:  z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name required"),
  lastName:  z.string().min(1, "Last name required"),
});

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = schema.parse(await req.json());
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return apiError("An account with this email already exists", 409);
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, role: "BUYER", profile: { create: { firstName, lastName } } },
      include: { profile: true },
    });
    const session = await getSession();
    session.userId = user.id;
    session.role   = user.role;
    session.email  = user.email;
    await session.save();
    return apiSuccess({ user: { id: user.id, email: user.email, role: user.role, firstName: user.profile?.firstName, lastName: user.profile?.lastName } }, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
