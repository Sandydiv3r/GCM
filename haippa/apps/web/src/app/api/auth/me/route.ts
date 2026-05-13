import { prisma } from "@haippa/db";
import { getSession } from "@/lib/session";
import { apiSuccess, apiError } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  if (!session.userId) return apiError("Unauthorized", 401);
  const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { profile: true, artistProfile: true } });
  if (!user) return apiError("Not found", 404);
  return apiSuccess({ id: user.id, email: user.email, role: user.role, firstName: user.profile?.firstName, lastName: user.profile?.lastName, artistProfile: user.artistProfile ?? null });
}
