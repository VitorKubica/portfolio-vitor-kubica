"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── data ─────────────────────────────────────────────── */

const EDUCATION = [
  {
    institution: "FIAP",
    degree: "Computer Science",
    period: "Jan 2026 — Dec 2029",
    location: "São Paulo, SP",
    relevant: [],
  },
  {
    institution: "FIAP",
    degree: "Systems Analysis and Development",
    period: "Completed Dec 2024",
    location: "São Paulo, SP",
    relevant: ["Machine Learning", ".NET Core", "Data Science", "Big Data"],
  },
];

const CERTS = [
  { title: "Machine Learning Foundations",     issuer: "FIAP", year: "2024" },
  { title: ".NET Core Development",            issuer: "FIAP", year: "2024" },
  { title: "Data Science Essentials",          issuer: "FIAP", year: "2024" },
  { title: "Big Data & Analytics",             issuer: "FIAP", year: "2024" },
  { title: "FullStack Web Development",        issuer: "FIAP", year: "2023" },
];

/* ─────────────────────────────────────────────────────────
   Neural-net layout — 2D positions (0-1 range) with subtle
   per-node floating. No perspective / no zoom — static size.
──────────────────────────────────────────────────────────*/

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rng = seededRandom(42);

/* Certificate nodes — manually placed to spread nicely */
const CERT_POSITIONS = [
  { x: 0.22, y: 0.18 },  // top-left
  { x: 0.48, y: 0.32 },  // center
  { x: 0.72, y: 0.22 },  // top-right
  { x: 0.18, y: 0.55 },  // left
  { x: 0.68, y: 0.58 },  // right
  { x: 0.42, y: 0.72 },  // bottom-center
];
const CERT_COUNT = CERT_POSITIONS.length;

/* Decorative dot nodes — scattered around */
const MOBILE_DECO_COUNT = 22;          // cleaner on small screens
const DECO_POSITIONS: { x: number; y: number; size: number }[] = [];
for (let i = 0; i < 55; i++) {
  const x = 0.04 + rng() * 0.92;
  const y = 0.04 + rng() * 0.92;
  const size = rng() < 0.3 ? 4.5 : rng() < 0.6 ? 3 : 2;
  DECO_POSITIONS.push({ x, y, size });
}

/* All node positions (cert first, then deco) */
const ALL_X = [...CERT_POSITIONS.map(p => p.x), ...DECO_POSITIONS.map(p => p.x)];
const ALL_Y = [...CERT_POSITIONS.map(p => p.y), ...DECO_POSITIONS.map(p => p.y)];
const TOTAL = ALL_X.length;

/* Build edges: connect nearby nodes */
const EDGES: [number, number][] = [];
for (let i = 0; i < TOTAL; i++) {
  for (let j = i + 1; j < TOTAL; j++) {
    const dx = ALL_X[i] - ALL_X[j];
    const dy = ALL_Y[i] - ALL_Y[j];
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 0.18) EDGES.push([i, j]);
  }
}
/* Ensure cert nodes are connected to nearby dots */
for (let c = 0; c < CERT_COUNT; c++) {
  const myEdges = EDGES.filter(([a, b]) => a === c || b === c).length;
  if (myEdges < 5) {
    const dists = [];
    for (let j = CERT_COUNT; j < TOTAL; j++) {
      const dx = ALL_X[c] - ALL_X[j];
      const dy = ALL_Y[c] - ALL_Y[j];
      dists.push({ d: Math.sqrt(dx * dx + dy * dy), j });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 6; k++) {
      const j = dists[k].j;
      if (!EDGES.some(([a, b]) => (a === c && b === j) || (a === j && b === c))) {
        EDGES.push([c, j]);
      }
    }
  }
}

/* Per-node random phase offsets for floating animation */
const PHASE_X: number[] = [];
const PHASE_Y: number[] = [];
const PHASE_FADE: number[] = [];
const SPEED: number[] = [];
const FADE_SPEED: number[] = [];
/* Give each node a Z depth for 3D rotation */
const NODE_Z: number[] = [];
for (let i = 0; i < TOTAL; i++) {
  PHASE_X.push(rng() * Math.PI * 2);
  PHASE_Y.push(rng() * Math.PI * 2);
  PHASE_FADE.push(rng() * Math.PI * 2);
  SPEED.push(0.3 + rng() * 0.4);
  FADE_SPEED.push(0.15 + rng() * 0.25);
  NODE_Z.push((rng() - 0.5) * 0.6); // -0.3 to 0.3
}

/* ─── component ────────────────────────────────────────── */
export default function Education() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const labelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [popup, setPopup] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    let time = 0;
    let rafId: number;
    let visible = true;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * DPR;
      canvas.height = canvas.offsetHeight * DPR;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      if (!visible) { rafId = requestAnimationFrame(tick); return; }
      const W = canvas.width, H = canvas.height;
      const w = W / DPR, h = H / DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);

      time += 0.016;

      const isMobile = w < 640;
      const effectiveTotal = isMobile ? CERT_COUNT + MOBILE_DECO_COUNT : TOTAL;

      /* Lissajous-style dual rotation — natural organic feel */
      const rotY = time * 0.10;               // horizontal swing
      const rotX = Math.sin(time * 0.07) * 0.35; // vertical rocks back & forth
      const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);

      /* Compute positions: 3D rotation + gentle float */
      const drift = 12;
      const px: number[] = [];
      const py: number[] = [];
      const pz: number[] = [];
      for (let i = 0; i < effectiveTotal; i++) {
        const bx = ALL_X[i] - 0.5;
        const by = ALL_Y[i] - 0.5;
        const bz = NODE_Z[i];

        /* Rotate around Y axis (horizontal) */
        let rx = bx * cosRY + bz * sinRY;
        let ry = by;
        let rz = -bx * sinRY + bz * cosRY;

        /* Then rotate around X axis (vertical tilt) */
        const ry2 = ry * cosRX - rz * sinRX;
        const rz2 = ry * sinRX + rz * cosRX;

        /* Subtle perspective */
        const persp = 1 + rz2 * 0.15;

        px.push(
          (0.5 + rx * persp) * w
          + Math.sin(time * SPEED[i] + PHASE_X[i]) * drift
        );
        py.push(
          (0.5 + ry2 * persp) * h
          + Math.cos(time * SPEED[i] + PHASE_Y[i]) * drift
        );
        pz.push(rz2);
      }

      /* Draw edges — batched into single path for performance */
      ctx.beginPath();
      ctx.strokeStyle = "rgba(210,205,190,0.18)";
      ctx.lineWidth = 0.9;
      EDGES.forEach(([a, b]) => {
        if (a >= effectiveTotal || b >= effectiveTotal) return;
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
      });
      ctx.stroke();

      /* Draw decorative dots — fade in/out */
      for (let i = CERT_COUNT; i < effectiveTotal; i++) {
        const decoIdx = i - CERT_COUNT;
        const baseR = DECO_POSITIONS[decoIdx].size;
        const fade = 0.5 + 0.5 * Math.sin(time * FADE_SPEED[i] + PHASE_FADE[i]);
        const alpha = 0.08 + fade * 0.82;
        if (alpha < 0.06) continue;

        ctx.beginPath();
        ctx.arc(px[i], py[i], baseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,215,200,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      /* Update cert label positions + subtle breathing scale */
      for (let i = 0; i < CERT_COUNT; i++) {
        const el = labelRefs.current[i];
        if (el) {
          el.style.left = px[i] + "px";
          el.style.top  = py[i] + "px";
          const scale = 1 + 0.08 * Math.sin(time * 0.4 + i * 1.2);
          el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(3)})`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    tick();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <section
      data-section="cinq"
      aria-hidden="true"
      className="home-section bg-[#022D20] font-serif italic"
    >

      {/* ── POPUP ─────────────────────────────────────── */}
      <AnimatePresence>
        {popup !== null && (
          <motion.div
            key="pop-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-green backdrop-blur-sm"
            onClick={() => setPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 8 }}
              animate={{ scale: 1,   opacity: 1, rotateX: 0 }}
              exit={{    scale: 0.9, opacity: 0, rotateX: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="
                relative w-[340px] max-w-[92vw]
                bg-[#f5f0e1] rounded-sm
                shadow-[0_12px_50px_rgba(0,0,0,0.5)]
                not-italic
              "
              style={{ perspective: 800 }}
            >
              {/* parchment texture overlay */}
              <div className="absolute inset-0 rounded-sm opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />

              {/* decorative double border */}
              <div className="absolute inset-3 border border-[#c4a96a]/40 rounded-sm pointer-events-none" />
              <div className="absolute inset-5 border border-[#c4a96a]/20 rounded-sm pointer-events-none" />

              {/* corner ornaments */}
              {[["top-6 left-6","rotate-0"],["top-6 right-6","rotate-90"],["bottom-6 left-6","-rotate-90"],["bottom-6 right-6","rotate-180"]].map(([pos, rot]) => (
                <div key={pos} className={`absolute ${pos} ${rot} text-[#c4a96a]/30 text-lg leading-none pointer-events-none`}>
                  ❧
                </div>
              ))}

              {/* close button */}
              <button
                onClick={() => setPopup(null)}
                className="absolute top-2 right-3 text-[#8b7d6b]/40 hover:text-[#8b7d6b]/80 transition-colors text-base leading-none z-10 font-sans"
              >
                ✕
              </button>

              {/* certificate content */}
              <div className="relative px-10 py-10 flex flex-col items-center text-center">

                {/* top flourish */}
                <div className="text-[#c4a96a]/50 text-2xl mb-3 tracking-[0.3em]">⁕ ⁕ ⁕</div>

                {/* header */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b7d6b]/60 font-sans mb-1">
                  Certificate of Completion
                </p>

                {/* thin rule */}
                <div className="w-16 h-px bg-[#c4a96a]/40 mb-5" />

                {/* "this certifies" */}
                <p className="text-[11px] text-[#8b7d6b]/50 font-sans mb-3">
                  This is to certify the successful completion of
                </p>

                {/* title */}
                <h3 className="font-bold text-[#2a2216] text-xl leading-snug mb-4 font-serif italic">
                  {CERTS[popup].title}
                </h3>

                {/* thin rule */}
                <div className="w-24 h-px bg-[#c4a96a]/30 mb-4" />

                {/* issuer + year */}
                <p className="text-[11px] text-[#8b7d6b]/50 font-sans mb-0.5">Awarded by</p>
                <p className="text-sm font-bold text-[#2a2216]/80 font-sans tracking-wide">
                  {CERTS[popup].issuer}
                </p>
                <p className="text-xs text-[#8b7d6b]/40 font-sans mt-1">
                  {CERTS[popup].year}
                </p>

                {/* seal */}
                <div className="mt-6 w-12 h-12 rounded-full border-2 border-[#c4a96a]/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-[#c4a96a]/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c4a96a]/60">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BODY ─────────────────────────────────────── */}
      <div className="w-full h-full flex flex-col lg:flex-row">

        {/* LEFT — academic cards */}
        <div className="lg:w-[42%] shrink-0 flex flex-col justify-center
                        px-6 sm:px-10 lg:px-14
                        pt-20 pb-6 lg:py-16">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bg/40 mb-1">
            Academic Background
          </p>
          <h2
            className="font-bold text-3xl sm:text-4xl text-bg leading-tight italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Education
          </h2>
          <div className="mt-2 mb-6 w-10 h-[3px] bg-bg/30 rounded-full" />

          <div className="flex flex-col gap-3">
            {EDUCATION.map(edu => (
              <article
                key={`${edu.institution}-${edu.degree}`}
                className="bg-bg/[0.05] border border-bg/10 rounded-lg p-4 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-bg/70 text-xs uppercase tracking-wide">
                    {edu.institution}
                  </span>
                  <span className="text-bg/25 text-xs">{edu.location}</span>
                </div>
                <h3 className="font-extrabold text-bg text-base leading-snug">
                  {edu.degree}
                </h3>
                <p className="text-bg/35 text-xs">{edu.period}</p>
                {edu.relevant.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {edu.relevant.map(tag => (
                      <span
                        key={tag}
                        className="bg-primary/20 text-bg/70 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-primary/25 not-italic font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT — 3-D neural net */}
        <div className="flex-1 flex flex-col min-h-[45vh] lg:min-h-0 lg:py-16 lg:pr-10">

          <div className="px-6 sm:px-10 lg:px-4 pb-2 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bg/40 mb-0.5">
              Professional Development
            </p>
            <h2
              className="font-extrabold text-2xl text-bg leading-tight italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Certificates
            </h2>
            <p className="text-bg/20 text-[11px] mt-0.5">tap a node to view</p>
          </div>

          {/* canvas + label overlays */}
          <div className="relative flex-1">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {CERTS.map((cert, i) => (
              <div
                key={cert.title}
                ref={el => { labelRefs.current[i] = el; }}
                onClick={() => setPopup(i)}
                className="absolute pointer-events-auto cursor-pointer"
                style={{ left: 0, top: 0, transform: "translate(-50%,-50%)" }}
              >
                <div className="
                  bg-bg/10 backdrop-blur-md border border-bg/20
                  rounded-lg px-2 py-1 whitespace-nowrap
                  hover:bg-bg/20 hover:border-bg/35 hover:scale-105
                  transition-all duration-200 select-none
                  shadow-[0_2px_16px_rgba(0,0,0,0.25)]
                ">
                  <p className="text-[10px] text-bg/50 leading-none not-italic font-sans mb-0.5">
                    {cert.issuer}
                  </p>
                  <p className="text-[11px] text-bg font-semibold leading-tight not-italic font-sans">
                    {cert.title.length > 22 ? cert.title.slice(0, 20) + "…" : cert.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
