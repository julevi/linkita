'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  t: Record<string, string>
}

export default function LoginForm({ t }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen md:grid grid-cols-2">
      <div className="flex flex-col justify-center items-center min-h-screen md:min-h-0 px-8 md:px-16 w-full">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <a href="/" className="text-xl font-bold hover:opacity-70 transition-opacity">linkita</a>
          </div>

          <h2 className="text-2xl font-semibold mb-1">{t.title}</h2>
          <p className="text-muted-foreground mb-8">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.loading : t.submit}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            {t.noAccount}{' '}
            <a href="/register" className="text-primary font-medium hover:underline">
              {t.signUp}
            </a>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:flex bg-zinc-900 items-center justify-center">
        <p className="text-white text-4xl font-bold tracking-tight">linkita.</p>
      </div>
    </div>
  )
}