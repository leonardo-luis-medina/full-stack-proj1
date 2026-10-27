"use client";

import { useState } from "react";

const experience = [
  {
    title: "Associate Software Engineer",
    meta: "Accenture • Jun 2024 - Nov 2024",
    text: "Completed cloud, software engineering, and ServiceNow bootcamps while working with Java, Python, and Agile workflows.",
  },
  {
    title: "AWS Re/Start Cloud Training",
    meta: "Amazon Web Services • Jul 2025 - Nov 2025",
    text: "Hands-on training with EC2, S3, IAM, VPC, CloudWatch, Linux, networking, and Python fundamentals.",
  },
  {
    title: "IT Support Intern",
    meta: "PNP Muntinlupa • Jan 2023 - Aug 2023",
    text: "Provided hardware and technical support, maintained organizational databases, and supervised over 200 interns.",
  },
];

const certifications = [
  "Civil Service Eligibility (2024)",
  "Python Developer - SoloLearn",
  "SQL - SoloLearn",
  "Java - SoloLearn",
  "Web Developer - SoloLearn",
];

export default function About() {
  const [tab, setTab] = useState<"experience" | "education">("experience");

  return (
    <section className="h-full overflow-y-auto overscroll-contain px-4">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center py-6">
        <div className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Who I Am
          </p>
          <h2 className="mb-2 text-3xl font-black text-white md:text-4xl">
            About Me
          </h2>
          <p className="mx-auto max-w-xl text-xs text-gray-500 md:text-sm">
            IT graduate from Muntinlupa, passionate about full-stack
            development, cloud technologies, and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Profile card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20 lg:col-span-2">
            <div className="flex flex-col items-center text-center">
              <img
                src="/avatar.jpg"
                alt="Leonardo"
                className="mb-4 h-24 w-24 rounded-2xl border border-white/10 object-cover"
              />
              <h3 className="mb-2 text-xl font-black text-white">
                Leonardo Luis C. Medina
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                IT graduate with experience in cloud computing, software
                engineering, and IT support. Adaptable, eager to learn, and
                passionate about building modern web applications and scalable
                solutions.
              </p>

              <div className="mb-5 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
                <span>Muntinlupa City, Philippines</span>
                <span>•</span>
                <span>0966-048-7394</span>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://github.com/leonardo-luis-medina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-gray-200"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-5 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  LinkedIn
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="rounded-full border border-white/20 px-5 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Tabs panel */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex w-fit gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {[
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education & Certifications" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as "experience" | "education")}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    tab === t.id
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "experience" && (
              <div className="space-y-3">
                {experience.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:border-indigo-400/40"
                  >
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">{item.meta}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "education" && (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    Education
                  </h3>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:border-indigo-400/40">
                    <h4 className="text-sm font-bold text-white">
                      Bachelor of Science in Information Technology
                    </h4>
                    <p className="mt-2 text-xs text-gray-500">
                      Pamantasan ng Lungsod ng Muntinlupa • 2019 - 2024
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <span
                        key={cert}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}