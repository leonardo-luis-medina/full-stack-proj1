"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState(false);
  const { data, isLoading } = trpc.projects.getAll.useQuery();

  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...(data ?? [])]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
  }, [data, search]);

  // Go back to the first card when searching
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [search]);

  // Mouse drag (touch devices already swipe natively)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 5) {
      drag.current.moved = true;
      if (!dragging) setDragging(true);
    }
    el.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const scrollByCard = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="h-full overflow-y-auto overscroll-contain">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-6">
        {/* Header */}
        <div className="px-4 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
            What I have built
          </p>
          <h2 className="mb-2 text-3xl font-black text-white md:text-4xl">
            Projects
          </h2>
          <p className="mx-auto mb-5 max-w-xl text-xs text-gray-500 md:text-sm">
            A showcase of real projects I have built from scratch
          </p>
        </div>

        {/* Search + arrows */}
        <div className="mx-auto mb-5 flex w-full max-w-xl items-center gap-3 px-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white placeholder-gray-600 backdrop-blur transition focus:border-indigo-400/50 focus:outline-none"
          />
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10"
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-sm text-gray-600">Loading...</p>
        )}
        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-sm text-gray-600">
            No projects found.
          </p>
        )}

        {/* One-line horizontal track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className={`flex select-none items-stretch gap-5 overflow-x-auto px-4 pb-4 md:px-6 ${
            dragging
              ? "cursor-grabbing"
              : "cursor-grab snap-x snap-proximity"
          } [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 hover:[&::-webkit-scrollbar-thumb]:bg-white/40`}
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.08] sm:w-80"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  draggable={false}
                  className="h-36 w-full object-cover transition group-hover:opacity-90"
                />
              ) : (
                <div className="flex h-36 w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20 text-4xl font-black text-white/30">
                  {project.title.slice(0, 1).toUpperCase()}
                </div>
              )}

              <div className="flex flex-col p-5">
                <h3 className="mb-2 text-base font-black text-white">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-gray-500">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-gray-400 transition hover:bg-white/20 hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
                    >
                      Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 1 && (
          <p className="mt-1 text-center text-[10px] uppercase tracking-widest text-gray-600">
            Drag or swipe to browse
          </p>
        )}
      </div>
    </section>
  );
}