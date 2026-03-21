import Cavalier from "../ui/Cavalier";
import Button from "../ui/Button";

export default function Showcase() {
  return (
    <section
      data-section="quatre"
      aria-hidden="true"
      className="home-section bg-white py-20 lg:py-0"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row w-full">
          {/* Lane 1 */}
          <div className="flex-1 p-8 sm:p-10 lg:p-16 border-b sm:border-b-0 sm:border-r border-electric-blue/20">
            <Cavalier
              heading="I build &amp; <br/> design stuff"
              text="Open source <br/> projects, web apps <br/> and experimentals."
              className="mb-10 [&_h2]:!text-3xl [&_h2]:sm:!text-4xl [&_h2]:lg:!text-5xl [&_p]:!text-lg [&_p]:!leading-snug [&_p]:!tracking-wide"
            />
            <Button href="#work">See my work</Button>
          </div>

          {/* Lane 2 */}
          <div className="flex-1 p-8 sm:p-10 lg:p-16">
            <Cavalier
              heading="I write, <br/> sometimes"
              text="About design, <br/> frontend dev, <br/> learning and life."
              className="mb-10 [&_h2]:!text-3xl [&_h2]:sm:!text-4xl [&_h2]:lg:!text-5xl [&_p]:!text-lg [&_p]:!leading-snug [&_p]:!tracking-wide"
            />
            <Button href="#articles">Read my Articles</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
