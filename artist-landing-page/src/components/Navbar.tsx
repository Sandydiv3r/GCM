"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#exhibitions", label: "Exhibitions" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold tracking-[0.2em] uppercase text-[var(--foreground)]"
          whileHover={{ color: "var(--accent)" }}
          transition={{ duration: 0.2 }}
        >
          Kio Inganga
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className="text-sm tracking-[0.15em] uppercase text-[var(--foreground)]/70 hover:text-[var(--accent)] transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
          <li>
            <motion.a
              href="https://www.instagram.com/kioinganga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.15em] uppercase border border-[var(--accent)] text-[var(--accent)] px-5 py-2 hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Instagram
            </motion.a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[var(--foreground)]"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-[var(--foreground)]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[var(--foreground)]"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-[var(--surface)] border-t border-[var(--border)]"
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block px-6 py-3 text-sm tracking-[0.15em] uppercase text-[var(--foreground)]/70 hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="px-6 pt-3">
            <a
              href="https://www.instagram.com/kioinganga"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm tracking-[0.15em] uppercase border border-[var(--accent)] text-[var(--accent)] px-5 py-3 hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-300"
            >
              Instagram
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}
