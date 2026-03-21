import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Showcase from "@/components/sections/Showcase";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Experience />
      <Showcase />
      <Contact />
      <Footer />
    </main>
  );
}
