import { type ReactNode } from "react";

type CavalierProps = {
  heading?: string;
  text?: string;
  theme?: "electric" | "lime";
  headingSlot?: ReactNode;
  textSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function Cavalier({
  heading,
  text,
  theme = "electric",
  headingSlot,
  textSlot,
  children,
  className = "",
}: CavalierProps) {
  const hColor = theme === "lime" ? "text-lime" : "text-electric-blue";
  const pColor = theme === "lime" ? "text-white" : "text-deep-purple";

  return (
    <article
      className={`cavalier text-left relative ${className}`}
      data-theme={theme}
    >
      <div className="cavalier-content relative">
        {headingSlot ??
          (heading && (
            <h2
              className={`m-0 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight ${hColor}`}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          ))}
        {textSlot ??
          (text && (
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed max-w-xl ${pColor}`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        {children}
      </div>
    </article>
  );
}
