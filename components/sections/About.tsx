"use client";

import { motion } from "framer-motion";

// Birth date — dynamically calculates age
const BIRTH_DATE = new Date("2001-05-12"); // placeholder — user should update this

function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

const SKILLS = [
  { label: "Node.js", cat: "lang" },
  { label: "TypeScript", cat: "lang" },
  { label: "JavaScript", cat: "lang" },
  { label: "Python", cat: "lang" },
  { label: "C#", cat: "lang" },
  { label: "SQL", cat: "lang" },
  { label: "React.js", cat: "fw" },
  { label: "Next.js", cat: "fw" },
  { label: "ASP.NET", cat: "fw" },
  { label: "React Native", cat: "fw" },
  { label: "Azure DevOps", cat: "tool" },
  { label: "MongoDB", cat: "tool" },
  { label: "Docker", cat: "tool" },
];

const DETAILS = [
  { label: "Name", value: "Vitor K. Silveira" },
  { label: "Age", value: `${getAge(BIRTH_DATE)} years old` },
  { label: "Location", value: "São Paulo, SP — BR" },
  { label: "Role", value: "FullStack Developer" },
  { label: "Email", value: "vitor05kubica12@gmail.com" },
  { label: "Languages", value: "English (Advanced), Spanish (Basic)" },
];

export default function About() {
  const age = getAge(BIRTH_DATE);

  return (
    <section
      data-section="quatre"
      aria-hidden="true"
      className="home-section bg-bg py-20 lg:py-0"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: heading + personal details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Big heading */}
            <div>
              <h2 className="font-sans font-extrabold text-[56px] sm:text-[72px] lg:text-[80px] leading-[1] tracking-tight text-accent m-0">
                About
              </h2>
              {/* Name with green underline decoration */}
              <p className="mt-3 text-xl sm:text-2xl font-semibold text-accent inline-block border-b-2 border-primary pb-1">
                Vitor K. Silveira
              </p>
            </div>

            {/* Personal details */}
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {DETAILS.map((detail) => (
                <li key={detail.label} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="text-primary font-bold mt-0.5 select-none">•</span>
                  <span className="text-accent/60 font-medium min-w-[80px]">
                    {detail.label}
                  </span>
                  <span className="text-accent/90 leading-snug">{detail.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column: bio + skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Bio paragraph */}
            <p className="text-accent/80 leading-relaxed text-base sm:text-lg">
              I&apos;m a FullStack Developer based in São Paulo, passionate about
              crafting solid and scalable products with great user experiences.
              With {age} years of age and over 4 years of experience, I work
              across the full stack — from performant APIs to polished interfaces.
              <br />
              <br />
              I believe in clean code, thoughtful architecture, and continuous
              learning. Currently working at GFT Consultoria on Crefisa&apos;s
              platform, building features that impact thousands of users every
              day.
            </p>

            {/* Skills grid */}
            <div>
              <p className="text-xs uppercase tracking-widest text-accent/40 font-medium mb-3">
                Skills &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={
                      skill.cat === "fw"
                        ? "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/30"
                        : "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/5 text-accent/80 border border-accent/15"
                    }
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
