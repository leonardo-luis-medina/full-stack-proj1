"use client";

import Hero from "@/components/sections/hero";
import AboutProject from "@/components/sections/about-project";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSection } from "@/lib/useSection";


export default function Home() {
  const { active } = useSection();

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] text-white">
      <style>{`
        @keyframes sectionIn {
          from { opacity: 0; transform: translateY(10px) scale(.99); }
          to   { opacity: 1; transform: none; }
        }
        .section-enter { animation: sectionIn .35s ease-out both; }
      `}</style>

      {/* Background: grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
      </div>

      <Navbar />

      <div className="absolute inset-x-0 top-14 bottom-10">
        <div key={active} className="section-enter h-full">
          {active === "hero" && <Hero />}
          {active === "about-project" && <AboutProject />}
          {active === "projects" && <Projects />}
          {active === "skills" && <Skills />}
          {active === "about" && <About />}
          {active === "contact" && <Contact />}
        </div>
      </div>

      <Footer />
    </main>
  );
}