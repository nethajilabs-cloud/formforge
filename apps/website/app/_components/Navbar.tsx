import Link from 'next/link'

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5"
      style={{ background: 'rgba(9,9,11,0.8)' }}
    >
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
        >
          F
        </div>
        <span className="text-white font-semibold text-lg">FormForge</span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link href="https://formforge-docs-site.vercel.app" className="text-sm text-slate-400 hover:text-white transition-colors no-underline">
          Docs
        </Link>
        <a
          href="https://github.com/nethajilabs-cloud/formforge"
          target="_blank"
          rel="noopener"
          className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/org/formforges"
          target="_blank"
          rel="noopener"
          className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
        >
          npm
        </a>
      </div>

      <Link
        href="https://formforge-docs-site.vercel.app/docs/quick-start"
        className="text-sm px-4 py-2 rounded-lg font-medium text-white no-underline transition-all animate-pulse-glow"
        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
      >
        Get Started →
      </Link>
    </nav>
  )
}
