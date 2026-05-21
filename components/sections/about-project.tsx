"use client";

import { useState } from "react";

const techStack = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "tRPC",
      "Auth.js v5",
      "Zod",
      "Prisma ORM",
    ],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Neon (Serverless)"],
  },
  {
    category: "DevOps",
    items: [
      "Vercel",
      "GitHub Actions",
      "Sentry",
      "UptimeRobot",
      "Cloudflare R2",
    ],
  },
  {
    category: "Real-time & Email",
    items: ["Pusher WebSockets", "Resend"],
  },
];

const features = [
  {
    title: "Google & GitHub OAuth Login",
    description:
      "Users can securely sign in using Google or GitHub authentication.",
  },
  {
    title: "Live Comment Board",
    description:
      "Visitors can leave comments that are stored and paginated in the database.",
  },
  {
    title: "Real-time Comments",
    description:
      "New comments instantly appear for everyone using WebSockets.",
  },
  {
    title: "Email Notifications",
    description:
      "Every new comment sends an email notification automatically.",
  },
  {
    title: "Project Showcase",
    description:
      "Projects are dynamically stored and displayed with tags and links.",
  },
  {
    title: "Project Search",
    description:
      "Instant search functionality for projects and technologies.",
  },
  {
    title: "Image Upload",
    description:
      "Project screenshots are uploaded and served securely via Cloudflare R2.",
  },
  {
    title: "Admin Dashboard",
    description:
      "Protected admin panel for managing projects and content.",
  },
  {
    title: "CV Download",
    description:
      "Visitors can directly download the resume from the website.",
  },
  {
    title: "CI/CD Pipeline",
    description:
      "Automatic deployment pipeline using GitHub Actions and Vercel.",
  },
  {
    title: "Error Tracking",
    description:
      "Production errors are monitored using Sentry.",
  },
  {
    title: "Uptime Monitoring",
    description:
      "The site is monitored every few minutes for uptime and availability.",
  },
];

export default function AboutProject() {
  // CHANGED DEFAULT TAB HERE
  const [tab, setTab] = useState("features");

  return (
    <section
      id="about-project"
      className="py-24 px-4 bg-[#0d0d0d]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold mb-3">
            Built From Scratch
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            About This Project
          </h2>

          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            This portfolio is a full-stack application with authentication,
            real-time systems, cloud storage, monitoring, and automated deployment.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          <button
            onClick={() => setTab("features")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              tab === "features"
                ? "bg-white text-black"
                : "border border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Working Features
          </button>

          <button
            onClick={() => setTab("stack")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              tab === "stack"
                ? "bg-white text-black"
                : "border border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Tech Stack Used
          </button>
        </div>

        {/* FEATURES FIRST */}
        {tab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-white font-bold text-sm mb-3 group-hover:text-gray-100">
                  {feature.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TECH STACK */}
        {tab === "stack" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((group) => (
              <div
                key={group.category}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold mb-5">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition"
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