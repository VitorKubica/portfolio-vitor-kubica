export function CornerstonePatternsRight({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="280"
      height="208"
      viewBox="0 0 280 208"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-shape
    >
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <rect
            key={`r-${row}-${col}`}
            x={col * 36 + 4}
            y={row * 36 + 4}
            width="24"
            height="24"
            rx="2"
            fill="none"
            stroke="rgba(72, 49, 212, 0.12)"
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}

export function CornerstonePatternsLeft({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="182"
      height="188"
      viewBox="0 0 182 188"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-shape
    >
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <circle
            key={`l-${row}-${col}`}
            cx={col * 40 + 20}
            cy={row * 40 + 20}
            r="12"
            fill="none"
            stroke="rgba(72, 49, 212, 0.10)"
            strokeWidth="1.5"
          />
        ))
      )}
    </svg>
  );
}
