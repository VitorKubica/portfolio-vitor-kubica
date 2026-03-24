"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  category: string;
  title: string;
  short: string;
  description: string;
  tech: string[];
  github: string;
  color: string;
};

const PROJECTS: Project[] = [
  {
    id: "mockzada-backend",
    category: "Backend",
    title: "Mockzada Backend",
    short: "Mock server for API testing and development.",
    description:
      "A powerful backend mock server that enables teams to simulate API responses during development and testing. Built for speed and flexibility.",
    tech: ["Node.js", "TypeScript", "REST"],
    github: "https://github.com/vitorkubica/mockzada_backend",
    color: "green",
  },
  {
    id: "biblioteca-api",
    category: "Backend",
    title: "Biblioteca API",
    short: "RESTful API for library management system.",
    description:
      "A complete REST API for managing a digital library — books, authors, categories and loans. Clean architecture with full CRUD operations.",
    tech: ["Node.js", "TypeScript", "SQL"],
    github: "https://github.com/vitorkubica/biblioteca_api",
    color: "green",
  },
  {
    id: "hash-for-carbon",
    category: "Frontend",
    title: "Hash for Carbon",
    short: "Landing page for a carbon-neutral startup.",
    description:
      "Developed the startup's Landing Page using Next.js, TypeScript, and Tailwind with a Mobile-First approach, providing an enhanced user experience with REST API integration.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/vitorkubica/hash_for_carbon",
    color: "green",
  },
  {
    id: "avantti-pisos",
    category: "Frontend",
    title: "Avantti Pisos",
    short: "Website for a flooring and tile company.",
    description:
      "Full website and landing page for Avantti Pisos e Revestimentos, with a comprehensive view of the company's processes and digital strategy.",
    tech: ["JavaScript", "CSS", "Node.js"],
    github: "https://github.com/vitorkubica/avantti_pisos",
    color: "green",
  },
  {
    id: "anallizer-ai",
    category: "AI / Automation",
    title: "Anallizer AI",
    short: "AI-powered data analysis tool.",
    description:
      "An intelligent analysis tool leveraging AI to process and interpret data, providing actionable insights. Combines machine learning with intuitive visualizations.",
    tech: ["Python", "AI/ML", "Data Science"],
    github: "https://github.com/vitorkubica/anallizer_AI",
    color: "green",
  },
  {
    id: "n8n-workflows",
    category: "AI / Automation",
    title: "n8n Workflows",
    short: "Automation workflows with n8n.",
    description:
      "A collection of powerful automation workflows built with n8n, streamlining repetitive tasks and integrating multiple services for improved productivity.",
    tech: ["n8n", "Python", "Automation"],
    github: "https://github.com/vitorkubica/n8n_workflows",
    color: "green",
  },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function CollapsedCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      onClick={onClick}
      className="group bg-white border border-accent/15 rounded-[4px] p-5 sm:p-6 cursor-pointer flex flex-col gap-3 hover:border-primary/50 hover:shadow-sm transition-all duration-200"
    >
      {/* Category badge */}
      <span className="self-start text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide font-semibold">
        {project.category}
      </span>

      {/* Title */}
      <h3 className="font-sans font-extrabold text-lg sm:text-xl text-accent leading-tight">
        {project.title}
      </h3>

      {/* Short description */}
      <p className="text-accent/70 text-sm leading-relaxed flex-1">
        {project.short}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2 py-0.5 rounded border border-accent/20 text-accent/60 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`GitHub repository for ${project.title}`}
        className="self-start text-accent/40 hover:text-primary transition-colors mt-1"
      >
        <GithubIcon className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

function ExpandedCard({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="col-span-2 sm:col-span-2 lg:col-span-3 bg-white border-2 border-primary rounded-[4px] p-6 sm:p-8 relative"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close project details"
        className="absolute top-4 right-4 text-2xl text-accent/50 hover:text-accent cursor-pointer leading-none transition-colors w-8 h-8 flex items-center justify-center"
      >
        ×
      </button>

      {/* Category badge */}
      <span className="inline-block text-primary bg-primary/10 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide font-semibold mb-3">
        {project.category}
      </span>

      {/* Title */}
      <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-accent leading-tight mb-4 pr-8">
        {project.title}
      </h3>

      {/* Full description */}
      <p className="text-accent/75 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
        {project.description}
      </p>

      {/* Tech tags (larger) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="text-sm px-3 py-1 rounded border border-primary/30 text-primary font-semibold bg-primary/5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub button */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded-[4px] text-sm font-semibold hover:bg-primary transition-colors duration-200"
      >
        <GithubIcon className="w-4 h-4" />
        View on GitHub
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleClose = () => setExpanded(null);

  return (
    <section
      data-section="deux"
      aria-hidden="true"
      className="home-section bg-bg py-20 lg:py-0"
    >
      <div className="w-full h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto py-20">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-accent mb-8 sm:mb-10"
        >
          Projects
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {expanded ? (
              <>
                <ExpandedCard
                  key={`expanded-${expanded}`}
                  project={PROJECTS.find((p) => p.id === expanded)!}
                  onClose={handleClose}
                />
                {PROJECTS.filter((p) => p.id !== expanded).map((project, i) => (
                  <CollapsedCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => handleCardClick(project.id)}
                  />
                ))}
              </>
            ) : (
              PROJECTS.map((project, i) => (
                <CollapsedCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => handleCardClick(project.id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
