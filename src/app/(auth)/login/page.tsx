'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
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
      {/* Left side - Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 w-full min-h-screen">
        <div className="mb-10">
          <a href="/" className="text-xl font-bold hover:opacity-70 transition-opacity">linkita</a>
        </div>

        <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
        <p className="text-muted-foreground mb-8">Log in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <a href="/register" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right side - Visual */}
    <div className="hidden md:flex bg-zinc-900 items-center justify-center">
      <p className="text-white text-4xl font-bold tracking-tight">linkita.</p>
    </div>
    </div>
  )
}