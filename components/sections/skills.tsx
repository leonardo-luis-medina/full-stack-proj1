const skillGroups = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C#", "SQL"],
    color: "from-violet-500/15 to-transparent",
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js 16", "Angular", "HTML", "CSS", "Tailwind CSS", "TanStack Query"],
    color: "from-blue-500/15 to-transparent",
  },
  {
    category: "Backend Development",
    skills: ["ASP.NET Core Web API", "Node.js", "tRPC", "REST APIs", "Auth.js v5", "Zod", "PHP"],
    color: "from-green-500/15 to-transparent",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Microsoft SQL Server", "SSMS", "Supabase", "Prisma ORM", "Neon", "Redis"],
    color: "from-yellow-500/15 to-transparent",
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS (EC2, VPC, IAM, S3, CloudWatch)",
      "Microsoft Azure",
      "Azure Pipelines",
      "CI/CD",
      "Vercel",
      "Railway",
      "GitHub Actions",
      "Cloudflare R2",
    ],
    color: "from-orange-500/15 to-transparent",
  },
  {
    category: "Real-time & Notifications",
    skills: ["Pusher WebSockets", "Resend", "Sentry", "UptimeRobot"],
    color: "from-pink-500/15 to-transparent",
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "Visual Studio", "VS Code", "Excel", "Linux", "API Development"],
    color: "from-gray-400/15 to-transparent",
  },
];

export default function Skills() {
  return (
    <section className="h-full overflow-y-auto overscroll-contain px-4">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-6">
        <div className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
            What I know
          </p>
          <h2 className="mb-2 text-3xl font-black text-white md:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="mx-auto max-w-xl text-xs text-gray-500 md:text-sm">
            A complete overview of my technical skills across the full stack
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`cursor-default rounded-xl border border-white/10 bg-gradient-to-br ${group.color} p-4 backdrop-blur transition-all duration-300 hover:border-white/30`}
            >
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-gray-300 transition hover:bg-white/25 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}