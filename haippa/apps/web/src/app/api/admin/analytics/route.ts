import { prisma } from "@haippa/db";
import { requireAuth } from "@/lib/session";
import { apiSuccess, handleApiError } from "@/lib/api";

export async function GET() {
  try {
    await requireAuth("ADMIN");
    const [totalArtists, totalArtworks, totalOrders, revenueResult, pendingApplications, pendingListings, openDisputes] = await Promise.all([
      prisma.artistProfile.count({ where: { isVerified: true } }),
      prisma.artwork.count({ where: { status: "ACTIVE" } }),
      prisma.order.count({ where: { status: { not: "CANCELLED" } } }),
      prisma.order.aggregate({ _sum: { platformFeeAmount: true }, where: { status: { in: ["COMPLETED", "DELIVERED", "SHIPPED"] } } }),
      prisma.artistApplication.count({ where: { status: "PENDING" } }),
      prisma.artwork.count({ where: { status: "PENDING_REVIEW" } }),
      prisma.dispute.count({ where: { status: { in: ["OPEN", "UNDER_REVIEW"] } } }),
    ]);
    return apiSuccess({ totalArtists, totalArtworks, totalOrders, totalRevenuePence: revenueResult._sum.platformFeeAmount ?? 0, pendingApplications, pendingListings, openDisputes });
  } catch (err) { return handleApiError(err); }
}
