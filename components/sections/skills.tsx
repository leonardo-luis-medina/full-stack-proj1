const skillGroups = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C#", "SQL"],
  },
  {
    category: "Frontend Development",
    skills: ["React", "Next.js", "Angular", "HTML", "CSS", "Tailwind CSS", "TypeScript"],
  },
  {
    category: "Backend Development",
    skills: ["ASP.NET Core Web API", "Node.js", "tRPC", "REST APIs", "PHP"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Microsoft SQL Server", "SSMS", "Supabase", "Prisma ORM", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (EC2, VPC, IAM, S3, CloudWatch, AWS CLI)", "Microsoft Azure", "Azure Pipelines", "CI/CD", "Vercel", "Railway", "GitHub Actions"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "Visual Studio", "VS Code", "Excel", "Linux", "API Development", "Sentry", "Pusher", "Resend"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
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
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 bg-white/10 text-gray-300 rounded-full hover:bg-white/20 hover:text-white transition"
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
