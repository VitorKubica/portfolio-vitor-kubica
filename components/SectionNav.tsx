"use client";

import { useSectionContext } from "./SectionContext";

const SECTIONS = [
  { id: "une", label: "Go to first section. Hero." },
  { id: "deux", label: "Go to second section. Skills." },
  { id: "trois", label: "Go to third section. Experience." },
  { id: "quatre", label: "Go to fourth section. Showcase." },
  { id: "cinq", label: "Go to fifth section. Contact." },
];

export default function SectionNav() {
  const { currentSection } = useSectionContext();

  function handleClick(sectionId: string) {
    const el = document.querySelector(
      `[data-section='${sectionId}']`
    ) as HTMLElement | null;
    if (!el) return;
    // On desktop the scroll container is <main>
    const main = document.querySelector("main");
    if (main && window.innerWidth >= 1024) {
      main.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (currentSection === "footer") return null;

  return (
    <nav
      id="section-nav"
      aria-label="Section navigation"
      className="fixed z-[999] right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:flex text-electric-blue"
    >
      <ul className="flex flex-col gap-1 list-none p-0 m-0">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              aria-label={s.label}
              className="w-7 h-7 flex items-center justify-center cursor-pointer bg-transparent outline-none"
            >
              <span
                className={`block w-2 h-2 border border-current transition-all duration-200 ${
                  currentSection === s.id
                    ? "rotate-0 scale-150 bg-transparent"
                    : "rotate-45 bg-current"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
