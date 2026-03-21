"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type SectionContextType = {
  currentSection: string;
  setCurrentSection: (id: string) => void;
};

const SectionContext = createContext<SectionContextType>({
  currentSection: "une",
  setCurrentSection: () => {},
});

export function useSectionContext() {
  return useContext(SectionContext);
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState("une");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    // On desktop the scroll container is <main>, on mobile it's the viewport
    const scrollRoot = document.querySelector("main"); // always the scroll container

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setCurrentSection(id);
              // Mark as scrolled so entrance animation doesn't replay
              entry.target.classList.add("scrolled");
              // Set aria-hidden for all sections
              sections.forEach((s) => {
                s.setAttribute(
                  "aria-hidden",
                  s.getAttribute("data-section") === id ? "false" : "true"
                );
              });
            }
          }
        }
      },
      {
        root: scrollRoot,
        threshold: 0.3,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.getElementById("app-root");
    if (root) root.dataset.currentSection = currentSection;
  }, [currentSection]);

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
}
