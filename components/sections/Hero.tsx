"use client";

import { m } from "framer-motion";

export default function Hero() {
  return (
    <section
      data-section="une"
      aria-hidden="false"
      className="home-section flex-col bg-bg overflow-hidden"
    >
      {/* Background — WebP only (97%+ browser support) */}
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet="/images/bg_desktop.webp" type="image/webp" media="(min-width: 640px)" />
        <img
          src="/images/bg_mobile.webp"
          alt=""
          className="w-full h-full object-cover [object-position:50%_88%] sm:object-center"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Mobile gradient overlay — deepens top area for text legibility */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,77,53,0.55) 0%, rgba(4,77,53,0.15) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 w-full px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 lg:pt-40">
        <m.h1
          className="m-0 font-sans text-[48px] sm:text-[64px] lg:text-[96px] font-extrabold leading-[1.05] text-bg tracking-tight"
          aria-label="FullStack Developer."
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <span aria-hidden="true">
            FullStack
            <br />
            Developer<span className="text-bg/60">.</span>
          </span>
        </m.h1>

        <m.p
          className="mt-6 text-bg/80 text-base sm:text-lg leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Crafting solid, scalable products
          <br />
          with great user experiences.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <a
            href="/cv.pdf"
            download
            className="border border-bg text-bg px-6 py-3 rounded-[3px] uppercase tracking-widest text-sm font-medium hover:bg-bg hover:text-accent transition-all duration-300 inline-flex items-center gap-2"
          >
            Download CV
          </a>
        </m.div>
      </div>

      {/* Bottom highlights */}
      <m.div
        className="hidden sm:flex relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-8 lg:pb-14 mt-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-bg/70 text-sm sm:text-base leading-relaxed max-w-2xl list-none p-0 m-0">
          <li className="sm:w-1/2">
            Highly skilled at progressive enhancement, design systems &amp; UI
            Engineering.
          </li>
          <li className="sm:w-1/2">
            Over the years building products for clients across several
            countries.
          </li>
        </ul>
      </m.div>
    </section>
  );
}
