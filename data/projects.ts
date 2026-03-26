export type Project = {
  id: string;
  category: string;
  title: string;
  short: string;
  description: string;
  production_url?: string;
  tech: string[];
  github?: string;
  color: string;
};

export const PROJECTS: Project[] = [
  // ── Professional Work ──
  {
    id: "crefisa-app",
    category: "FullStack",
    title: "Crefisa+ App",
    short: "Mobile banking app for Crefisa with automatic PIX.",
    description:
      "Developed and maintained the Crefisa+ banking app with Node.js, .NET and React Native. Led the implementation of automatic PIX with direct impact on financial operations. Built BFFs (Backend for Frontend) and APIs using Server-Driven UI (SDUI) within clean and molecular architecture patterns.",
    tech: ["React Native", "Node.js", ".NET", "SDUI"],
    color: "green",
  },

  // ── Backend ──
  {
    id: "mockzada-backend",
    category: "Backend",
    title: "Mockzada",
    short: "Mock server for API testing and development.",
    description:
      "A powerful backend mock server that enables teams to simulate API responses during development and testing. Built for speed and flexibility.",
    tech: ["Node.js", "TypeScript", "REST"],
    github: "https://github.com/vitorkubica/mockzada",
    production_url: "https://mockzada.com/",
    color: "green",
  },
  {
    id: "biblioteca-api",
    category: "Backend",
    title: "Biblioteca API",
    short: "RESTful API for library management system.",
    description:
      "A complete REST API for managing a digital library — books, authors, categories and loans. Clean architecture with full CRUD operations.",
    tech: ["Java", "REST"],
    github: "https://github.com/VitorKubica/ProjetoBiblioteca",
    color: "green",
  },

  // ── Frontend ──
  {
    id: "hash-for-carbon",
    category: "Frontend",
    title: "Hash for Carbon",
    short: "Landing page for a carbon-neutral startup.",
    description:
      "Developed the startup's Landing Page using Next.js, TypeScript, and Tailwind with a Mobile-First approach, providing an enhanced user experience with REST API integration.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    production_url: "https://hashforcarbon.com/",
    color: "green",
  },
  {
    id: "avantti-pisos",
    category: "Frontend",
    title: "Avantti Pisos",
    short: "Website for a flooring and tile company.",
    description:
      "Full website and landing page for Avantti Pisos e Revestimentos, with a comprehensive view of the company's processes and digital strategy.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    production_url: "https://www.avanttipisos.com.br/",
    color: "green",
  },
  {
    id: "helpfila",
    category: "Frontend",
    title: "HelpFila",
    short: "Queue management system for medical clinics.",
    description:
      "An intelligent queue management system designed to reduce wait times in medical clinics. Features real-time notifications, patient status tracking, and efficient resource optimization — more health, less waiting.",
    tech: ["Next.js", "JavaScript", "Tailwind"],
    github: "https://github.com/VitorKubica/HelpFila",
    production_url: "https://help-fila.netlify.app/",
    color: "green",
  },
  {
    id: "nummatch",
    category: "Frontend",
    title: "NumMatch",
    short: "Financial value combination finder in spreadsheets.",
    description:
      "A tool that identifies combinations of values in Excel tables that add up to a specific target. Ideal for financial audits, statement analysis, and data reconciliation to verify grouped transactions and spot discrepancies.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/VitorKubica/NumMatch",
    production_url: "https://num-match.vercel.app/",
    color: "green",
  },

  // ── AI / Automation ──
  {
    id: "anallizer-ai",
    category: "AI / Automation",
    title: "Anallizer AI",
    short: "AI-powered data analysis tool.",
    description:
      "An intelligent analysis tool leveraging AI to process and interpret data, providing actionable insights. Combines machine learning with intuitive visualizations.",
    tech: [".Net", "AI/ML", "Data Science"],
    github: "https://github.com/VitorKubica/APIAnallyzer_v2",
    color: "green",
  },
  {
    id: "n8n-workflows",
    category: "AI / Automation",
    title: "n8n Workflows",
    short: "Automation workflows with n8n.",
    description:
      "A collection of powerful automation workflows built with n8n, streamlining repetitive tasks and integrating multiple services for improved productivity.",
    tech: ["n8n", "JavaScript", "Automation"],
    github: "https://github.com/vitorkubica/n8n_workflows",
    color: "green",
  },
];