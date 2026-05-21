import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import AboutProject from "@/components/sections/about-project";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <AboutProject />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
