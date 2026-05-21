const skillGroups = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C#", "SQL"],
    color: "from-violet-500/10 to-transparent",
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js 16", "Angular", "HTML", "CSS", "Tailwind CSS", "TanStack Query"],
    color: "from-blue-500/10 to-transparent",
  },
  {
    category: "Backend Development",
    skills: ["ASP.NET Core Web API", "Node.js", "tRPC", "REST APIs", "Auth.js v5", "Zod", "PHP"],
    color: "from-green-500/10 to-transparent",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Microsoft SQL Server", "SSMS", "Supabase", "Prisma ORM", "Neon", "Redis"],
    color: "from-yellow-500/10 to-transparent",
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (EC2, VPC, IAM, S3, CloudWatch)", "Microsoft Azure", "Azure Pipelines", "CI/CD", "Vercel", "Railway", "GitHub Actions", "Cloudflare R2"],
    color: "from-orange-500/10 to-transparent",
  },
  {
    category: "Real-time & Notifications",
    skills: ["Pusher WebSockets", "Resend", "Sentry", "UptimeRobot"],
    color: "from-pink-500/10 to-transparent",
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "Visual Studio", "VS Code", "Excel", "Linux", "API Development"],
    color: "from-gray-500/10 to-transparent",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          What I know
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
          Skills & Technologies
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm max-w-xl mx-auto">
          A complete overview of my technical skills across the full stack
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`bg-gradient-to-br ${group.color} border border-white/10 rounded-2xl p-6 hover:border-white/30 hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded-full hover:bg-white/25 hover:text-white transition cursor-default"
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
