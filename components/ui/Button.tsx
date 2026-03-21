import { type ReactNode } from "react";
import BowArrow from "../svg/BowArrow";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  lime?: boolean;
  noArrow?: boolean;
  className?: string;
};

export default function Button({
  children,
  href,
  type = "button",
  lime = false,
  noArrow = false,
  className = "",
}: ButtonProps) {
  const base = `sauce-button group relative font-bold uppercase tracking-widest text-sm select-none inline-flex overflow-hidden bg-transparent whitespace-nowrap ${className}`;

  const inner = (
    <div
      className={`relative z-[1] flex items-center justify-center py-4 px-8 w-full border border-current transition-colors duration-500 ${
        lime
          ? "text-lime group-hover:text-deep-purple group-hover:border-lime"
          : "text-electric-blue group-hover:text-white group-hover:border-electric-blue"
      }`}
    >
      <span className="relative z-[1]">{children}</span>
      {!noArrow && (
        <BowArrow className="relative z-[1] w-12 h-5 ml-4" />
      )}
      <span
        className={`absolute inset-0 z-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          lime ? "bg-lime" : "bg-electric-blue"
        }`}
      />
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
    <button type={type} className={base}>
      {inner}
    </button>
  );
}
