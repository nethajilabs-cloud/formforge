export function Footer() {
  return (
    <footer
      style={{
        background: '#09090b',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 0',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
          >
            F
          </div>
          <span className="text-white font-semibold">FormForge</span>
          <span className="text-slate-600 text-sm ml-2">· MIT License</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <a
            href="https://docs-steel-sigma.vercel.app"
            className="hover:text-white transition-colors no-underline"
          >
            Docs
          </a>
          <a
            href="https://github.com/nethajilabs-cloud/formforge"
            target="_blank"
            rel="noopener"
            className="hover:text-white transition-colors no-underline"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/org/formforges"
            target="_blank"
            rel="noopener"
            className="hover:text-white transition-colors no-underline"
          >
            npm
          </a>
        </div>
        <p className="text-slate-600 text-sm">© 2025 FormForge</p>
      </div>
    </footer>
  )
}
