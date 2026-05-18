export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-gray-50 to-white">
      <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest mb-4">
        Full-Stack Developer
      </p>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
        Hi I am Leonardo
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mb-10">
        I build modern full-stack web applications using Next.js, TypeScript, and PostgreSQL.
      </p>
      <div className="flex gap-4">
        <a href="#projects" className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-700 transition">
          See My Work
        </a>
        <a href="#contact" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-100 transition">
          Contact Me
        </a>
      </div>
    </section>
  );
}
