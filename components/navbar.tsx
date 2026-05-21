"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="font-bold text-xl text-gray-900">Leonardo</a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#projects" className="hover:text-gray-900 transition">Projects</a>
          <a href="#about-project" className="hover:text-gray-900 transition">This Project</a>
          <a href="#skills" className="hover:text-gray-900 transition">Skills</a>
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{session.user?.name}</span>
              <button onClick={() => signOut()} className="text-sm px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">Logout</button>
            </div>
          ) : (
            <button onClick={() => signIn()} className="text-sm px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition">Login</button>
          )}
        </div>
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "?" : "?"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-gray-600">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about-project" onClick={() => setMenuOpen(false)}>This Project</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          {session ? (
            <button onClick={() => signOut()} className="text-left">Logout</button>
          ) : (
            <button onClick={() => signIn()} className="text-left">Login</button>
          )}
        </div>
      )}
    </nav>
  );
}
