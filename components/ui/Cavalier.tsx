import { type ReactNode } from "react";

type CavalierProps = {
  heading?: string;
  text?: string;
  theme?: "default" | "light";
  headingSlot?: ReactNode;
  textSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function Cavalier({
  heading,
  text,
  theme = "default",
  headingSlot,
  textSlot,
  children,
  className = "",
}: CavalierProps) {
  const hColor = theme === "light" ? "text-bg" : "text-primary";
  const pColor = theme === "light" ? "text-bg/80" : "text-accent/80";

  return (
    <article
      className={`cavalier text-left relative ${className}`}
      data-theme={theme}
    >
      <div className="cavalier-content relative">
        {headingSlot ??
          (heading && (
            <h2
              className={`m-0 font-serif text-4xl sm:text-5xl lg:text-[96px] font-normal italic leading-[1.05] tracking-tight ${hColor}`}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          ))}
        {textSlot ??
          (text && (
            <p
              className={`mt-6 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl ${pColor}`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        {children}
      </div>
    </article>
  );
}
