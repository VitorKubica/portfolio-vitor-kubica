"use client";

import { m } from "framer-motion";

const BIRTH_DATE = new Date("2004-05-12");

function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const md = today.getMonth() - birthDate.getMonth();
  if (md < 0 || (md === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

const SKILLS = [
  { label: "Node.js",       cat: "lang" },
  { label: "TypeScript",    cat: "lang" },
  { label: "JavaScript",    cat: "lang" },
  { label: "Python",        cat: "lang" },
  { label: "C#",            cat: "lang" },
  { label: "SQL",           cat: "lang" },
  { label: "React.js",      cat: "fw"   },
  { label: "Next.js",       cat: "fw"   },
  { label: "ASP.NET",       cat: "fw"   },
  { label: "React Native",  cat: "fw"   },
  { label: "Azure DevOps",  cat: "tool" },
  { label: "MongoDB",       cat: "tool" },
  { label: "Docker",        cat: "tool" },
];

const DETAILS = [
  { label: "Name",      value: "Vitor K. Silveira"            },
  { label: "Age",       value: `${getAge(BIRTH_DATE)} years`  },
  { label: "Location",  value: "São Paulo, SP"                 },
  { label: "Role",      value: "FullStack Developer"           },
  { label: "Email",     value: "vitor05kubica12@gmail.com"     },
  { label: "Languages", value: "EN (Advanced) · ES (Basic)"   },
];

const AGE = getAge(BIRTH_DATE);

export default function About() {

  return (
    <section
      data-section="quatre"
      aria-hidden="true"
      className="home-section bg-bg"
    >

      {/* ══════════════════════════════════════
          MOBILE layout (hidden on sm+)
          Everything on one screen, no scroll
      ══════════════════════════════════════ */}
      <div className="sm:hidden w-full h-full flex flex-col px-5 pt-20 pb-6 gap-4">

        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          <h2 className="font-sans font-extrabold text-[36px] leading-none tracking-tight text-accent">
            About
          </h2>
          <p className="mt-1 text-sm font-semibold text-accent border-b-2 border-primary pb-0.5 inline-block">
            Vitor K. Silveira
          </p>
        </m.div>

        {/* Personal details — 2-column grid */}
        <m.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="shrink-0 list-none p-0 m-0 grid grid-cols-2 gap-x-4 gap-y-1.5"
        >
          {DETAILS.map((d) => (
            <li key={d.label} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-accent/40 font-semibold leading-none mb-0.5">
                {d.label}
              </span>
              <span className="text-xs text-accent/85 leading-snug font-medium">
                {d.value}
              </span>
            </li>
          ))}
        </m.ul>

        {/* Bio — 1 compact paragraph */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="shrink-0 text-accent/70 text-xs leading-relaxed"
        >
          FullStack Developer with {AGE}+ years of experience building scalable
          products — from performant APIs to polished interfaces. Currently at
          GFT Consultoria working on Crefisa&apos;s platform.
        </m.p>

        {/* Skills */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="shrink-0"
        >
          <p className="text-[10px] uppercase tracking-widest text-accent/40 font-semibold mb-2">
            Skills &amp; Tools
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS.map((skill) => (
              <span
                key={skill.label}
                className={
                  skill.cat === "fw"
                    ? "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/25"
                    : "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/5 text-accent/75 border border-accent/15"
                }
              >
                {skill.label}
              </span>
            ))}
          </div>
        </m.div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP layout (hidden on mobile)
      ══════════════════════════════════════ */}
      <div className="hidden sm:flex w-full h-full overflow-y-auto flex-col lg:justify-center">
        <div className="w-full px-10 lg:px-16 max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: heading + details */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="font-sans font-extrabold text-[56px] lg:text-[80px] leading-[1] tracking-tight text-accent m-0">
                  About
                </h2>
                <p className="mt-3 text-xl sm:text-2xl font-semibold text-accent inline-block border-b-2 border-primary pb-1">
                  Vitor K. Silveira
                </p>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {DETAILS.map((detail) => (
                  <li key={detail.label} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className="text-primary font-bold mt-0.5 select-none">•</span>
                    <span className="text-accent/60 font-medium min-w-[80px]">{detail.label}</span>
                    <span className="text-accent/90 leading-snug">{detail.value}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Right: bio + skills */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <p className="text-accent/80 leading-relaxed text-base sm:text-lg">
                I&apos;m a FullStack Developer based in São Paulo, passionate about
                crafting solid and scalable products with great user experiences.
                With {AGE} years of age and over 4 years of experience, I work
                across the full stack — from performant APIs to polished interfaces.
                <br /><br />
                I believe in clean code, thoughtful architecture, and continuous
                learning. Currently working at GFT Consultoria on Crefisa&apos;s
                platform, building features that impact thousands of users every day.
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest text-accent/40 font-medium mb-3">
                  Skills &amp; Tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, i) => (
                    <m.span
                      key={skill.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                      viewport={{ once: true }}
                      className={
                        skill.cat === "fw"
                          ? "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/30"
                          : "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/5 text-accent/80 border border-accent/15"
                      }
                    >
                      {skill.label}
                    </m.span>
                  ))}
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </div>

    </section>
  );
}
