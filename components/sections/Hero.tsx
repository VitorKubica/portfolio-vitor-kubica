import Cavalier from "../ui/Cavalier";
import Visage from "../ui/Visage";
import LogomarkOutline from "../svg/LogomarkOutline";

export default function Hero() {
  return (
    <section
      data-section="une"
      aria-hidden="false"
      className="home-section flex-col bg-[linear-gradient(90deg,_#044d35_70%,_#f0eee6_30%)] sm:bg-[linear-gradient(90deg,_#044d35_67%,_#f0eee6_33%)]"
    >
      {/* Primary: heading + avatar */}
      <div className="flex flex-1 w-full items-center justify-between px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 lg:pt-40">
        <LogomarkOutline
          id="sauce-drip-outline"
          className="hidden 2xl:block absolute left-0 top-28 -ml-10 h-[600px]"
        />

        <Cavalier
          theme="light"
          text="I like to craft solid and scalable frontend products with great user experiences."
          headingSlot={
            <h1
              className="m-0 font-sans text-[48px] sm:text-[64px] lg:text-[96px] font-extrabold leading-[1.05] text-bg tracking-tight"
              aria-label="Frontend Developer"
            >
              <span aria-hidden="true">
                Frontend
                <br />
                Developer
                <span className="text-bg/60">.</span>
              </span>
            </h1>
          }
        />

        <div className="shrink-0 ml-6 sm:ml-8 xl:mr-16">
          <Visage />
        </div>
      </div>

      {/* Bottom highlights */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pb-8 lg:pb-14 mt-auto">
        <ul className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-bg/70 text-sm sm:text-base leading-relaxed max-w-2xl list-none p-0 m-0">
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

    </section>
  );
}
