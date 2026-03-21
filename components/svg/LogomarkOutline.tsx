export default function LogomarkOutline({
  id,
  className,
  style,
}: {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      id={id}
      className={className}
      style={style}
      viewBox="0 0 120 740"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-shape
    >
      <rect
        x="2"
        y="2"
        width="116"
        height="736"
        rx="8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="3"
      />
      <rect
        x="16"
        y="16"
        width="88"
        height="708"
        rx="6"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="2"
      />
      <circle cx="60" cy="100" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      <circle cx="60" cy="370" r="50" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
      <circle cx="60" cy="640" r="30" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      <line x1="60" y1="130" x2="60" y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="60" y1="420" x2="60" y2="610" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    </svg>
  );
}
