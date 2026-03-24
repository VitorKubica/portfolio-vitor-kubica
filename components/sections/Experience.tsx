"use client";

import { motion } from "framer-motion";

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

export default function Experience() {
  return (
    <section
      data-section="trois"
      aria-hidden="true"
      className="home-section bg-primary"
    >
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto py-24 sm:py-20 lg:py-0">

        {/* Left: Section heading */}
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

        {/* Right: Timeline */}
        <div className="flex-1 relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-bg/20 hidden sm:block" />

          <ol className="list-none p-0 m-0 space-y-10 sm:space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.li
                key={`${exp.company}-${index}`}
                className="relative sm:pl-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <span className="hidden sm:block absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-bg/60 bg-primary" />

                <div className="space-y-2">
                  {/* Header row */}
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

                  {/* Role */}
                  <p className="font-sans text-bg/80 text-base leading-snug m-0">
                    {exp.role}
                  </p>

                  {/* Period + location */}
                  <p className="text-bg/50 text-sm m-0">
                    {exp.period} &middot; {exp.location}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3 space-y-1.5 list-none p-0 m-0">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-bg/70 text-sm leading-relaxed"
                      >
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
    </section>
  );
}
