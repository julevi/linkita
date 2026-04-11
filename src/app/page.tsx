import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">linkita</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-black transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <p className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">
          One link for everything
        </p>
        <h2 className="text-5xl font-bold tracking-tight max-w-xl leading-tight mb-6">
          Share all your links in one place
        </h2>
        <p className="text-muted-foreground max-w-sm mb-8">
          Create your personalized page and share your links, social media, and more — all in one URL.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/register"
            className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Create your linkita
          </Link>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-black transition-colors"
          >
            Already have an account →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-5 border-t flex items-center justify-between">
        <p className="text-xs text-muted-foreground">© 2026 linkita</p>
        <p className="text-xs text-muted-foreground">made with ♥</p>
      </footer>
    </div>
  )
}