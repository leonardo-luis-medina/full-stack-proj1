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
    <section id="projects" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Projects</h2>
        <p className="text-gray-500 text-center mb-8">Things I have built</p>
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        {isLoading && (
          <p className="text-center text-gray-400">Loading projects...</p>
        )}
        {!isLoading && filtered?.length === 0 && (
          <p className="text-center text-gray-400">No projects found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered?.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-indigo-100 flex items-center justify-center text-4xl">
                  ???
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition">
                      Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition">
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
