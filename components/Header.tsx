"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSectionContext } from "./SectionContext";

const SOCIAL_LINKS = {
  github: "https://github.com/vitorkubica",
  linkedin: "https://linkedin.com/in/vitorkubica",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const { currentSection } = useSectionContext();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.classList.remove("no-scroll");
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (next) document.body.classList.add("no-scroll");
      else document.body.classList.remove("no-scroll");
      return next;
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (menuOpen && (e.key === "Escape" || e.key === "Esc")) closeMenu();
    }
    function onClick(e: MouseEvent) {
      if (!menuOpen) return;
      const t = e.target as HTMLElement;
      if (t.closest(".menu-toggle") || t.closest("#contact-menu")) return;
      closeMenu();
    }
    document.addEventListener("keyup", onKey);
    document.addEventListener("mouseup", onClick);
    return () => {
      document.removeEventListener("keyup", onKey);
      document.removeEventListener("mouseup", onClick);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLogoVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCompact((main?.scrollTop ?? window.scrollY) > 200);
        ticking = false;
      });
    }
    main?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      main?.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Logo is light on dark sections (une, trois, footer), dark on light sections
  const logoOnDark =
    currentSection === "une" ||
    currentSection === "trois" ||
    currentSection === "footer";
  const isHero = currentSection === "une";

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 lg:py-8 bg-transparent">
      {/* Logo / Back */}
      {isHome ? (
        <a
          id="logo"
          href="/"
          aria-label="Logo, go to homepage."
          className={`relative z-[999] flex flex-col transition-all duration-500 ${menuOpen ? "max-sm:!text-accent" : ""} ${logoOnDark ? "text-bg" : "text-accent"} ${logoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <span
            className={`flex text-3xl sm:text-4xl tracking-tight transition-all duration-500 ${compact ? "lg:-translate-x-4 opacity-80" : ""}`}
            style={{ fontFamily: "var(--font-fluid)" }}
          >
            V
            <span
              className="inline-block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                maxWidth: isHero ? "4ch" : "0ch",
                opacity: isHero ? 1 : 0,
              }}
            >
              itor
            </span>
            K
          </span>
        </a>
      ) : (
        <Link
          href="/"
          className={`relative z-[999] inline-flex items-center gap-2 text-accent transition-all duration-500 ${logoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </Link>
      )}

      {/* Hamburger */}
      <button
        type="button"
        aria-label={`${menuOpen ? "Close" : "Open"} contact menu`}
        aria-controls="contact-menu"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
        className={`menu-toggle z-[999] relative flex flex-col justify-center items-end w-10 h-8 bg-transparent cursor-pointer transition-all duration-300 ${
          menuOpen ? "text-accent" : !isHome ? "text-accent" : currentSection === "une" ? "text-bg sm:text-accent" : logoOnDark ? "text-bg" : "text-accent"
        } ${menuOpen ? "x scale-90" : ""}`}
      >
        <span
          className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? "w-full rotate-45 translate-y-[0px]" : "w-full mb-3"}`}
        />
        <span
          className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? "w-full -rotate-45 -translate-y-[2px]" : "w-[72%]"}`}
        />
      </button>

      {/* Contact menu overlay */}
      <nav
        id="contact-menu"
        aria-label="Contact menu"
        className={`
          fixed inset-0 lg:absolute lg:inset-auto lg:top-4 lg:right-8 lg:w-80
          z-[998] flex flex-col bg-bg p-8 sm:p-10
          transition-all duration-300
          ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none lg:scale-95"}
          max-lg:justify-center max-lg:text-xl
          lg:shadow-xl lg:rounded-[3px] lg:origin-top-right
        `}
      >
        <ul
          className={`list-none p-0 m-0 space-y-2 text-lg lg:text-base font-medium transition-all duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:translate-y-8"}`}
          style={{ transitionDelay: "100ms" }}
        >
          {([
            { label: "My Work", section: "deux", href: "/mywork" },
            { label: "About Me", section: "quatre", href: null },
            { label: "Contact", section: "six", href: null },
          ] as const).map((item) => (
            <li key={item.label}>
              {isHome ? (
                <button
                  type="button"
                  className="text-accent hover:text-link transition-colors bg-transparent cursor-pointer"
                  onClick={() => {
                    closeMenu();
                    const el = document.querySelector(`[data-section='${item.section}']`) as HTMLElement | null;
                    if (!el) return;
                    const main = document.querySelector("main");
                    if (main && window.innerWidth >= 1024) {
                      main.scrollTo({ top: el.offsetTop, behavior: "smooth" });
                    } else {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href ?? `/#${item.section}`}
                  className="text-accent hover:text-link transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 lg:mt-6">
          <span
            className={`block uppercase text-xs tracking-[0.25em] text-accent/40 mb-1 transition-opacity duration-200 ${menuOpen ? "opacity-100" : "lg:opacity-0"}`}
            style={{ transitionDelay: "250ms" }}
          >
            Say Hello
          </span>
          <a
            href="mailto:vitor05kubica12@gmail.com"
            className={`text-link text-base hover:opacity-70 transition-all duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:translate-y-6"}`}
            style={{ transitionDelay: "300ms" }}
          >
            vitor05kubica12@gmail.com
          </a>
        </div>

        <ul
          className={`list-none p-0 m-0 flex gap-6 mt-8 lg:mt-6 text-sm font-medium transition-all duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:translate-y-4"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {(
            [
              ["GH", SOCIAL_LINKS.github],
              ["LN", SOCIAL_LINKS.linkedin],
            ] as const
          ).map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-link transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
