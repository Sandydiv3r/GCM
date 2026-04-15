"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = ["All", "Paintings", "Mixed Media", "Digital", "Prints"];

const works = [
  {
    id: 1,
    title: "Ancestral Echoes",
    year: "2024",
    medium: "Oil on Canvas",
    category: "Paintings",
    color: "#2a1f15",
    accent: "#c9a96e",
  },
  {
    id: 2,
    title: "Urban Bloom",
    year: "2024",
    medium: "Mixed Media",
    category: "Mixed Media",
    color: "#1a1a2e",
    accent: "#7c6fcd",
  },
  {
    id: 3,
    title: "The Weight of Home",
    year: "2023",
    medium: "Acrylic & Collage",
    category: "Mixed Media",
    color: "#1f1a15",
    accent: "#d4845a",
  },
  {
    id: 4,
    title: "Celestial Migration",
    year: "2023",
    medium: "Digital Art",
    category: "Digital",
    color: "#0d1a1a",
    accent: "#5abdb4",
  },
  {
    id: 5,
    title: "Roots & Wings",
    year: "2023",
    medium: "Oil on Canvas",
    category: "Paintings",
    color: "#1a1a15",
    accent: "#b5c96e",
  },
  {
    id: 6,
    title: "Frequency of Being",
    year: "2022",
    medium: "Fine Art Print",
    category: "Prints",
    color: "#1a151f",
    accent: "#a96ec9",
  },
];

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category === activeCategory);

  return (
    <section id="works" ref={ref} className="py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-4"
            >
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Selected Works
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--background)]"
                    : "border-[var(--border)] text-[var(--foreground)]/50 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group cursor-pointer"
              layout
            >
              {/* Image placeholder */}
              <div
                className="relative aspect-square overflow-hidden mb-4"
                style={{ background: work.color }}
              >
                {/* Decorative artwork placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-full opacity-40 blur-xl"
                    style={{ background: work.accent }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                </div>
                <div className="absolute inset-0 border border-white/5" />

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[var(--background)]/80 flex items-center justify-center"
                >
                  <div className="text-center">
                    <p
                      className="text-xs tracking-[0.3em] uppercase mb-2"
                      style={{ color: work.accent }}
                    >
                      {work.medium}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "48px" }}
                      className="h-px mx-auto mb-3"
                      style={{ background: work.accent }}
                    />
                    <p className="text-sm tracking-wide text-[var(--foreground)]/70">
                      View Details
                    </p>
                  </div>
                </motion.div>

                {/* Year badge */}
                <div className="absolute top-3 right-3 bg-[var(--background)]/70 px-2 py-1">
                  <span className="text-xs text-[var(--foreground)]/50 tracking-wider">
                    {work.year}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold tracking-wide mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--foreground)]/40">
                {work.medium}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/kioinganga"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-[var(--accent)] border-b border-[var(--accent)]/40 pb-1 hover:border-[var(--accent)] hover:gap-5 transition-all duration-300"
          >
            See All Work on Instagram
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
