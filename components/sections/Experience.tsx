import Cavalier from "../ui/Cavalier";
import WorkIllo from "../svg/WorkIllo";

const START_YEAR = 2020;

export default function Experience() {
  const years = new Date().getFullYear() - START_YEAR;

  return (
    <section
      data-section="trois"
      aria-hidden="true"
      className="home-section bg-primary py-20 lg:py-0"
    >
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <Cavalier
          theme="light"
          heading={`Over the <br/> past ${years} years,`}
          className="max-w-xl"
          textSlot={
            <div className="mt-6 space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-bg/80">
                I&apos;ve built products for companies and businesses around the
                globe ranging from marketing websites to complex solutions and
                enterprise apps with focus on fast, elegant and accessible user
                experiences.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-bg/80">
                Currently, I work as a Frontend Developer crafting thoughtful and
                inclusive experiences that adhere to web standards.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-bg/80">
                I&apos;m passionate about building scalable frontend
                architectures, component libraries, and design systems that
                empower teams to deliver consistent, high-quality products.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-bg/80">
                I&apos;m available for new opportunities. Want us to work
                together? You should{" "}
                <a
                  href="mailto:hello@vitorkubica.dev"
                  className="text-bg border-b border-dotted border-bg/60 hover:opacity-80 transition-opacity"
                >
                  contact me
                </a>
                .
              </p>
            </div>
          }
        />

        <figure className="work-illo flex shrink-0 w-full lg:w-auto max-w-sm lg:max-w-md mx-auto lg:mx-0">
          <WorkIllo className="w-full h-auto" />
          <figcaption className="sr-only">
            Illustration of a developer workspace.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
