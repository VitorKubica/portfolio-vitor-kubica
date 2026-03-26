"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import ProjectsBackground from "./ProjectsBackground";
import { PROJECTS, type Project } from "@/data/projects";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ─── Desktop: collapsed card (inline grid) ─── */
function CollapsedCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      onClick={onClick}
      className="group bg-white border border-accent/15 rounded-[4px] p-5 sm:p-6 cursor-pointer flex flex-col gap-3 hover:border-primary/50 hover:shadow-sm transition-all duration-200"
    >
      <span className="self-start text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide font-semibold">
        {project.category}
      </span>
      <h3 className="font-sans font-extrabold text-lg sm:text-xl text-accent leading-tight">
        {project.title}
      </h3>
      <p className="text-accent/70 text-sm leading-relaxed flex-1">{project.short}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((tag) => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded border border-accent/20 text-accent/60 font-medium">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`GitHub — ${project.title}`}
        className="self-start text-accent/40 hover:text-primary transition-colors mt-1"
      >
        <GithubIcon className="w-4 h-4" />
      </a>
    </m.div>
  );
}

/* ─── Desktop: popup overlay ─── */
function DesktopPopup({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <m.div
        key="desktop-backdrop"
        className="fixed inset-0 z-40 bg-accent/60 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      {/* Popup card */}
      <m.div
        key={project.id}
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed z-50 inset-0 hidden sm:flex items-center justify-center pointer-events-none"
      >
        <div className="bg-white rounded-lg shadow-2xl p-8 lg:p-10 relative w-full max-w-lg pointer-events-auto">
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-4 right-4 text-2xl text-accent/50 hover:text-accent cursor-pointer leading-none transition-colors w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
          <span className="inline-block text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide font-semibold mb-3">
            {project.category}
          </span>
          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-accent leading-tight mb-4 pr-8">
            {project.title}
          </h3>
          <p className="text-accent/75 text-base sm:text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 rounded border border-primary/30 text-primary font-semibold bg-primary/5">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded-[4px] text-sm font-semibold hover:bg-primary transition-colors duration-200"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </m.div>
    </>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const expandedProject = PROJECTS.find((p) => p.id === expanded) ?? null;

  const close = () => setExpanded(null);

  return (
    <section data-section="deux" aria-hidden="true" className="home-section bg-bg">
      <ProjectsBackground />

      {/* ════════════════════════════════════════
          MOBILE layout (hidden on sm+)
          2×3 compact grid — all cards on one screen
          Click → full-screen modal popup
      ════════════════════════════════════════ */}

      {/* Modal backdrop */}
      <AnimatePresence>
        {expanded && (
          <m.div
            key="mobile-backdrop"
            className="fixed inset-0 z-40 bg-accent/70 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* Modal card */}
      <AnimatePresence>
        {expanded && expandedProject && (
          <m.div
            key="mobile-modal"
            className="fixed inset-x-3 top-14 bottom-8 z-50 bg-bg rounded-xl shadow-2xl overflow-y-auto sm:hidden"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="p-5 flex flex-col min-h-full">
              {/* Close button */}
              <button
                onClick={close}
                aria-label="Close"
                className="self-end mb-4 w-9 h-9 flex items-center justify-center rounded-full border border-accent/20 text-accent/50 hover:text-accent hover:border-accent/40 text-xl leading-none transition-colors shrink-0"
              >
                ×
              </button>

              <span className="self-start text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide font-semibold mb-3">
                {expandedProject.category}
              </span>

              <h3 className="font-sans font-extrabold text-2xl text-accent leading-tight mb-4">
                {expandedProject.title}
              </h3>

              <p className="text-accent/75 text-base leading-relaxed mb-6 flex-1">
                {expandedProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {expandedProject.tech.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1 rounded border border-primary/30 text-primary font-semibold bg-primary/5">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={expandedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-bg px-5 py-3 rounded-[4px] text-sm font-semibold hover:bg-primary transition-colors duration-200"
              >
                <GithubIcon className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile section body: heading + 2×3 grid */}
      <div className="sm:hidden relative z-10 w-full h-full flex flex-col px-4 pt-20 pb-5">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-sans font-extrabold text-2xl text-accent mb-3 shrink-0"
        >
          Projects
        </m.h2>

        {/* 2 cols × 3 rows, fills remaining height */}
        <div className="grid grid-cols-2 grid-rows-[1fr_1fr_1fr_auto] gap-2 flex-1 min-h-0">
          {PROJECTS.slice(0, 6).map((project, i) => (
            <m.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setExpanded(project.id)}
              className="bg-white border border-accent/15 rounded-lg p-3 flex flex-col text-left active:scale-[0.97] transition-transform duration-100"
            >
              <span className="self-start text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide font-semibold mb-2 shrink-0">
                {project.category}
              </span>
              <h3 className="font-sans font-bold text-accent text-sm leading-snug flex-1 line-clamp-3">
                {project.title}
              </h3>
              <div className="flex gap-1 flex-wrap mt-2 shrink-0">
                {project.tech.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] text-accent/50 border border-accent/15 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </m.button>
          ))}
          <Link
            href="/mywork"
            className="col-span-2 flex items-center justify-center text-sm font-semibold text-primary hover:text-accent transition-colors py-2"
          >
            See all projects &rarr;
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP layout (hidden on mobile)
          Static grid — click opens popup overlay
      ════════════════════════════════════════ */}

      {/* Desktop popup */}
      <AnimatePresence>
        {expanded && expandedProject && (
          <DesktopPopup
            key={`desktop-popup-${expanded}`}
            project={expandedProject}
            onClose={close}
          />
        )}
      </AnimatePresence>

      <div className="hidden sm:flex relative z-10 w-full h-full flex-col lg:justify-center">
        <div className="w-full flex flex-col px-10 lg:px-16 max-w-6xl mx-auto py-20">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-sans font-extrabold text-4xl lg:text-5xl text-accent mb-10"
          >
            Projects
          </m.h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PROJECTS.slice(0, 6).map((project, i) => (
              <CollapsedCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setExpanded(project.id)}
              />
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/mywork"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              See all projects &rarr;
            </Link>
          </m.div>
        </div>
      </div>

    </section>
  );
}
