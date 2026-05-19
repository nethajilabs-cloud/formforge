import Link from 'next/link'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      style={{ background: '#09090b', paddingTop: '80px' }}
    >
      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-6"
              style={{
                color: '#22d3ee',
                borderColor: 'rgba(34,211,238,0.3)',
                background: 'rgba(34,211,238,0.08)',
              }}
            >
              ✦ Open Source · TypeScript · React
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-white">Schema-first</span>
            <br />
            <span className="gradient-text">forms for React</span>
          </h1>

          <p
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.35s' }}
          >
            Define your form in a plain config object. FormForge handles UI, validation, layout,
            accessibility, and themes —{' '}
            <span style={{ color: '#f8fafc' }}>automatically.</span>
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link
              href="https://formforge-docs-site.vercel.app/docs/quick-start"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white no-underline transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                boxShadow: '0 0 32px rgba(99,102,241,0.4)',
              }}
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/nethajilabs-cloud/formforge"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 no-underline"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e2e8f0',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>

          <div
            className="flex items-center gap-6 mt-10 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            {[
              ['246', 'Tests passing'],
              ['8', 'Packages'],
              ['3', 'Built-in themes'],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white">{n}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating code card */}
        <div
          className="flex-1 min-w-0 flex justify-center lg:justify-end animate-float"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="w-full max-w-lg">
            <div className="code-block gradient-border shadow-2xl">
              <div
                className="flex items-center gap-1.5 px-4 py-3 border-b"
                style={{ borderColor: '#21262d' }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-500">schema.ts</span>
              </div>
              <pre className="text-slate-300">
                <code>
                  <span className="token-keyword">const</span>
                  {' schema '}
                  <span className="token-punctuation">=</span>
                  {' {\n  name'}
                  <span className="token-punctuation">:</span>
                  {'  { type'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;text&apos;</span>
                  {',  label'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;Full Name&apos;</span>
                  {',    required'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-value">true</span>
                  {' },\n  email'}
                  <span className="token-punctuation">:</span>
                  {' { type'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;email&apos;</span>
                  {', label'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;Email&apos;</span>
                  {',         required'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-value">true</span>
                  {' },\n  role'}
                  <span className="token-punctuation">:</span>
                  {'  { type'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;select&apos;</span>
                  {',\n    options'}
                  <span className="token-punctuation">:</span>
                  {' [\n      { value'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;dev&apos;</span>
                  {',      label'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;Developer&apos;</span>
                  {' },\n      { value'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;designer&apos;</span>
                  {', label'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;Designer&apos;</span>
                  {' },\n    ],\n  },\n  bio'}
                  <span className="token-punctuation">:</span>
                  {'   { type'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;textarea&apos;</span>
                  {', label'}
                  <span className="token-punctuation">:</span>
                  {' '}
                  <span className="token-string">&apos;Short Bio&apos;</span>
                  {' },\n}\n\n'}
                  <span className="token-comment">{'// That\'s it. Render with:'}</span>
                  {'\n'}
                  <span className="token-punctuation">{'<'}</span>
                  <span className="token-type">FormForge</span>
                  {' schema'}
                  <span className="token-punctuation">={'{'}</span>
                  <span className="token-value">schema</span>
                  <span className="token-punctuation">{'}'}</span>
                  {' theme'}
                  <span className="token-punctuation">=</span>
                  <span className="token-string">&quot;modern&quot;</span>
                  {' '}
                  <span className="token-punctuation">/&gt;</span>
                </code>
              </pre>
            </div>

            {/* Mini badges floating below */}
            <div className="flex gap-3 mt-4 justify-center animate-float-slow">
              {['✓ Accessible', '✓ Validated', '✓ Responsive'].map((b) => (
                <span
                  key={b}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    color: '#a5b4fc',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #09090b)' }}
      />
    </section>
  )
}
