"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const EDUCATION = [
  {
    institution: "FIAP",
    degree: "Computer Science",
    period: "Jan 2026 — Dec 2029",
    location: "São Paulo, SP",
    relevant: [],
  },
  {
    institution: "FIAP",
    degree: "Systems Analysis and Development",
    period: "Completed Dec 2024",
    location: "São Paulo, SP",
    relevant: ["Machine Learning", ".NET Core", "Data Science", "Big Data"],
  },
  {
    institution: "FAM",
    degree: "Computer Science",
    period: "Expected Dec 2027",
    location: "São Paulo, SP",
    relevant: [],
  },
];

const CERTIFICATES = [
  { title: "Systems Analysis and Development", issuer: "FIAP", year: "2024", color: "green" },
  { title: "Machine Learning Foundations", issuer: "FIAP", year: "2024", color: "green" },
  { title: ".NET Core Development", issuer: "FIAP", year: "2024", color: "green" },
  { title: "Data Science Essentials", issuer: "FIAP", year: "2024", color: "green" },
  { title: "Big Data & Analytics", issuer: "FIAP", year: "2024", color: "green" },
  { title: "FullStack Web Development", issuer: "FIAP", year: "2023", color: "green" },
];

const VISIBLE_DESKTOP = 3;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % CERTIFICATES.length);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveIndex(index);
    startTimer();
  };

  const goPrev = () => {
    goTo((activeIndex - 1 + CERTIFICATES.length) % CERTIFICATES.length);
  };

  const goNext = () => {
    goTo((activeIndex + 1) % CERTIFICATES.length);
  };

  // Calculate the translateX offset so the active card is centered on desktop
  // On desktop: show 3 cards, center the active one (offset = activeIndex - 1)
  // On mobile: show 1 card, offset = activeIndex
  const desktopOffset = Math.min(
    Math.max(activeIndex - 1, 0),
    CERTIFICATES.length - VISIBLE_DESKTOP
  );

  return (
    <section
      data-section="cinq"
      aria-hidden="true"
      className="home-section bg-bg py-24 sm:py-20 lg:py-0"
    >
      <div className="w-full flex flex-col px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto py-8 lg:py-16">

        {/* ── Academic Background ── */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 lg:mb-8"
        >
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-primary mb-1">
            Academic Background
          </p>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-accent leading-tight">
            Education
          </h2>
          <div className="mt-2 w-10 h-[3px] bg-primary rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 lg:mb-12"
        >
          {EDUCATION.map((edu) => (
            <motion.article
              key={`${edu.institution}-${edu.degree}`}
              variants={cardVariants}
              className="bg-white border border-accent/15 rounded-[4px] p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-sans font-bold text-primary text-sm uppercase tracking-wide">
                  {edu.institution}
                </span>
                <span className="text-accent/40 text-xs">{edu.location}</span>
              </div>
              <h3 className="font-sans font-extrabold text-accent text-lg leading-snug">
                {edu.degree}
              </h3>
              <p className="text-accent/50 text-sm">{edu.period}</p>
              {edu.relevant.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {edu.relevant.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-primary/10 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* ── Certificates Carousel ── */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-5"
        >
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-primary mb-1">
            Professional Development
          </p>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-accent leading-tight">
            Certificates
          </h2>
          <div className="mt-2 w-10 h-[3px] bg-primary rounded-full" />
        </motion.div>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Carousel container */}
          <div className="relative flex items-center gap-3">
            {/* Prev button */}
            <button
              onClick={goPrev}
              aria-label="Previous certificate"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-accent/20 bg-white hover:bg-primary hover:border-primary hover:text-bg text-accent transition-all duration-200 z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Carousel track wrapper */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex gap-3"
                animate={{
                  x: `calc(-${desktopOffset} * (100% / ${VISIBLE_DESKTOP} + 4px))`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {CERTIFICATES.map((cert, idx) => (
                  <motion.button
                    key={cert.title}
                    onClick={() => goTo(idx)}
                    animate={{
                      opacity: idx === activeIndex ? 1 : 0.6,
                      scale: idx === activeIndex ? 1 : 0.97,
                    }}
                    transition={{ duration: 0.25 }}
                    className={[
                      "flex-shrink-0 text-left",
                      "w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]",
                      "bg-white border-2 rounded-[4px] p-5 transition-colors duration-200 cursor-pointer",
                      idx === activeIndex
                        ? "border-primary bg-primary/5"
                        : "border-accent/10 hover:border-accent/25",
                    ].join(" ")}
                    aria-pressed={idx === activeIndex}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={[
                          "inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                          idx === activeIndex
                            ? "bg-primary text-bg"
                            : "bg-accent/10 text-accent/60",
                        ].join(" ")}
                      >
                        {cert.issuer}
                      </span>
                      <span className="text-accent/40 text-xs font-medium">{cert.year}</span>
                    </div>
                    <p
                      className={[
                        "font-sans font-semibold text-sm leading-snug",
                        idx === activeIndex ? "text-accent" : "text-accent/70",
                      ].join(" ")}
                    >
                      {cert.title}
                    </p>
                    {idx === activeIndex && (
                      <motion.div
                        layoutId="active-cert-indicator"
                        className="mt-3 w-6 h-[2px] bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              aria-label="Next certificate"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-accent/20 bg-white hover:bg-primary hover:border-primary hover:text-bg text-accent transition-all duration-200 z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {CERTIFICATES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to certificate ${idx + 1}`}
                className={[
                  "rounded-full transition-all duration-200",
                  idx === activeIndex
                    ? "w-4 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-accent/20 hover:bg-accent/40",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
