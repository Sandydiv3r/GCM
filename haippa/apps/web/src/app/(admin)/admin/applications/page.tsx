import { requireAuth } from "@/lib/session";
import { prisma } from "@haippa/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Artist Applications" };

export default async function ApplicationsPage({ searchParams }: { searchParams: { status?: string } }) {
  try { await requireAuth("ADMIN"); } catch { redirect("/login"); }
  const status = (searchParams.status as "PENDING" | "APPROVED" | "REJECTED") ?? "PENDING";
  const applications = await prisma.artistApplication.findMany({ where: { status }, orderBy: { createdAt: "desc" } });
  const counts = await prisma.artistApplication.groupBy({ by: ["status"], _count: true });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));
  const tabs = [
    { key: "PENDING", label: "Pending", count: countMap["PENDING"] ?? 0 },
    { key: "APPROVED", label: "Approved", count: countMap["APPROVED"] ?? 0 },
    { key: "REJECTED", label: "Rejected", count: countMap["REJECTED"] ?? 0 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">Artist Applications</h1>
        <p className="text-charcoal-500 mt-1">Review and approve artist applications to the HAIPPA marketplace.</p>
      </div>
      <div className="flex gap-2 mb-6 border-b border-sand-300">
        {tabs.map((tab) => (
          <Link key={tab.key} href={`/admin/applications?status=${tab.key}`}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              status === tab.key ? "border-primary-500 text-primary-600" : "border-transparent text-charcoal-500 hover:text-charcoal-700"
            }`}>
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                status === tab.key ? "bg-primary-100 text-primary-600" : "bg-sand-200 text-charcoal-500"
              }`}>{tab.count}</span>
            )}
          </Link>
        ))}
      </div>
      <div className="bg-white border border-sand-300 rounded-sm divide-y divide-sand-200">
        {applications.length === 0 ? (
          <div className="px-6 py-12 text-center text-charcoal-400">
            <p className="text-lg font-medium mb-1">No {status.toLowerCase()} applications</p>
            <p className="text-sm">They will appear here when submitted.</p>
          </div>
        ) : applications.map((app) => (
          <div key={app.id} className="px-6 py-5 flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-medium text-charcoal-900">{app.fullName}</p>
                <span className="text-xs text-charcoal-400">{app.country}{app.city ? `, ${app.city}` : ""}</span>
              </div>
              <p className="text-sm text-charcoal-500">{app.email}</p>
              <p className="text-sm text-charcoal-600 mt-2 line-clamp-2">{app.bio}</p>
              <p className="text-xs text-charcoal-400 mt-3">Submitted {app.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            {status === "PENDING" && (
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Link href={`/admin/applications/${app.id}`}
                  className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-sm hover:bg-primary-600 transition-colors text-center">Review</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
