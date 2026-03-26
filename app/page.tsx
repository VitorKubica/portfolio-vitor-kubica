import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const About = dynamic(() => import("@/components/sections/About"));
const Education = dynamic(() => import("@/components/sections/Education"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <main data-page="home">
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
