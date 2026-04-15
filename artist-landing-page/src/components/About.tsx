"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "8+", label: "Years Creating" },
  { value: "120+", label: "Original Works" },
  { value: "15+", label: "Exhibitions" },
  { value: "30+", label: "Countries Reached" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 100% 50%, var(--accent) 0%, transparent 70%)",
          opacity: 0.04,
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: text */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-4"
          >
            About the Artist
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-8"
          >
            Art as a<br />
            <span style={{ color: "var(--accent)" }}>Mirror of Truth</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-[var(--foreground)]/70 leading-relaxed"
          >
            <p>
              Kio Inganga is a Nairobi-based multidisciplinary artist working at
              the intersection of painting, mixed media, and digital art. His
              practice is deeply rooted in African storytelling traditions, reimagined
              through a contemporary lens.
            </p>
            <p>
              Through layered compositions and bold palette choices, Kio explores
              themes of belonging, memory, and cultural identity — inviting viewers
              into worlds that feel simultaneously ancient and urgently present.
            </p>
            <p>
              His work has been exhibited across Africa, Europe, and North America,
              and is held in private collections worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="https://www.instagram.com/kioinganga"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--accent)] text-sm tracking-widest uppercase hover:gap-4 transition-all duration-300"
            >
              Follow on Instagram
              <span>→</span>
            </a>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </motion.div>
        </div>

        {/* Right: portrait placeholder + stats */}
        <div className="space-y-8">
          {/* Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[3/4] bg-[var(--surface)] overflow-hidden"
            style={{ maxHeight: "480px" }}
          >
            {/* Decorative frame */}
            <div
              className="absolute inset-0 border border-[var(--accent)]/20"
              style={{ margin: "16px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-30">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-[var(--accent)]"
                  style={{ background: "var(--accent)", opacity: 0.2 }}
                />
                <p className="text-xs tracking-[0.3em] uppercase">Portrait</p>
              </div>
            </div>
            {/* Accent corner */}
            <div
              className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2"
              style={{ borderColor: "var(--accent)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2"
              style={{ borderColor: "var(--accent)" }}
            />
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] p-5 hover:border-[var(--accent)]/40 transition-colors duration-300"
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-[var(--foreground)]/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
