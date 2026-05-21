"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="font-black text-lg text-white tracking-tight">LM.</a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#about-project" className="hover:text-white transition">This Project</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{session.user?.name}</span>
              <button onClick={() => signOut()} className="text-sm px-4 py-2 rounded-full border border-white/20 text-gray-300 hover:bg-white/10 transition">Logout</button>
            </div>
          ) : (
            <button onClick={() => signIn()} className="text-sm px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition">Login</button>
          )}
        </div>
        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "x" : "="}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black px-4 pb-4 flex flex-col gap-4 text-sm font-medium text-gray-400 border-t border-white/10">
          <a href="#about-project" onClick={() => setMenuOpen(false)} className="hover:text-white transition">This Project</a>
          <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Projects</a>
          <a href="#skills" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Skills</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-white transition">About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition">Contact</a>
          {session ? (
            <button onClick={() => signOut()} className="text-left text-gray-400">Logout</button>
          ) : (
            <button onClick={() => signIn()} className="text-left text-white">Login</button>
          )}
        </div>
      )}
    </nav>
  );
}
