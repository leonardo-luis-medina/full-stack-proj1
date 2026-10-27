"use client";

import { useEffect, useState } from "react";
import { useSection } from "@/lib/useSection";

const roles = [
  "Full-Stack Developer",
  "Cloud Enthusiast",
  "Problem Solver",
  "IT Graduate",
];

export default function Hero() {
  const { go } = useSection();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="h-full overflow-y-auto overscroll-contain px-4">
      <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center py-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-300 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to opportunities
        </div>

        <h1 className="mb-4 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-8xl">
          Leonardo
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Medina
          </span>
        </h1>

        <div className="mb-6 flex h-8 items-center justify-center">
          <span className="font-mono text-base text-gray-300 md:text-xl">
            {displayed}
            <span className="animate-pulse text-indigo-400">|</span>
          </span>
        </div>

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-gray-500">
          IT graduate from Muntinlupa with hands-on experience in cloud,
          full-stack development, and real-world problem solving.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => go("projects")}
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            See My Work
          </button>
          <button
            onClick={() => go("contact")}
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-gray-200 backdrop-blur transition hover:bg-white/10"
          >
            Get In Touch
          </button>
          <a
            href="/cv.pdf"
            download
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-gray-200 backdrop-blur transition hover:bg-white/10"
          >
            Download CV
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
          <a
            href="https://github.com/leonardo-luis-medina"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:leonardo.luis.medina99@gmail.com"
            className="transition hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}