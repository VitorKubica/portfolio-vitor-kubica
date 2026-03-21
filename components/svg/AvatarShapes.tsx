export default function AvatarShapes({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-shape
    >
      <rect x="30" y="20" width="340" height="280" rx="3" fill="rgba(4,77,53,0.06)" />
      <rect x="10" y="50" width="120" height="120" rx="3" fill="rgba(4,77,53,0.08)" />
      <circle cx="340" cy="70" r="40" fill="rgba(4,77,53,0.05)" />
      <circle cx="60" cy="260" r="30" fill="rgba(4,77,53,0.07)" />
      <rect x="280" y="200" width="100" height="80" rx="3" fill="rgba(4,77,53,0.06)" />
    </svg>
  );
}
