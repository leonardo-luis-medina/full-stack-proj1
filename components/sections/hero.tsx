"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  "Cloud Enthusiast",
  "Problem Solver",
  "IT Graduate",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white relative overflow-hidden">
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
      
      {/* Blur blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-6">
          Welcome to my portfolio
        </p>

        <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4 leading-none tracking-tight">
          Leonardo
          <br />
          <span className="text-gray-300">Medina</span>
        </h1>

        <div className="h-8 flex items-center justify-center mb-8">
          <span className="text-lg md:text-xl text-gray-500 font-mono">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <p className="text-gray-400 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          IT graduate from Muntinlupa with hands-on experience in cloud, full-stack development, and real-world problem solving.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#projects" className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-700 transition text-sm">
            See My Work
          </a>
          <a href="#contact" className="px-8 py-3 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition text-sm">
            Get In Touch
          </a>
          <a href="/cv.pdf" download className="px-8 py-3 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition text-sm">
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex gap-6 justify-center mt-10 text-sm text-gray-400">
          <a href="https://github.com/leonardo-luis-medina" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
            GitHub
          </a>
          <a href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
            LinkedIn
          </a>
          <a href="mailto:leonardo.luis.medina99@gmail.com" className="hover:text-gray-900 transition">
            Email
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
