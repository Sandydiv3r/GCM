import { requireAuth } from "@/lib/session";
import { prisma } from "@haippa/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

async function getStats() {
  const [totalArtists, totalArtworks, totalOrders, revenueResult, pendingApplications, pendingListings, openDisputes, recentOrders] = await Promise.all([
    prisma.artistProfile.count({ where: { isVerified: true } }),
    prisma.artwork.count({ where: { status: "ACTIVE" } }),
    prisma.order.count({ where: { status: { not: "CANCELLED" } } }),
    prisma.order.aggregate({ _sum: { platformFeeAmount: true }, where: { status: { in: ["COMPLETED", "DELIVERED"] } } }),
    prisma.artistApplication.count({ where: { status: "PENDING" } }),
    prisma.artwork.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.dispute.count({ where: { status: { in: ["OPEN", "UNDER_REVIEW"] } } }),
    prisma.order.findMany({ where: { status: { not: "CANCELLED" } }, orderBy: { createdAt: "desc" }, take: 5, include: { buyer: { include: { profile: true } } } }),
  ]);
  return { totalArtists, totalArtworks, totalOrders, totalRevenuePence: revenueResult._sum.platformFeeAmount ?? 0, pendingApplications, pendingListings, openDisputes, recentOrders };
}

export default async function AdminDashboardPage() {
  try { await requireAuth("ADMIN"); } catch { redirect("/login"); }
  const stats = await getStats();
  const fmt = (p: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0 }).format(p / 100);

  const statCards = [
    { label: "Verified Artists", value: stats.totalArtists, href: "/admin/artists", bg: "bg-primary-50", text: "text-primary-700" },
    { label: "Active Listings", value: stats.totalArtworks, href: "/admin/artworks", bg: "bg-secondary-50", text: "text-secondary-700" },
    { label: "Total Orders", value: stats.totalOrders, href: "/admin/orders", bg: "bg-sand-100", text: "text-charcoal-700" },
    { label: "Platform Revenue", value: fmt(stats.totalRevenuePence), href: "/admin/orders", bg: "bg-primary-50", text: "text-primary-700" },
  ];
  const alertCards = [
    { label: "Pending Applications", value: stats.pendingApplications, href: "/admin/applications", urgent: stats.pendingApplications > 0 },
    { label: "Listings to Review", value: stats.pendingListings, href: "/admin/artworks", urgent: stats.pendingListings > 0 },
    { label: "Open Disputes", value: stats.openDisputes, href: "/admin/disputes", urgent: stats.openDisputes > 0 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">Dashboard</h1>
        <p className="text-charcoal-500 mt-1">Platform overview — {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className={`${s.bg} rounded-sm p-5 hover:shadow-card transition-shadow`}>
            <p className={`font-display text-3xl font-semibold ${s.text}`}>{s.value}</p>
            <p className="text-sm text-charcoal-600 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {alertCards.map((a) => (
          <Link key={a.label} href={a.href} className="bg-white border border-sand-300 rounded-sm p-5 flex items-center justify-between hover:shadow-card transition-shadow">
            <div>
              <p className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">Action Required</p>
              <p className="font-medium text-charcoal-800">{a.label}</p>
            </div>
            <span className={`text-2xl font-display font-semibold ${a.urgent ? "text-primary-500" : "text-charcoal-400"}`}>{a.value}</span>
          </Link>
        ))}
      </div>
      <div className="bg-white border border-sand-300 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-300 flex items-center justify-between">
          <h2 className="font-medium text-charcoal-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary-500 hover:text-primary-600">View all →</Link>
        </div>
        <div className="divide-y divide-sand-200">
          {recentOrders.length === 0 ? (
            <p className="px-6 py-8 text-center text-charcoal-400 text-sm">No orders yet</p>
          ) : recentOrders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-sand-50 transition-colors">
              <div>
                <p className="text-sm font-medium text-charcoal-800">{order.buyer.profile?.firstName} {order.buyer.profile?.lastName}</p>
                <p className="text-xs text-charcoal-500">{order.createdAt.toLocaleDateString("en-GB")}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-charcoal-800">{fmt(order.totalAmount)}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  order.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                  order.status === "SHIPPED"   ? "bg-blue-100 text-blue-700" :
                  order.status === "DISPUTED"  ? "bg-red-100 text-red-700" :
                  "bg-sand-200 text-charcoal-600"
                }`}>{order.status.replace("_", " ")}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
