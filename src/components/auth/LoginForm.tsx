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
    <div className="h-screen md:grid grid-cols-2 overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full px-8 md:px-16">
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

            <Button type="submit" className="w-full bg-petroleum-blue hover:bg-petroleum-blue/90" disabled={loading}>
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
      <div className="hidden md:flex overflow-hidden">
        <img
          src="https://res.cloudinary.com/dgp4qg7o8/image/upload/v1777027303/pexels-maksgelatin-5506093_acf851.jpg"
          alt="Linkita"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}