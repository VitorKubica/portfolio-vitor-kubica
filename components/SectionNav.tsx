"use client";

import { usePathname } from "next/navigation";
import { useSectionContext } from "./SectionContext";

const SECTIONS = [
  { id: "une", label: "Go to first section. Hero." },
  { id: "deux", label: "Go to second section. Projects." },
  { id: "trois", label: "Go to third section. Experience." },
  { id: "quatre", label: "Go to fourth section. About." },
  { id: "cinq", label: "Go to fifth section. Education." },
  { id: "six", label: "Go to sixth section. Contact." },
];

export default function SectionNav() {
  const { currentSection } = useSectionContext();
  const pathname = usePathname();

  function handleClick(sectionId: string) {
    const el = document.querySelector(
      `[data-section='${sectionId}']`
    ) as HTMLElement | null;
    if (!el) return;
    const main = document.querySelector("main");
    if (main && window.innerWidth >= 1024) {
      main.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (pathname !== "/") return null;
  if (currentSection === "footer") return null;

  return (
    <nav
      id="section-nav"
      aria-label="Section navigation"
      className="fixed z-[999] right-2 lg:right-12 bottom-6 lg:bottom-8 text-accent"
    >
      <ul className="flex flex-col gap-0.5 lg:gap-1 list-none p-0 m-0">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              aria-label={s.label}
              className="w-5 h-5 lg:w-7 lg:h-7 flex items-center justify-center cursor-pointer bg-transparent outline-none"
            >
              <span
                className={`block w-1.5 h-1.5 lg:w-2 lg:h-2 border border-current transition-all duration-200 rounded-[1px] ${
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
