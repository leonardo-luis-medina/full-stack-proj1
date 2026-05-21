const experience = [
  {
    role: "Associate Software Engineer",
    company: "Accenture",
    period: "June 2024 - November 2024",
    bullets: [
      "Participated in three internal bootcamps: Cloud Foundations, Software Engineering, and ServiceNow.",
      "Gained knowledge in Cloud fundamentals, basic programming (Java, Python) and IT workflows.",
      "Developed foundational understanding of Agile workflows, GenAI, COBOL, and software testing principles.",
    ],
  },
  {
    role: "AWS Re/Start - Cloud Training",
    company: "Amazon Web Services",
    period: "July 2025 - November 2025",
    bullets: [
      "Full-time cloud training program covering AWS (EC2, S3, VPC, IAM, CloudWatch).",
      "Gained hands-on experience in Linux, networking, Python, and cloud troubleshooting.",
    ],
  },
  {
    role: "IT Support Intern",
    company: "Philippine National Police (Muntinlupa)",
    period: "January 2023 - August 2023",
    bullets: [
      "Provided hardware and technical support to internal teams.",
      "Supervised over 200 interns and ensured smooth coordination.",
      "Improved and maintained the organizational database.",
    ],
  },
];

const certifications = [
  "Professional Civil Service Eligibility (Passed: August 2024)",
  "Python Developer Certificate - SoloLearn (2025)",
  "Introduction to SQL Certificate - SoloLearn (2025)",
  "Introduction to Java Certificate - SoloLearn (2025)",
  "Web Developer Certificate - SoloLearn (2025)",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 text-center mb-3">
          Who I am
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">
          About Me
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm max-w-xl mx-auto">
          IT graduate from Muntinlupa with a passion for building things that work
        </p>

        <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="flex-shrink-0">
            <img
              src="/avatar.jpg"
              alt="Leonardo"
              className="w-36 h-36 rounded-2xl object-cover border border-white/10"
            />
          </div>
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
            <p>
              Hi! I am <span className="text-white font-semibold">Leonardo Luis C. Medina</span>, an IT graduate from Pamantasan ng Lungsod ng Muntinlupa. I have experience across cloud, full-stack development, and real-world IT support.
            </p>
            <p>
              I completed training at Accenture and AWS Re/Start, and I built this portfolio from scratch using 30 different technologies. I am eager to learn, adaptable, and a team player.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-500">
              <span>Muntinlupa City, Philippines</span>
              <span>leonardo.luis.medina99@gmail.com</span>
              <span>0966-048-7394</span>
            </div>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/leonardo-luis-medina" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-black text-xs rounded-full font-medium hover:bg-gray-200 transition">
                GitHub
              </a>
              <a href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-white/20 text-gray-300 text-xs rounded-full hover:bg-white/10 transition">
                LinkedIn
              </a>
              <a href="/cv.pdf" download className="px-4 py-2 border border-white/20 text-gray-300 text-xs rounded-full hover:bg-white/10 transition">
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <h3 className="text-lg font-black text-white mb-8 uppercase tracking-widest text-sm">Work Experience</h3>
        <div className="space-y-8 mb-16">
          {experience.map((exp, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-white mt-1 flex-shrink-0" />
                {i < experience.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
              </div>
              <div className="pb-8">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="text-white font-bold text-sm">{exp.role}</h4>
                  <span className="text-gray-600 text-xs">at</span>
                  <span className="text-gray-400 text-xs">{exp.company}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{exp.period}</p>
                <ul className="space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-gray-500 flex gap-2">
                      <span className="text-gray-600 flex-shrink-0">-</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest">Education</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <h4 className="text-white font-bold text-sm">Bachelor of Science in Information Technology</h4>
          <p className="text-gray-400 text-xs mt-1">Pamantasan ng Lungsod ng Muntinlupa | 2019 - 2024</p>
          <p className="text-gray-600 text-xs mt-1">NBP Reservation, Poblacion, Muntinlupa City</p>
        </div>

        {/* Certifications */}
        <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest">Certifications</h3>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <span key={cert} className="text-xs px-3 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-full hover:bg-white/10 hover:text-white transition">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
