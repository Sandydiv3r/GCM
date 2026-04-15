"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase text-[var(--foreground)]/30">
        <p>© {year} Kio Inganga. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/kioinganga"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@kioinganga.com"
            className="hover:text-[var(--accent)] transition-colors duration-300"
          >
            Email
          </a>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[var(--foreground)]/15"
        >
          Nairobi, Kenya
        </motion.p>
      </div>
    </footer>
  );
}
