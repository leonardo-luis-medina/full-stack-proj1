"use client";

import { useState } from "react";

const techStack = {
  Frontend: ["React", "Next.js 16", "TypeScript", "Tailwind CSS", "TanStack Query"],
  Backend: ["Node.js", "tRPC", "REST APIs", "Auth.js v5", "Zod"],
  Database: ["PostgreSQL", "Prisma ORM", "Neon (Serverless)", "Upstash Redis"],
  DevOps: ["Vercel", "GitHub Actions", "Sentry", "UptimeRobot", "Cloudflare R2"],
  "Real-time & Email": ["Pusher (WebSockets)", "Resend", "React Email"],
};

const features = [
  {
    title: "Google & GitHub OAuth Login",
    description: "Users can log in with their Google or GitHub account. Sessions are stored securely in the database.",
  },
  {
    title: "Live Comment Board",
    description: "Visitors can leave comments after logging in. Comments are paginated and stored in PostgreSQL.",
  },
  {
    title: "Real-time Comments",
    description: "New comments appear instantly for all visitors without refreshing, powered by Pusher WebSockets.",
  },
  {
    title: "Email Notifications",
    description: "You receive an email notification every time someone leaves a comment, sent via Resend.",
  },
  {
    title: "Project Showcase",
    description: "Projects are stored in the database and displayed as cards with tags, live URL, and GitHub link.",
  },
  {
    title: "Project Search",
    description: "Visitors can search projects by title, description, or tags instantly as they type.",
  },
  {
    title: "Image Upload",
    description: "Project screenshots are uploaded and stored in Cloudflare R2 and served via a secure API route.",
  },
  {
    title: "Admin Dashboard",
    description: "A hidden /admin page lets you add and delete projects. Only accessible by the OWNER role.",
  },
  {
    title: "CV Download",
    description: "Visitors can download your CV directly from the About section with one click.",
  },
  {
    title: "CI/CD Pipeline",
    description: "Every git push triggers GitHub Actions which builds and type-checks the app, then auto-deploys to Vercel.",
  },
  {
    title: "Error Tracking",
    description: "Sentry captures and reports any runtime errors in production with full stack traces.",
  },
  {
    title: "Uptime Monitoring",
    description: "UptimeRobot checks your site every 5 minutes and emails you if it goes down.",
  },
];

const mySkills = {
  "Programming Languages": ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C#", "SQL"],
  "Frontend Development": ["Angular", "React", "HTML", "CSS", "JavaScript", "TypeScript"],
  "Backend Development": ["ASP.NET Core Web API", "Node.js", "REST APIs", "PHP"],
  "Databases": ["SQL", "Microsoft SQL Server", "SSMS", "Supabase"],
  "Cloud & DevOps": ["AWS (EC2, VPC, IAM, S3, CloudWatch)", "Microsoft Azure", "Azure Pipelines", "CI/CD"],
  "Tools & Technologies": ["Git", "GitHub", "Visual Studio", "VS Code", "Excel", "Linux", "API Development"],
};

export default function Skills() {
  const [tab, setTab] = useState<"stack" | "features" | "skills">("stack");

  return (
    <section id="skills" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Skills & Tech
        </h2>
        <p className="text-gray-500 text-center mb-10">
          What I know and what I built
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setTab("stack")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "stack"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            Tech Stack Used
          </button>
          <button
            onClick={() => setTab("features")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "features"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            Working Features
          </button>
          <button
            onClick={() => setTab("skills")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              tab === "skills"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            My Skills
          </button>
        </div>

        {/* Tech Stack Tab */}
        {tab === "stack" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Features Tab */}
        {tab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4">
                <span className="text-2xl">?</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Skills Tab */}
        {tab === "skills" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mySkills).map(([category, items]) => (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
