import Cavalier from "../ui/Cavalier";
import Visage from "../ui/Visage";
import LogomarkOutline from "../svg/LogomarkOutline";

export default function Hero() {
  return (
    <section
      data-section="une"
      aria-hidden="false"
      className="home-section flex-col bg-electric-blue lg:bg-[linear-gradient(90deg,_#4831d4_67%,_#ccf381_33%)] min-h-dvh"
    >
      {/* Primary: heading + avatar */}
      <div className="flex flex-1 w-full items-center justify-between px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 lg:pt-40">
        {/* Decorative outline (2xl only) */}
        <LogomarkOutline
          id="sauce-drip-outline"
          className="hidden 2xl:block absolute left-0 top-28 -ml-10 h-[600px]"
        />

        <Cavalier
          theme="lime"
          text="I like to craft solid and scalable frontend products with great user experiences."
          headingSlot={
            <h1
              className="m-0 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white tracking-tight"
              aria-label="Frontend Developer"
            >
              <span aria-hidden="true">
                Frontend
                <br />
                Developer
                <span className="text-[#eeffff]">.</span>
              </span>
            </h1>
          }
        />

        {/* Avatar — visible lg+ */}
        <div className="hidden lg:block shrink-0 ml-8 xl:mr-16">
          <Visage />
        </div>
      </div>

      {/* Bottom highlights */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pb-8 lg:pb-14 mt-auto">
        <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-lime text-sm sm:text-base leading-relaxed max-w-2xl list-none p-0 m-0">
          <li className="sm:w-1/2">
            Highly skilled at progressive enhancement, design systems &amp; UI
            Engineering.
          </li>
          <li className="sm:w-1/2">
            Over the years building products for clients across several
            countries.
          </li>
        </ul>
      </div>

      {/* Mobile avatar */}
      <div className="lg:hidden w-full flex items-center justify-center bg-lime py-16">
        <Visage />
      </div>
    </section>
  );
}
