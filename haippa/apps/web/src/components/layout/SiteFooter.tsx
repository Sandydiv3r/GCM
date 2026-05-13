import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal-900 text-sand-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl font-semibold text-white mb-3">HAIPPA</p>
          <p className="text-sm leading-relaxed">A curated marketplace for authentic African art, connecting verified artists with buyers worldwide.</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Discover</p>
          <ul className="space-y-2 text-sm">
            {[{ href: "/artworks", label: "Browse Artworks" }, { href: "/artists", label: "Artists" }, { href: "/collections", label: "Collections" }, { href: "/commissions", label: "Commissions" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-sand-200 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Sell</p>
          <ul className="space-y-2 text-sm">
            {[{ href: "/apply", label: "Apply as an Artist" }, { href: "/seller/dashboard", label: "Seller Dashboard" }, { href: "/about", label: "About HAIPPA" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-sand-200 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">Support</p>
          <ul className="space-y-2 text-sm">
            {[{ href: "/help", label: "Help Centre" }, { href: "/shipping", label: "Shipping & Returns" }, { href: "/privacy", label: "Privacy Policy" }, { href: "/terms", label: "Terms of Service" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-sand-200 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal-700 max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-charcoal-500">
        <p>&copy; {new Date().getFullYear()} HAIPPA. All rights reserved.</p>
        <p>Celebrating African Art &amp; Creativity</p>
      </div>
    </footer>
  );
}
