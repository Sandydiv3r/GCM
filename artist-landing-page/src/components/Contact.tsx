"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  {
    platform: "Instagram",
    handle: "@kioinganga",
    href: "https://www.instagram.com/kioinganga",
    icon: "📷",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, var(--accent) 0%, transparent 60%)",
          opacity: 0.04,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-4"
        >
          Get in Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Let&apos;s Create<br />
          <span style={{ color: "var(--accent)" }}>Something Lasting</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[var(--foreground)]/50 text-lg leading-relaxed mb-12 max-w-xl mx-auto"
        >
          Available for commissions, collaborations, and exhibitions. Each piece
          is created with intention and soul.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          href="mailto:hello@kioinganga.com"
          className="inline-block px-12 py-5 bg-[var(--accent)] text-[var(--background)] text-sm font-semibold tracking-[0.2em] uppercase mb-16 transition-all duration-300 hover:shadow-2xl"
          style={{
            boxShadow: "0 0 0 0 var(--accent)",
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 20px 60px -10px rgba(201, 169, 110, 0.4)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Send a Message
        </motion.a>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-16"
        />

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border border-[var(--border)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300 text-[var(--foreground)]/50 text-sm tracking-wide group"
            >
              <span>{social.icon}</span>
              <span className="tracking-[0.15em] uppercase text-xs">{social.handle}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
