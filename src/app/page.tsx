import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dgp4qg7o8/video/upload/v1776684672/linkitavideo_lnku6v.mp4"
      />

      {/* Overlay escuro pra legibilidade */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Header */}
      <header className="relative z-20 px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold hover:opacity-70 transition-opacity text-white">linkita</a>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm text-white/70 mb-4 tracking-wide uppercase">
          One link for everything
        </p>
        <h2 className="text-5xl font-bold tracking-tight max-w-xl leading-tight mb-6 text-white">
          Share all your links in one place
        </h2>
        <p className="text-white/70 max-w-sm mb-8">
          Create your personalized page and share your links, social media, and more — all in one URL.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Create your linkita
          </Link>
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Already have an account →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-8 py-5 flex items-center justify-between">
      <p className="text-xs text-white/50">© 2026 linkita</p>
      <p className="text-xs text-white/50">
        made with ♥ by{' '}
        <a
          href="https://julianaprado.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors underline underline-offset-2"
        >
          Juliana Prado
        </a>
      </p>
</footer>
    </div>
  )
}