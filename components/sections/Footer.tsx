const SOCIAL_LINKS = [
  { label: "GH", href: "https://github.com/vitorkubica", ariaLabel: "Vitor on GitHub" },
  { label: "LN", href: "https://linkedin.com/in/vitorkubica", ariaLabel: "Vitor on LinkedIn" },
  { label: "TW", href: "https://twitter.com/vitorkubica", ariaLabel: "Vitor on Twitter" },
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
        <div className="footer-main w-full flex flex-col sm:flex-row gap-10 sm:gap-20 mb-14">
          <div>
            <span className="block uppercase text-xs tracking-[0.25em] text-bg/40 mb-2">
              Say Hello
            </span>
            <ul className="list-none p-0 m-0 text-base sm:text-lg leading-relaxed">
              <li>
                <a href="mailto:hello@vitorkubica.dev" className="text-bg/80 hover:text-bg transition-colors">
                  hello@vitorkubica.dev
                </a>
              </li>
            </ul>
          </div>

          <ul className="list-none p-0 m-0 text-base sm:text-lg leading-relaxed space-y-1">
            <li>
              <a href="#work" className="text-bg/80 hover:text-bg transition-colors">
                My Work
              </a>
            </li>
            <li>
              <a href="#articles" className="text-bg/80 hover:text-bg transition-colors">
                My Shelf
              </a>
            </li>
          </ul>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 text-sm sm:text-base border-t border-bg/15">
          <span className="text-bg/50">&copy; Vitor Kubica {new Date().getFullYear()}</span>

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
        </div>
      </div>
    </footer>
  );
}
