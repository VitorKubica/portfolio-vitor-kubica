export default function BowArrow({ className }: { className?: string }) {
  return (
    <svg
      width="72"
      height="22"
      viewBox="0 0 72 22"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="0"
        d="M.043 11.119h70.714M60.917 1.319l9.8 9.8-9.8 9.8"
      />
    </svg>
  );
}
