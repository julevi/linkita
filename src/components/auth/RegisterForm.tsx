'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  t: Record<string, string>
}

export default function RegisterForm({ t }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      setLoading(false)
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers and underscores')
      setLoading(false)
      return
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, username, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push('/login')
  }

  return (
    <div className="h-screen md:grid grid-cols-2 overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full px-8 md:px-16 overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          <div className="mb-10">
            <a href="/" className="text-xl font-bold hover:opacity-70 transition-opacity">linkita</a>
          </div>

          <h2 className="text-2xl font-semibold mb-1">{t.title}</h2>
          <p className="text-muted-foreground mb-8">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input id="name" type="text" placeholder="Juliana Prado" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input id="username" type="text" placeholder="juliana" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} required />
              <p className="text-xs text-muted-foreground">{t.usernameHint}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <p className="text-xs text-muted-foreground">{t.passwordHint}</p>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full bg-petroleum-blue hover:bg-petroleum-blue/90" disabled={loading}>
              {loading ? t.loading : t.submit}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            {t.hasAccount}{' '}
            <a href="/login" className="text-primary font-medium hover:underline">
              {t.login}
            </a>
          </p>
        </div>
      </div>

      {/* Right side */}

      <div className="hidden md:flex overflow-hidden">
        <img
          src="https://res.cloudinary.com/dgp4qg7o8/image/upload/v1777027295/pexels-tima-miroshnichenko-6611923_ctmcvr.jpg"
          alt="Linkita"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}