"use client";

import { useState } from "react";

const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js 16", "TypeScript", "Tailwind CSS", "TanStack Query"],
  },
  {
    category: "Backend",
    items: ["Node.js", "tRPC", "Auth.js v5", "Zod", "Prisma ORM"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Neon (Serverless)"],
  },
  {
    category: "DevOps",
    items: ["Vercel", "GitHub Actions", "Sentry", "UptimeRobot", "Cloudflare R2"],
  },
  {
    category: "Real-time & Email",
    items: ["Pusher WebSockets", "Resend"],
  },
];

const features = [
  {
    title: "Google & GitHub OAuth Login",
    description: "Users can securely sign in using Google or GitHub authentication.",
  },
  {
    title: "Live Comment Board",
    description: "Visitors can leave comments that are stored and paginated in the database.",
  },
  {
    title: "Real-time Comments",
    description: "New comments instantly appear for everyone using WebSockets.",
  },
  {
    title: "Email Notifications",
    description: "Every new comment sends an email notification automatically.",
  },
  {
    title: "Project Showcase",
    description: "Projects are dynamically stored and displayed with tags and links.",
  },
  {
    title: "Project Search",
    description: "Instant search functionality for projects and technologies.",
  },
  {
    title: "Image Upload",
    description: "Project screenshots are uploaded and served securely via Cloudflare R2.",
  },
  {
    title: "Admin Dashboard",
    description: "Protected admin panel for managing projects and content.",
  },
  {
    title: "CV Download",
    description: "Visitors can directly download the resume from the website.",
  },
  {
    title: "CI/CD Pipeline",
    description: "Automatic deployment pipeline using GitHub Actions and Vercel.",
  },
  {
    title: "Error Tracking",
    description: "Production errors are monitored using Sentry.",
  },
  {
    title: "Uptime Monitoring",
    description: "The site is monitored every few minutes for uptime and availability.",
  },
];

export default function AboutProject() {
  const [tab, setTab] = useState<"features" | "stack">("features");

  return (
    <section className="h-full overflow-y-auto overscroll-contain px-4">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Built From Scratch
          </p>
          <h2 className="mb-3 text-3xl font-black text-white md:text-4xl">
            About This Project
          </h2>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-gray-500 md:text-sm">
            This portfolio is a full-stack application with authentication,
            real-time systems, cloud storage, monitoring, and automated
            deployment.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mb-6 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {[
            { id: "features", label: "Working Features" },
            { id: "stack", label: "Tech Stack Used" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as "features" | "stack")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-300 ${
                tab === t.id
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Features */}
        {tab === "features" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-all duration-300 hover:border-indigo-400/40 hover:bg-white/[0.07]"
              >
                <span className="mb-2 block font-mono text-[10px] text-indigo-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-1.5 text-xs font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-gray-500 transition group-hover:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        {tab === "stack" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-all duration-300 hover:border-indigo-400/40 hover:bg-white/[0.07]"
              >
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/20 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}