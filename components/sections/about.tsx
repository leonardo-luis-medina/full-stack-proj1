export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-3">
            Who I Am
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            About Me
          </h2>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            IT graduate from Muntinlupa, passionate about full-stack
            development, cloud technologies, and continuous learning.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Image */}
            <img
              src="/avatar.jpg"
              alt="Leonardo"
              className="w-24 h-24 rounded-2xl object-cover border border-white/10 mx-auto md:mx-0"
            />

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-2">
                Leonardo Luis C. Medina
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-5">
                IT graduate with experience in cloud computing, software
                engineering, and IT support. Adaptable, eager to learn,
                and passionate about building modern web applications
                and scalable solutions.
              </p>

              {/* Personal Info */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-xs text-gray-500 mb-5">
                <span>Muntinlupa City, Philippines</span>
                <span>•</span>
                <span>0966-048-7394</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com/leonardo-luis-medina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white text-black text-sm rounded-full font-medium hover:bg-gray-200 transition"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border border-white/20 text-gray-300 text-sm rounded-full hover:bg-white/10 transition"
                >
                  LinkedIn
                </a>

                <a
                  href="/cv.pdf"
                  download
                  className="px-5 py-2 border border-white/20 text-gray-300 text-sm rounded-full hover:bg-white/10 transition"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Experience */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6">
              Experience
            </h3>

            <div className="space-y-4">

              {/* Experience Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
                <h4 className="text-white font-bold text-sm">
                  Associate Software Engineer
                </h4>

                <p className="text-gray-500 text-xs mt-1">
                  Accenture • Jun 2024 - Nov 2024
                </p>

                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Completed cloud, software engineering, and ServiceNow
                  bootcamps while working with Java, Python, and Agile workflows.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
                <h4 className="text-white font-bold text-sm">
                  AWS Re/Start Cloud Training
                </h4>

                <p className="text-gray-500 text-xs mt-1">
                  Amazon Web Services • Jul 2025 - Nov 2025
                </p>

                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Hands-on training with EC2, S3, IAM, VPC, CloudWatch,
                  Linux, networking, and Python fundamentals.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
                <h4 className="text-white font-bold text-sm">
                  IT Support Intern
                </h4>

                <p className="text-gray-500 text-xs mt-1">
                  PNP Muntinlupa • Jan 2023 - Aug 2023
                </p>

                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Provided hardware and technical support, maintained
                  organizational databases, and supervised over 200 interns.
                </p>
              </div>

            </div>
          </div>

          {/* Education + Certifications */}
          <div className="space-y-8">

            {/* Education */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6">
                Education
              </h3>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
                <h4 className="text-white font-bold text-sm">
                  Bachelor of Science in Information Technology
                </h4>

                <p className="text-gray-500 text-xs mt-2">
                  Pamantasan ng Lungsod ng Muntinlupa • 2019 - 2024
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6">
                Certifications
              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "Civil Service Eligibility (2024)",
                  "Python Developer - SoloLearn",
                  "SQL - SoloLearn",
                  "Java - SoloLearn",
                  "Web Developer - SoloLearn",
                ].map((cert, index) => (
                  <span
                    key={index}
                    className="text-xs px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition"
                  >
                    {cert}
                  </span>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}