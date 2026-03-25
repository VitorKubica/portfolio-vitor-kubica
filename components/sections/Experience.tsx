"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPERIENCES = [
  {
    company: "GFT Consultoria — Crefisa",
    role: "FullStack Developer",
    period: "Dec 2024 — Present",
    location: "São Paulo, SP",
    highlights: [
      "Led implementation of automatic PIX with direct impact on financial operations.",
      "Developed and maintained Crefisa's app with Node.js, .NET and React Native.",
      "Created and maintained BFFs (Backend for Frontend), optimizing API communication.",
      "Developed APIs using Server-Driven UI (SDUI) approach.",
      "Worked within clean architecture and molecular architecture patterns.",
    ],
    current: true,
  },
  {
    company: "Crefisa",
    role: "Development Analyst",
    period: "Jun 2024 — Aug 2024",
    location: "São Paulo, SP",
    highlights: [
      "Gained macro view of processes and application pipeline from security layer to internal requests.",
      "Performed code debugging and log interpretation supporting the team.",
      "Developed auxiliary tools in Python for analysis and automation.",
    ],
    current: false,
  },
  {
    company: "Hash4Carbon",
    role: "Front-end Developer (Freelance)",
    period: "Mar 2024 — Apr 2024",
    location: "São Paulo, SP",
    highlights: [
      "Built the startup's Landing Page with Next.js, TypeScript and Tailwind — Mobile First.",
      "Implemented REST APIs and form validators for efficient integration.",
    ],
    current: false,
  },
  {
    company: "Avantti Pisos e Revestimentos",
    role: "Administrative Assistant & Developer",
    period: "Nov 2021 — Dec 2023",
    location: "Mairiporã, SP",
    highlights: [
      "Developed the company Website and Landing Page.",
      "Created a task automation system in Python, increasing operational efficiency.",
      "Built a production support system in Node.js, improving team collaboration.",
    ],
    current: false,
  },
];

type Exp = (typeof EXPERIENCES)[number];

export default function Experience() {
  const [selected, setSelected] = useState<Exp | null>(null);

  return (
    <section
      data-section="trois"
      aria-hidden="true"
      className="home-section bg-primary"
    >

      {/* ══════════════════════════════════════
          MOBILE modal (hidden on sm+)
      ══════════════════════════════════════ */}

      {/* Backdrop */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="exp-backdrop"
            className="fixed inset-0 z-40 bg-accent/75 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal sheet */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="exp-modal"
            className="fixed inset-x-3 top-14 bottom-8 z-50 bg-bg rounded-xl overflow-y-auto shadow-2xl sm:hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="p-5 flex flex-col min-h-full">
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Fechar"
                className="self-end mb-4 w-9 h-9 flex items-center justify-center rounded-full border border-accent/20 text-accent/50 hover:text-accent text-xl leading-none transition-colors shrink-0"
              >
                ×
              </button>

              {/* Company + badge */}
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-sans font-extrabold text-xl text-accent leading-snug">
                  {selected.company}
                </h3>
                {selected.current && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 leading-none">
                    Atual
                  </span>
                )}
              </div>

              {/* Role */}
              <p className="text-accent/70 text-base mb-1">{selected.role}</p>

              {/* Period · Location */}
              <p className="text-accent/40 text-sm mb-6">
                {selected.period} &middot; {selected.location}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-3 flex-1">
                {selected.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-accent/80 text-sm leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          MOBILE layout (hidden on sm+)
          Compact timeline — all 4 entries on one screen
      ══════════════════════════════════════ */}
      <div className="sm:hidden w-full h-full flex flex-col px-5 pt-20 pb-7">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="shrink-0 mb-6"
        >
          <h2 className="font-sans font-extrabold text-bg text-2xl leading-tight tracking-tight">
            Experience
          </h2>
          <p className="text-bg/40 text-xs mt-1">
            Tap an entry to see details
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex-1 relative flex flex-col justify-between min-h-0">

          {/* Static dim line (full height, background) */}
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-bg/15">
            {/* Animated bright line growing from top */}
            <motion.div
              className="absolute inset-x-0 top-0 bg-bg/55 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
              style={{ height: "100%" }}
            />
          </div>

          {/* Entries */}
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pl-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            >
              {/* Dot */}
              <motion.span
                className="absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2 border-bg/70 bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.2, type: "spring", stiffness: 300 }}
              />

              {/* Company + badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-sans font-bold text-bg text-sm leading-snug">
                  {exp.company}
                </span>
                {exp.current && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-bg/15 text-bg border border-bg/30 leading-none">
                    Atual
                  </span>
                )}
              </div>

              {/* Role */}
              <p className="text-bg/65 text-xs mt-0.5">{exp.role}</p>

              {/* Period */}
              <p className="text-bg/40 text-[11px] mt-0.5">{exp.period}</p>

              {/* Saiba mais */}
              <button
                onClick={() => setSelected(exp)}
                className="mt-1.5 text-bg/50 text-[11px] font-medium flex items-center gap-1 hover:text-bg/80 active:scale-95 transition-all duration-150"
              >
                Saiba mais
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP layout (hidden on mobile)
      ══════════════════════════════════════ */}
      <div className="hidden sm:flex w-full h-full overflow-y-auto flex-col lg:justify-center">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 px-10 lg:px-16 max-w-7xl mx-auto py-20 lg:py-0">

          {/* Left: heading */}
          <motion.div
            className="lg:sticky lg:top-0 shrink-0 lg:w-64 xl:w-72"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-sans font-extrabold text-bg text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight">
              Exper&shy;ience
            </h2>
            <p className="mt-4 text-bg/50 text-sm leading-relaxed max-w-xs">
              A timeline of the roles and projects that shaped my engineering practice.
            </p>
          </motion.div>

          {/* Right: timeline */}
          <div className="flex-1 relative">
            {/* Static dim line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-bg/15 hidden sm:block">
              {/* Animated bright line growing from top */}
              <motion.div
                className="absolute inset-x-0 top-0 bg-bg/55 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
                style={{ height: "100%" }}
              />
            </div>

            <ol className="list-none p-0 m-0 space-y-10 sm:space-y-12">
              {EXPERIENCES.map((exp, index) => (
                <motion.li
                  key={`${exp.company}-${index}`}
                  className="relative sm:pl-10"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="hidden sm:block absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-bg/60 bg-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.2, type: "spring", stiffness: 300 }}
                  />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans font-bold text-bg text-xl leading-snug">
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-bg/15 text-bg border border-bg/30 leading-none">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-bg/80 text-base leading-snug m-0">{exp.role}</p>
                    <p className="text-bg/50 text-sm m-0">
                      {exp.period} &middot; {exp.location}
                    </p>
                    <ul className="mt-3 space-y-1.5 list-none p-0 m-0">
                      {exp.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2 text-bg/70 text-sm leading-relaxed">
                          <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-bg/40" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>

    </section>
  );
}
