export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">About Me</h2>
        <p className="text-gray-500 text-center mb-16">A little bit about who I am</p>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 rounded-full bg-indigo-100 flex items-center justify-center text-6xl flex-shrink-0">
            ?????
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Hi! I am Leonardo, a full-stack developer based in the Philippines.</p>
            <p>I have experience with React, Angular, Node.js, ASP.NET Core, PostgreSQL, AWS and Azure.</p>
            <p>Currently open to full-time opportunities.</p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/leonardo-luis-medina" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition">
                GitHub
              </a>
              <a href="/cv.pdf" download className="px-5 py-2 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-100 transition">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
