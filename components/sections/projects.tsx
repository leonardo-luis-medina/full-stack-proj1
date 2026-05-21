"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Projects() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = trpc.projects.getAll.useQuery();

  const filtered = data?.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="projects" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          What I have built
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
          Projects
        </h2>
        <p className="text-gray-500 text-center mb-10 text-sm max-w-xl mx-auto">
          A showcase of real projects I have built from scratch
        </p>
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition"
          />
        </div>
        {isLoading && <p className="text-center text-gray-600 text-sm">Loading...</p>}
        {!isLoading && filtered?.length === 0 && (
          <p className="text-center text-gray-600 text-sm">No projects found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered?.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:opacity-90 transition" />
              ) : (
                <div className="w-full h-48 bg-white/5 flex items-center justify-center text-4xl text-gray-700">
                  {}
                </div>
              )}
              <div className="p-6">
                <h3 className="font-black text-white text-base mb-2 group-hover:text-gray-100">{project.title}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/10 text-gray-400 rounded-full hover:bg-white/20 hover:text-white transition">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
                      Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-2 border border-white/20 text-gray-300 rounded-full hover:bg-white/10 transition">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
