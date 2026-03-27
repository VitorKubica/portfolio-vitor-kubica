import { type ReactNode } from "react";
import BowArrow from "../svg/BowArrow";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  noArrow?: boolean;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "secondary",
  noArrow = false,
  className = "",
  disabled = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const base = `group relative font-medium uppercase tracking-widest text-sm select-none inline-flex overflow-hidden bg-transparent whitespace-nowrap rounded-[3px] ${className}`;

  const inner = (
    <div
      className={`relative z-[1] flex items-center justify-center py-4 px-8 w-full rounded-[3px] transition-all duration-500 ${
        isPrimary
          ? "bg-primary text-bg border border-primary group-hover:bg-primary/90"
          : "bg-transparent text-accent border border-accent group-hover:text-bg"
      }`}
    >
      <span className="relative z-[1]">{children}</span>
      {!noArrow && (
        <BowArrow className="relative z-[1] w-12 h-5 ml-4" />
      )}
      {/* Slide-in bg for secondary */}
      {!isPrimary && (
        <span className="absolute inset-0 z-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[3px]" />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={base} disabled={disabled}>
      {inner}
    </button>
  );
}
