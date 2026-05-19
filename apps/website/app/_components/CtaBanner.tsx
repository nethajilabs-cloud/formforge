import Link from 'next/link'

export function CtaBanner() {
  return (
    <section
      style={{
        background: '#09090b',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-5">
          Build forms, <span className="gradient-text">faster.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-10">
          Zero setup. Full control. Open source and free forever.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs/docs/quick-start"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white no-underline transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            }}
          >
            Read the Docs →
          </Link>
          <a
            href="https://github.com/nethajilabs-cloud/formforge"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold no-underline transition-all hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0',
            }}
          >
            ★ Star on GitHub
          </a>
        </div>
        <p className="mt-8 text-sm text-slate-600">MIT License · TypeScript · React 18+</p>
      </div>
    </section>
  )
}
