"use client";

import { useEffect, useRef } from "react";

/* ─── tiny 3-D math ─────────────────────────────────────── */
type V3 = [number, number, number];

function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function project(p: V3, fov: number, cx: number, cy: number): [number, number] {
  const z = p[2] + fov;
  const f = fov / z;
  return [p[0] * f + cx, p[1] * f + cy];
}

/* ─── geometry builders ──────────────────────────────────── */
function buildSphere(r: number, latN: number, lonN: number): [V3, V3][] {
  const edges: [V3, V3][] = [];
  // latitude rings
  for (let i = 1; i < latN; i++) {
    const theta = (i / latN) * Math.PI;
    const st = Math.sin(theta), ct = Math.cos(theta);
    for (let j = 0; j < lonN; j++) {
      const a = (j / lonN) * Math.PI * 2;
      const b = ((j + 1) / lonN) * Math.PI * 2;
      edges.push([
        [r * st * Math.cos(a), r * ct, r * st * Math.sin(a)],
        [r * st * Math.cos(b), r * ct, r * st * Math.sin(b)],
      ]);
    }
  }
  // longitude arcs
  for (let j = 0; j < lonN; j++) {
    const phi = (j / lonN) * Math.PI * 2;
    const cp = Math.cos(phi), sp = Math.sin(phi);
    for (let i = 0; i < latN; i++) {
      const t1 = (i / latN) * Math.PI;
      const t2 = ((i + 1) / latN) * Math.PI;
      edges.push([
        [r * Math.sin(t1) * cp, r * Math.cos(t1), r * Math.sin(t1) * sp],
        [r * Math.sin(t2) * cp, r * Math.cos(t2), r * Math.sin(t2) * sp],
      ]);
    }
  }
  return edges;
}

function buildOctahedron(r: number): [V3, V3][] {
  const v: V3[] = [
    [r, 0, 0], [-r, 0, 0],
    [0, r, 0], [0, -r, 0],
    [0, 0, r], [0, 0, -r],
  ];
  const faceIdx = [
    [0, 2, 4], [0, 2, 5], [0, 3, 4], [0, 3, 5],
    [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5],
  ];
  const seen = new Set<string>();
  const edges: [V3, V3][] = [];
  for (const [a, b, c] of faceIdx) {
    for (const [x, y] of [[a, b], [b, c], [a, c]] as [number, number][]) {
      const key = `${Math.min(x, y)}-${Math.max(x, y)}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([v[x], v[y]]);
      }
    }
  }
  return edges;
}

/* ─── component ──────────────────────────────────────────── */
export default function ProjectsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-build unit geometries
    const sphereEdges = buildSphere(1, 10, 16);
    const octEdges = buildOctahedron(1);

    let rafId: number;
    let visible = true;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // throttle to ~30fps (decorative)
    let rxS = 0.4, ryS = 0;    // sphere rotation state
    let rxO = 0.6, ryO = 0.8;  // octahedron rotation state
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * DPR;
      canvas.height = canvas.offsetHeight * DPR;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;
      const delta = now - lastFrame;
      if (delta < FRAME_INTERVAL) return;
      lastFrame = now - (delta % FRAME_INTERVAL);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const fov = Math.min(w, h) * 1.1;
      const baseR = Math.min(w, h) * 0.32;

      // ── Both shapes in one batch (same color) ─────────────
      ctx.beginPath();
      const sR = baseR;
      for (const [a, b] of sphereEdges) {
        const sa: V3 = [a[0] * sR, a[1] * sR, a[2] * sR];
        const sb: V3 = [b[0] * sR, b[1] * sR, b[2] * sR];
        const ra = rotX(rotY(sa, ryS), rxS);
        const rb = rotX(rotY(sb, ryS), rxS);
        const pa = project(ra, fov, w * 0.78, h * 0.18);
        const pb = project(rb, fov, w * 0.78, h * 0.18);
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
      }
      const oR = baseR * 0.52;
      for (const [a, b] of octEdges) {
        const oa: V3 = [a[0] * oR, a[1] * oR, a[2] * oR];
        const ob: V3 = [b[0] * oR, b[1] * oR, b[2] * oR];
        const ra = rotX(rotY(oa, ryO), rxO);
        const rb = rotX(rotY(ob, ryO), rxO);
        const pa = project(ra, fov, w * 0.18, h * 0.72);
        const pb = project(rb, fov, w * 0.18, h * 0.72);
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
      }
      ctx.strokeStyle = "rgba(20,20,19,0.10)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── Advance rotations (scaled by actual delta) ─────────
      const dt = delta / 16.67; // normalize to 60fps step
      rxS += 0.0018 * dt;
      ryS += 0.0032 * dt;
      rxO += 0.0024 * dt;
      ryO -= 0.0018 * dt;
    };

    rafId = requestAnimationFrame(draw);

    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
