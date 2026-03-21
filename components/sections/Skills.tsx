import Cavalier from "../ui/Cavalier";
import SquareOfDots from "../svg/SquareOfDots";
import {
  CornerstonePatternsRight,
  CornerstonePatternsLeft,
} from "../svg/CornerstonePatterns";

export default function Skills() {
  return (
    <section
      data-section="deux"
      aria-hidden="true"
      className="home-section bg-white py-20 lg:py-0"
    >
      <div className="w-full flex flex-col gap-16 lg:gap-24 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        {/* Design */}
        <Cavalier
          heading="Design"
          className="relative"
          textSlot={
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-deep-purple max-w-xl">
              I&apos;m probably not the typical designer positioned behind an
              Illustrator artboard adjusting pixels, but I design. Immersed in
              stylesheets tweaking font sizes and contemplating layouts is where
              you&apos;ll find me (~_^). I&apos;m committed to creating fluent
              user experiences while staying fashionable.
            </p>
          }
        >
          <SquareOfDots className="absolute -top-10 right-48 w-24 h-28 text-electric-blue hidden lg:block" />
          <CornerstonePatternsRight className="absolute top-0 right-0 w-56 h-44 hidden lg:block" />
        </Cavalier>

        {/* Engineering */}
        <Cavalier
          heading="Engineering"
          className="relative lg:self-end"
          textSlot={
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-deep-purple max-w-xl">
              In building JavaScript applications, I&apos;m equipped with just
              the right tools, and can absolutely function independently of them
              to deliver fast, resilient solutions optimized for scale —
              performance and scalability are priorities on my radar.
            </p>
          }
        >
          <CornerstonePatternsLeft className="absolute top-12 -left-40 w-40 h-44 hidden lg:block" />
        </Cavalier>
      </div>
    </section>
  );
}
