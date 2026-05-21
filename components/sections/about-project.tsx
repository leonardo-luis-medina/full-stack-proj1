"use client";

import { useState } from "react";

const techStack = [
  { category: "Frontend", items: ["React", "Next.js 16", "TypeScript", "Tailwind CSS", "TanStack Query"] },
  { category: "Backend", items: ["Node.js", "tRPC", "Auth.js v5", "Zod", "Prisma ORM"] },
  { category: "Database", items: ["PostgreSQL", "Neon (Serverless)"] },
  { category: "DevOps", items: ["Vercel", "GitHub Actions", "Sentry", "UptimeRobot", "Cloudflare R2"] },
  { category: "Real-time & Email", items: ["Pusher WebSockets", "Resend"] },
];

const features = [
  { title: "Google & GitHub OAuth Login", description: "Users log in with Google or GitHub. Sessions stored securely in PostgreSQL." },
  { title: "Live Comment Board", description: "Visitors leave comments after logging in. Paginated and stored in the database." },
  { title: "Real-time Comments", description: "New comments appear instantly for all visitors via Pusher WebSockets." },
  { title: "Email Notifications", description: "You get an email every time someone comments, sent via Resend." },
  { title: "Project Showcase", description: "Projects stored in the database, displayed as cards with tags and links." },
  { title: "Project Search", description: "Search projects by title, description, or tags instantly as you type." },
  { title: "Image Upload", description: "Project screenshots stored in Cloudflare R2, served via secure API route." },
  { title: "Admin Dashboard", description: "Hidden /admin page to add and delete projects. Owner role only." },
  { title: "CV Download", description: "Visitors can download your CV directly from the About section." },
  { title: "CI/CD Pipeline", description: "Every git push triggers GitHub Actions, then auto-deploys to Vercel." },
  { title: "Error Tracking", description: "Sentry captures runtime errors in production with full stack traces." },
  { title: "Uptime Monitoring", description: "UptimeRobot checks the site every 5 minutes and alerts if it goes down." },
];

export default function AboutProject() {
  const [tab, setTab] = useState("stack");

  return (
    <section id="about-project" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          Built from scratch
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
          About This Project
        </h2>
        <p className="text-gray-500 text-center mb-10 text-sm max-w-xl mx-auto">
          This portfolio is a full-stack application. Here is what powers it and what it can do.
        </p>

        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setTab("stack")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${tab === "stack" ? "bg-white text-black" : "border border-white/20 text-gray-400 hover:bg-white/10"}`}
          >
            Tech Stack Used
          </button>
          <button
            onClick={() => setTab("features")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${tab === "features" ? "bg-white text-black" : "border border-white/20 text-gray-400 hover:bg-white/10"}`}
          >
            Working Features
          </button>
        </div>

        {tab === "stack" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((group) => (
              <div key={group.category} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded-full hover:bg-white/20 hover:text-white transition">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <h3 className="font-bold text-white mb-2 text-sm group-hover:text-gray-100">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
