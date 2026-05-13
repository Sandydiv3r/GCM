"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/artworks", label: "Artworks" },
  { href: "/artists", label: "Artists" },
  { href: "/collections", label: "Collections" },
  { href: "/commissions", label: "Commissions" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold text-charcoal-900 tracking-wide">HAIPPA</Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-charcoal-600 hover:text-primary-500 transition-colors">{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:inline-flex text-sm font-medium text-charcoal-600 hover:text-primary-500 transition-colors">Sign in</Link>
          <Link href="/checkout" className="relative p-2 text-charcoal-700 hover:text-primary-500 transition-colors" aria-label="Cart"><ShoppingBag size={20} /></Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-charcoal-700" aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-sand-300 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm font-medium text-charcoal-700 py-2" onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/login" className="block text-sm font-medium text-primary-500 py-2" onClick={() => setMenuOpen(false)}>Sign in</Link>
        </div>
      )}
    </header>
  );
}
