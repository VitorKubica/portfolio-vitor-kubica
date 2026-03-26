"use client";

import { m } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "GH", href: "https://github.com/vitorkubica", ariaLabel: "Vitor on GitHub" },
  { label: "LN", href: "https://linkedin.com/in/vitorkubica", ariaLabel: "Vitor on LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      data-section="footer"
      aria-hidden="true"
      className="home-section text-bg/80 bg-accent"
    >
      <div className="w-full flex flex-col px-6 sm:px-10 lg:px-16 py-16 lg:py-20 max-w-6xl mx-auto">
        {/* Footer main */}
        <m.div
          className="footer-main w-full flex flex-col sm:flex-row gap-10 sm:gap-20 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="block uppercase text-xs tracking-[0.25em] text-bg/40 mb-2">
              Say Hello
            </span>
            <ul className="list-none p-0 m-0 text-base sm:text-lg leading-relaxed">
              <li>
                <a href="mailto:vitor05kubica12@gmail.com" className="text-bg/80 hover:text-bg transition-colors">
                  vitor05kubica12@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <ul className="list-none p-0 m-0 text-base sm:text-lg leading-relaxed space-y-1">
            {([
              { label: "My Work", section: "deux" },
              { label: "About", section: "quatre" },
            ] as const).map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="text-bg/80 hover:text-bg transition-colors bg-transparent cursor-pointer"
                  onClick={() => {
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
              </li>
            ))}
          </ul>
        </m.div>

        {/* Footer bottom */}
        <m.div
          className="footer-bottom w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 text-sm sm:text-base border-t border-bg/15"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-bg/50">&copy; {new Date().getFullYear()} Vitor K. Silveira</span>

          <ul className="list-none p-0 m-0 flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-bg/60 hover:text-bg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </m.div>
      </div>
    </footer>
  );
}
