import Hero from "@/components/sections/hero";
import AboutProject from "@/components/sections/about-project";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutProject />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
