"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const exhibitions = [
  {
    year: "2024",
    title: "Liminal Spaces",
    venue: "Nairobi National Museum",
    location: "Nairobi, Kenya",
    type: "Solo",
  },
  {
    year: "2024",
    title: "Pan-African Voices",
    venue: "Zeitz MOCAA",
    location: "Cape Town, South Africa",
    type: "Group",
  },
  {
    year: "2023",
    title: "New Narratives",
    venue: "1:54 Contemporary African Art Fair",
    location: "London, UK",
    type: "Group",
  },
  {
    year: "2023",
    title: "Between Worlds",
    venue: "Galerie Myrtis",
    location: "Baltimore, USA",
    type: "Solo",
  },
  {
    year: "2022",
    title: "Afro Futures",
    venue: "Institut Français",
    location: "Paris, France",
    type: "Group",
  },
  {
    year: "2022",
    title: "Returning Home",
    venue: "Circle Art Gallery",
    location: "Nairobi, Kenya",
    type: "Solo",
  },
];

export default function Exhibitions() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="exhibitions" ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: heading */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.4em] uppercase text-[var(--accent)] mb-4"
            >
              Exhibitions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Shows &<br />
              <span style={{ color: "var(--accent)" }}>Recognition</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[var(--foreground)]/50 leading-relaxed text-sm"
            >
              Exhibited internationally across Africa, Europe, and the Americas,
              with works held in prestigious public and private collections.
            </motion.p>
          </div>

          {/* Right: timeline list */}
          <div className="lg:col-span-2 space-y-0">
            {exhibitions.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="group flex items-start gap-6 py-6 border-b border-[var(--border)] hover:border-[var(--accent)]/30 transition-colors duration-300"
              >
                {/* Year */}
                <div className="w-12 shrink-0 text-sm text-[var(--foreground)]/30 font-mono pt-1">
                  {ex.year}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold tracking-wide group-hover:text-[var(--accent)] transition-colors duration-300 mb-1">
                        {ex.title}
                      </h3>
                      <p className="text-sm text-[var(--foreground)]/50">
                        {ex.venue}
                      </p>
                      <p className="text-xs text-[var(--foreground)]/30 tracking-wider mt-1">
                        {ex.location}
                      </p>
                    </div>
                    <span
                      className={`text-xs tracking-[0.2em] uppercase px-2 py-1 shrink-0 mt-0.5 ${
                        ex.type === "Solo"
                          ? "text-[var(--accent)] border border-[var(--accent)]/40"
                          : "text-[var(--foreground)]/40 border border-[var(--border)]"
                      }`}
                    >
                      {ex.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
