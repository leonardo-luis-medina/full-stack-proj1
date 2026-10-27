"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useSection, type SectionId } from "@/lib/useSection";

const links: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about-project", label: "This Project" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, go } = useSection();

  const navigate = (id: SectionId) => {
    go(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <button
            onClick={() => navigate("hero")}
            className="text-lg font-black tracking-tight text-white"
          >
            LM<span className="text-indigo-400">.</span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => navigate(l.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  active === l.id
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 md:flex">
            {session ? (
              <>
                <span className="text-xs text-gray-400">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-gray-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-white/10 bg-black/95 px-4 pb-4 pt-3 md:hidden">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => navigate(l.id)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  active === l.id
                    ? "bg-white/10 text-white"
                    : "text-gray-400"
                }`}
              >
                {l.label}
              </button>
            ))}

            <div className="mt-2 border-t border-white/10 pt-3">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="px-3 text-left text-sm text-gray-400"
                >
                  Logout ({session.user?.name})
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="px-3 text-left text-sm font-semibold text-white"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Admin-only Add Project button */}
      {session?.user?.role === "OWNER" && (
        <a
          href="/admin"
          className="fixed bottom-14 right-4 z-50 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Project
        </a>
      )}
    </>
  );
}