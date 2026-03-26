"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/data/projects";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      onClick={onClick}
      className="group bg-white border border-accent/10 rounded-lg p-5 sm:p-6 cursor-pointer flex flex-col gap-3 hover:border-primary/40 hover:shadow-md transition-all duration-200"
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
    </m.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      <m.div
        key="backdrop"
        className="fixed inset-0 z-40 bg-accent/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <m.div
        key={project.id}
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 lg:p-10 relative w-full max-w-lg pointer-events-auto">
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

export default function MyWorkPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const expandedProject = PROJECTS.find((p) => p.id === expanded) ?? null;

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-dvh bg-bg">
      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-accent mb-3"
        >
          My Work
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-accent/60 text-base sm:text-lg mb-10 max-w-2xl"
        >
          All the projects I&apos;ve built and worked on — from backend APIs to AI tools and frontend experiences.
        </m.p>

        {/* Category filter */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-bg"
                  : "bg-accent/5 text-accent/70 hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </m.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setExpanded(project.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-accent/50 text-center py-16">No projects in this category yet.</p>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {expanded && expandedProject && (
          <ProjectModal project={expandedProject} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
