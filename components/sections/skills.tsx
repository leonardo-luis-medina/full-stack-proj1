const techStack = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "tRPC", "REST APIs", "Auth.js"],
  Database: ["PostgreSQL", "Prisma", "Redis", "Neon"],
  DevOps: ["Git", "GitHub Actions", "Vercel", "Railway"],
};

const mySkills = {
  "Programming Languages": [
    "Python", "Java", "JavaScript", "TypeScript", "PHP", "C#", "SQL",
  ],
  "Frontend Development": [
    "Angular", "React", "HTML", "CSS", "JavaScript", "TypeScript",
  ],
  "Backend Development": [
    "ASP.NET Core Web API", "Node.js", "REST APIs", "PHP",
  ],
  "Databases": [
    "SQL", "Microsoft SQL Server", "SSMS", "Supabase",
  ],
  "Cloud & DevOps": [
    "AWS (EC2, VPC, IAM, S3, CloudWatch)", "Microsoft Azure",
    "Azure Pipelines", "CI/CD",
  ],
  "Tools & Technologies": [
    "Git", "GitHub", "Visual Studio", "VS Code", "Excel", "Linux", "API Development",
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Tech Stack Used in This Project */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          This Project's Tech Stack
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Technologies powering this portfolio
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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

        {/* My Skills */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          My Skills
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Everything I know and work with
        </p>
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

      </div>
    </section>
  );
}