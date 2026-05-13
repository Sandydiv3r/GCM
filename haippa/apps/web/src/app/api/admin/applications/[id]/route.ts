import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma, UserRole } from "@haippa/db";
import { requireAuth } from "@/lib/session";
import { apiSuccess, apiError, handleApiError } from "@/lib/api";

const schema = z.object({ action: z.enum(["APPROVED", "REJECTED"]), reviewNotes: z.string().optional() });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await requireAuth("ADMIN");
    const { action, reviewNotes } = schema.parse(await req.json());
    const application = await prisma.artistApplication.findUnique({ where: { id: params.id } });
    if (!application) return apiError("Application not found", 404);
    if (application.status !== "PENDING") return apiError("Application has already been reviewed", 400);
    await prisma.artistApplication.update({
      where: { id: params.id },
      data: { status: action, reviewNotes: reviewNotes ?? null, reviewedBy: admin.userId, reviewedAt: new Date() },
    });
    if (action === "APPROVED" && application.userId) {
      await prisma.user.update({ where: { id: application.userId }, data: { role: UserRole.ARTIST } });
      const slug = application.fullName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + application.id.slice(-4);
      await prisma.artistProfile.upsert({
        where: { userId: application.userId }, update: {},
        create: { userId: application.userId, displayName: application.fullName, slug, bio: application.bio, country: application.country, city: application.city ?? null, instagramHandle: application.instagramHandle ?? null, isVerified: true },
      });
    }
    return apiSuccess({ ok: true });
  } catch (err) { return handleApiError(err); }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth("ADMIN");
    const app = await prisma.artistApplication.findUnique({ where: { id: params.id } });
    if (!app) return apiError("Not found", 404);
    return apiSuccess(app);
  } catch (err) { return handleApiError(err); }
}
