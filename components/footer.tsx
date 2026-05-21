export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-black text-white text-lg">LM.</p>
          <p className="text-xs text-gray-600 mt-1">Leonardo Luis C. Medina</p>
        </div>
        <div className="flex gap-6 text-xs text-gray-500">
          <a href="https://github.com/leonardo-luis-medina" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
            GitHub
          </a>
          <a href="https://linkedin.com/in/leonardo-luis-c-medina-9475192ab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
            LinkedIn
          </a>
          <a href="mailto:leonardo.luis.medina99@gmail.com" className="hover:text-white transition">
            Email
          </a>
        </div>
        <p className="text-xs text-gray-700">
          2026 Leonardo Luis C. Medina. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
