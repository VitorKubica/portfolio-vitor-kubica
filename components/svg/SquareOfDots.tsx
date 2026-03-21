export default function SquareOfDots({ className }: { className?: string }) {
  const dots = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 8; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * 14 + 7}
          cy={row * 14 + 7}
          r="2.5"
          fill="currentColor"
          opacity="0.3"
        />
      );
    }
  }

  return (
    <svg
      className={className}
      width="112"
      height="126"
      viewBox="0 0 112 126"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-shape
    >
      {dots}
    </svg>
  );
}
