export default function WorkIllo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 460 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Desk */}
      <rect x="80" y="320" width="300" height="12" rx="4" fill="rgba(204,243,129,0.3)" />
      <rect x="110" y="332" width="8" height="100" rx="2" fill="rgba(204,243,129,0.2)" />
      <rect x="340" y="332" width="8" height="100" rx="2" fill="rgba(204,243,129,0.2)" />

      {/* Monitor */}
      <rect x="150" y="210" width="160" height="110" rx="6" fill="rgba(204,243,129,0.15)" stroke="rgba(204,243,129,0.3)" strokeWidth="2" />
      <rect x="215" y="320" width="30" height="12" rx="2" fill="rgba(204,243,129,0.2)" />
      <rect x="165" y="225" width="130" height="75" rx="3" fill="rgba(72,49,212,0.15)" />

      {/* Code lines on screen */}
      <rect x="175" y="238" width="60" height="4" rx="2" fill="rgba(204,243,129,0.4)" />
      <rect x="175" y="248" width="90" height="4" rx="2" fill="rgba(204,243,129,0.25)" />
      <rect x="175" y="258" width="45" height="4" rx="2" fill="rgba(204,243,129,0.35)" />
      <rect x="175" y="268" width="75" height="4" rx="2" fill="rgba(204,243,129,0.2)" />
      <rect x="175" y="278" width="55" height="4" rx="2" fill="rgba(204,243,129,0.3)" />

      {/* Person silhouette */}
      <circle cx="230" cy="130" r="35" fill="rgba(204,243,129,0.2)" />
      <path d="M195 170 Q230 210 265 170 L280 210 L180 210 Z" fill="rgba(204,243,129,0.15)" />

      {/* Floating cards */}
      <rect x="20" y="150" width="80" height="60" rx="4" fill="rgba(204,243,129,0.12)" stroke="rgba(204,243,129,0.2)" strokeWidth="1.5" transform="rotate(-8 60 180)" />
      <rect x="360" y="130" width="80" height="60" rx="4" fill="rgba(204,243,129,0.12)" stroke="rgba(204,243,129,0.2)" strokeWidth="1.5" transform="rotate(6 400 160)" />

      {/* Coffee cup */}
      <rect x="350" y="290" width="25" height="30" rx="4" fill="rgba(204,243,129,0.2)" />
      <path d="M375 298 Q390 305 375 312" fill="none" stroke="rgba(204,243,129,0.2)" strokeWidth="2" />
      <path d="M357 285 Q360 275 363 285" fill="none" stroke="rgba(204,243,129,0.15)" strokeWidth="1.5" />

      {/* Plant */}
      <rect x="85" y="290" width="20" height="30" rx="3" fill="rgba(204,243,129,0.2)" />
      <ellipse cx="95" cy="275" rx="18" ry="20" fill="rgba(204,243,129,0.15)" />
      <line x1="95" y1="290" x2="95" y2="260" stroke="rgba(204,243,129,0.25)" strokeWidth="2" />
    </svg>
  );
}
