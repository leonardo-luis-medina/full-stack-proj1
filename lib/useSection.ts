"use client";

import { useCallback, useEffect, useState } from "react";

export const SECTIONS = [
  "hero",
  "about-project",
  "projects",
  "skills",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

function readHash(): SectionId {
  const h = window.location.hash.replace("#", "");
  return (SECTIONS as readonly string[]).includes(h)
    ? (h as SectionId)
    : "hero";
}

export function useSection() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    setActive(readHash());
    const onChange = () => setActive(readHash());
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  const go = useCallback((id: SectionId) => {
    if (window.location.hash.replace("#", "") === id) return;
    window.location.hash = id;
  }, []);

  return { active, go };
}