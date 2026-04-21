'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { themes, ThemeKey } from '@/lib/themes'

interface Link {
  id: number
  title: string
  url: string
  is_active: boolean
  position: number
}

interface Profile {
  name: string
  bio: string
  avatar_url: string
  username: string
  email: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('links')
  const [links, setLinks] = useState<Link[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)

  const [profile, setProfile] = useState<Profile>({ name: '', bio: '', avatar_url: '', username: '', email: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('default')

  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    fetchLinks()
    fetchProfile()
  }, [])

  async function fetchLinks() {
    setLoading(true)
    const res = await fetch('/api/links')
    const data = await res.json()
    setLinks(data.links || [])
    setLoading(false)
  }

  async function handleAddLink(e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)

    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url })
    })

    if (res.ok) {
      setTitle('')
      setUrl('')
      fetchLinks()
    }

    setAdding(false)
  }

  async function handleDelete(id: number) {
    await fetch(`/api/links/${id}`, { method: 'DELETE' })
    fetchLinks()
  }

  async function handleToggle(link: Link) {
    await fetch(`/api/links/${link.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: link.title,
        url: link.url,
        is_active: !link.is_active
      })
    })
    fetchLinks()
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  async function fetchProfile() {
    const res = await fetch('/api/profile')
    const data = await res.json()
    if (data.profile) {
      setProfile(data.profile)
      setSelectedTheme(data.profile.theme ?? 'default')
    }
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPhoto(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    if (res.ok) {
      const updatedProfile = { ...profile, avatar_url: data.url }
      setProfile(updatedProfile)

      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile)
      })
    }

    setUploadingPhoto(false)
  }

  async function handleThemeChange(theme: ThemeKey) {
    setSelectedTheme(theme)
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        theme
      })
    })
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSavingProfile(true)

    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })

    setSavingProfile(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  function AnalyticsTab() {
    const [analytics, setAnalytics] = useState<{
      total: number
      last7days: number
      today: number
    } | null>(null)

    useEffect(() => {
      fetch('/api/analytics')
        .then((res) => res.json())
        .then((data) => setAnalytics(data))
    }, [])

    if (!analytics) return <p className="text-sm text-muted-foreground">Loading...</p>

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold">{analytics.today}</p>
          <p className="text-xs text-muted-foreground mt-1">Today</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold">{analytics.last7days}</p>
          <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold">{analytics.total}</p>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold hover:opacity-70 transition-opacity">linkita</a>
        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-black transition-colors"
        >
          Log out
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-6 border-b mb-8">
          {['links', 'appearance', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-muted-foreground hover:text-black'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            {/* Add Link Form */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-4">Add new link</h2>
              <form onSubmit={handleAddLink} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="link title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={adding}>
                  {adding ? 'Adding...' : 'Add link'}
                </Button>
              </form>
            </div>

            {/* Links List */}
            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : links.length === 0 ? (
                <p className="text-sm text-muted-foreground">No links yet. Add your first one!</p>
              ) : (
                links.map((link) => (
                  <div
                    key={link.id}
                    className="bg-white rounded-xl border p-4 flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium truncate">{link.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggle(link)}
                        className={`text-xs px-3 py-1 rounded-full border transition-colors ${link.is_active
                          ? 'bg-black text-white border-black'
                          : 'text-muted-foreground border-zinc-200'
                          }`}
                      >
                        {link.is_active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-4">Profile</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-zinc-500">
                          {profile.name?.[0]?.toUpperCase() ?? '?'}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <label className="cursor-pointer inline-flex items-center justify-center text-xs bg-black text-white px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                        {uploadingPhoto ? 'Uploading...' : 'Upload photo'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhoto}
                        />
                      </label>
                      {profile.avatar_url && (
                        <button
                          onClick={() => setProfile({ ...profile, avatar_url: '' })}
                          className="text-xs  text-black px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="A short description about you"
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
                
                <div className="flex flex-col justify-end">
                  <Button type="submit" disabled={savingProfile}>
                    {savingProfile ? 'Saving...' : 'Save'}
                  </Button>
                  {profileSaved && (
                    <p className="text-sm py-2 text-green-500">Saved!</p>
                  )}
                </div>
              </form>
            </div>

            {/* Theme Selector */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-4">Page theme</h2>
              <div className="grid sm:grid-cols-5 gap-3">
                {(Object.keys(themes) as ThemeKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    className={`relative rounded-xl p-3 border-2 transition-all ${selectedTheme === key
                      ? 'border-black scale-105'
                      : 'border-transparent hover:border-zinc-200'
                      }`}
                  >
                    <div className={`w-full h-12 rounded-lg ${themes[key].bg} border border-zinc-100 mb-2`} />
                    <p className="text-xs text-center font-medium">{themes[key].name}</p>
                    {selectedTheme === key && (
                      <div className="absolute top-1 right-1 w-3 h-3 bg-black rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-4">Preview</h2>
              <div className={`rounded-xl p-6 flex flex-col items-center ${themes[selectedTheme].bg}`}>
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-full ${themes[selectedTheme].avatar} flex items-center justify-center mb-3`}>
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className={`text-xl font-bold ${themes[selectedTheme].text}`}>
                      {profile.name?.[0]?.toUpperCase() ?? '?'}
                    </span>
                  )}
                </div>

                {/* Name & Bio */}
                <p className={`font-semibold text-sm ${themes[selectedTheme].text}`}>
                  {profile.name || 'Your name'}
                </p>
                {profile.bio && (
                  <p className={`text-xs ${themes[selectedTheme].subtext} mt-1 text-center max-w-xs`}>
                    {profile.bio}
                  </p>
                )}

                {/* Links */}
                <div className="w-full max-w-xs space-y-2 mt-4">
                  {links.length === 0 ? (
                    <p className={`text-xs text-center ${themes[selectedTheme].subtext}`}>
                      No links yet
                    </p>
                  ) : (
                    links.map((link) => (
                      <div
                        key={link.id}
                        className={`w-full text-center py-2 px-4 rounded-xl text-xs font-medium ${themes[selectedTheme].button}`}
                      >
                        {link.title}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <p className={`mt-4 text-xs ${themes[selectedTheme].subtext}`}>
                  made with <span className="font-semibold">linkita</span>
                </p>

                {/* Link pra página pública */}
                <a
                  href={`/u/${profile.username}`}
                  target="_blank"
                  className={`mt-3 text-xs underline underline-offset-2 transition-colors ${themes[selectedTheme].subtext} hover:${themes[selectedTheme].text}`}
                >
                  View public page →
                </a>
              </div>
            </div>
          </div>

        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-6">Page views</h2>
              <AnalyticsTab />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-sm font-semibold mb-4">Account settings</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const email = (form.elements.namedItem('email') as HTMLInputElement).value
                  const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value
                  const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value

                  const res = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, currentPassword, newPassword })
                  })

                  const data = await res.json()
                  if (!res.ok) {
                    alert(data.error)
                  } else {
                    alert('Settings saved!')
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={profile.email || ''}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="newPassword">New password <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit">Save settings</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}