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
  { title: "Systems Analysis and Development", issuer: "FIAP", year: "2024" },
  { title: "Machine Learning Foundations",     issuer: "FIAP", year: "2024" },
  { title: ".NET Core Development",            issuer: "FIAP", year: "2024" },
  { title: "Data Science Essentials",          issuer: "FIAP", year: "2024" },
  { title: "Big Data & Analytics",             issuer: "FIAP", year: "2024" },
  { title: "FullStack Web Development",        issuer: "FIAP", year: "2023" },
];

/* ─────────────────────────────────────────────────────────
   Neural-net node positions (unit sphere coords).
   Indices 0-5  →  certificate nodes (get label cards).
   Indices 6-13 →  decorative nodes  (dots + edges only).
──────────────────────────────────────────────────────────*/
const ALL_NODES = [
  /* cert nodes */
  { x:  0.62, y: -0.28, z:  0.22 },
  { x: -0.52, y:  0.38, z:  0.48 },
  { x:  0.12, y:  0.68, z: -0.42 },
  { x: -0.68, y: -0.22, z: -0.28 },
  { x:  0.32, y: -0.58, z:  0.52 },
  { x: -0.22, y:  0.18, z: -0.68 },
  /* decorative nodes */
  { x:  0.85, y:  0.10, z: -0.15 },
  { x: -0.10, y: -0.75, z: -0.10 },
  { x:  0.40, y:  0.55, z:  0.60 },
  { x: -0.75, y:  0.22, z:  0.40 },
  { x:  0.22, y:  0.14, z:  0.85 },
  { x: -0.34, y: -0.50, z: -0.54 },
  { x:  0.60, y:  0.50, z: -0.22 },
  { x: -0.16, y: -0.30, z:  0.80 },
];
const CERT_COUNT = 6; // first N nodes are cert nodes

const EDGES: [number, number][] = [
  /* cert ring */
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
  /* cert diagonals */
  [0,3],[1,4],[2,5],
  /* certs → decorative */
  [0,6],[0,10],[1,9],[1,8],[2,12],[3,11],[4,7],[4,13],[5,11],[5,9],
  /* decorative web */
  [6,12],[7,11],[8,9],[10,13],[6,10],[7,13],[8,13],[9,11],
];

/* ─── 3-D math ─────────────────────────────────────────── */
type V3 = { x: number; y: number; z: number };

function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function proj(p: V3, fov: number, cx: number, cy: number, r: number) {
  const sc = fov / (fov + p.z * r * 0.5);
  return { px: cx + p.x * r * sc, py: cy + p.y * r * sc, sc };
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
    let ry = 0, rx = 0.25, time = 0;
    let rafId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * DPR;
      canvas.height = canvas.offsetHeight * DPR;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const W = canvas.width, H = canvas.height;
      const w = W / DPR, h = H / DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ry   += 0.003;
      rx   += 0.0009;
      time += 0.016;

      const cx = w * 0.5;
      const cy = h * 0.5;
      const r  = Math.min(w, h) * 0.36;
      const fov = 2.8;

      /* project every node, with per-node floating oscillation */
      const pts = ALL_NODES.map((n, i) => {
        const floated: V3 = {
          x: n.x + Math.sin(time * 0.30 + i * 1.20) * 0.055,
          y: n.y + Math.cos(time * 0.22 + i * 0.85) * 0.055,
          z: n.z + Math.sin(time * 0.18 + i * 1.50) * 0.055,
        };
        return proj(rotX(rotY(floated, ry), rx), fov, cx, cy, r);
      });

      /* edges — painter's algorithm (far first) */
      [...EDGES]
        .sort((a, b) => {
          const da = (pts[a[0]].sc + pts[a[1]].sc) / 2;
          const db = (pts[b[0]].sc + pts[b[1]].sc) / 2;
          return da - db;
        })
        .forEach(([a, b]) => {
          const pa = pts[a], pb = pts[b];
          const alpha = ((pa.sc + pb.sc) / 2 - 0.45) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(46,139,87,${Math.max(0, alpha)})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(pa.px, pa.py);
          ctx.lineTo(pb.px, pb.py);
          ctx.stroke();
        });

      /* nodes */
      pts.forEach(({ px, py, sc }, i) => {
        const isCert = i < CERT_COUNT;
        const dotR   = isCert ? 4 + sc * 2.5 : 2.5 + sc * 1.5;

        /* glow */
        const grd = ctx.createRadialGradient(px, py, 0, px, py, dotR * 3);
        grd.addColorStop(0, `rgba(46,139,87,${sc * (isCert ? 0.55 : 0.3)})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, dotR * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* solid dot */
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fillStyle = isCert
          ? `rgba(46,139,87,${0.6 + sc * 0.4})`
          : `rgba(46,139,87,${0.25 + sc * 0.3})`;
        ctx.fill();

        /* update cert label DOM */
        if (isCert) {
          const el = labelRefs.current[i];
          if (el) {
            el.style.left      = px + "px";
            el.style.top       = py + "px";
            el.style.opacity   = (0.65 + sc * 0.35).toFixed(3);
            el.style.transform = `translate(-50%,-50%) scale(${(0.72 + sc * 0.28).toFixed(3)})`;
            el.style.zIndex    = String(Math.round(sc * 100));
          }
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      data-section="cinq"
      aria-hidden="true"
      className="home-section bg-accent"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm"
            onClick={() => setPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 12 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.85, opacity: 0, y: 12  }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
              className="bg-accent border border-primary/30 rounded-xl p-6 w-80 max-w-[90vw] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  Certificate
                </span>
                <button
                  onClick={() => setPopup(null)}
                  className="text-bg/30 hover:text-bg transition-colors text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-sans font-extrabold text-bg text-lg leading-snug mb-2">
                {CERTS[popup].title}
              </h3>
              <p className="text-bg/45 text-sm">
                {CERTS[popup].issuer} · {CERTS[popup].year}
              </p>

              <div className="mt-5 h-[1px] w-12 bg-primary/50 rounded-full" />
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
          <h2 className="font-extrabold text-3xl sm:text-4xl text-bg leading-tight">
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
                        className="bg-primary/20 text-bg/70 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-primary/25"
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
            <h2 className="font-extrabold text-2xl text-bg leading-tight">
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
                  bg-accent/90 border border-bg/10 rounded-lg
                  px-2 py-1.5 w-[108px]
                  hover:border-primary/50 hover:bg-accent
                  transition-all duration-150 select-none
                ">
                  <p className="text-[8px] text-bg/40 font-bold uppercase tracking-wider leading-none mb-0.5">
                    {cert.issuer} · {cert.year}
                  </p>
                  <p className="text-[9px] text-bg/75 leading-tight font-medium line-clamp-2">
                    {cert.title}
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
