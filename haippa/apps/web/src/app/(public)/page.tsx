import Link from "next/link";
import Image from "next/image";
import { prisma } from "@haippa/db";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

async function getFeaturedData() {
  const [collections, featuredArtists, featuredArtworks] = await Promise.all([
    prisma.collection.findMany({ where: { isPublished: true, isFeatured: true }, orderBy: { sortOrder: "asc" }, take: 3 }),
    prisma.artistProfile.findMany({
      where: { isVerified: true, isFeatured: true },
      include: { artworks: { where: { status: "ACTIVE" }, include: { images: { where: { isPrimary: true } } }, take: 1 } },
      take: 6,
    }),
    prisma.artwork.findMany({
      where: { status: "ACTIVE", isFeatured: true },
      include: { images: { where: { isPrimary: true } }, artistProfile: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);
  return { collections, featuredArtists, featuredArtworks };
}

export default async function HomePage() {
  const { collections, featuredArtists, featuredArtworks } = await getFeaturedData();

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-end bg-charcoal-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-charcoal-900/60 to-charcoal-900/90" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
            <div className="max-w-3xl">
              <span className="inline-block text-secondary-400 text-sm font-medium tracking-widest uppercase mb-4">Curated African Art</span>
              <h1 className="font-display text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
                Discover Art That <em className="text-secondary-400 not-italic">Tells a Story</em>
              </h1>
              <p className="text-sand-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                A curated marketplace connecting verified African artists with collectors and buyers worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/artworks" className="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-medium rounded-sm hover:bg-primary-600 transition-colors">Browse Artworks</Link>
                <Link href="/artists" className="inline-flex items-center px-8 py-4 border border-sand-400 text-sand-200 font-medium rounded-sm hover:border-sand-200 transition-colors">Meet the Artists</Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 divide-x divide-white/10">
              {[{ label: "Verified Artists", value: "50+" }, { label: "Original Works", value: "300+" }, { label: "Countries Represented", value: "20+" }].map((s) => (
                <div key={s.label} className="px-6 first:pl-0">
                  <p className="text-2xl font-display font-semibold text-white">{s.value}</p>
                  <p className="text-xs text-sand-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artworks */}
        {featuredArtworks.length > 0 && (
          <section className="section-warm py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-primary-500 text-sm font-medium tracking-widest uppercase mb-2">Selected Works</p>
                  <h2 className="font-display text-4xl font-semibold text-charcoal-900">New Arrivals</h2>
                </div>
                <Link href="/artworks" className="text-sm text-charcoal-600 hover:text-primary-500 transition-colors">Browse all →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {featuredArtworks.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork} />)}
              </div>
            </div>
          </section>
        )}

        {/* Commission CTA */}
        <section className="bg-charcoal-900 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-secondary-400 text-sm font-medium tracking-widest uppercase mb-4">Bespoke</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">Commission a Unique Piece</h2>
            <p className="text-sand-400 text-lg mb-10 max-w-xl mx-auto">Work directly with a verified African artist to create a one-of-a-kind artwork tailored to your vision.</p>
            <Link href="/commissions" className="inline-flex items-center px-10 py-4 bg-secondary-400 text-charcoal-900 font-semibold rounded-sm hover:bg-secondary-300 transition-colors">Start a Commission</Link>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="border-y border-sand-300 bg-white py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ icon: "✓", label: "Verified Artists Only" }, { icon: "🔒", label: "Secure Checkout" }, { icon: "📦", label: "Tracked Shipping" }, { icon: "↩", label: "Clear Returns Policy" }].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-medium text-charcoal-700">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
