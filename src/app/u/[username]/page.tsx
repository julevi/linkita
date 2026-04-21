import { notFound } from 'next/navigation'
import pool from '@/lib/db'
import { themes, ThemeKey } from '@/lib/themes'

interface Props {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params

  const userResult = await pool.query(
    'SELECT users.id, users.username, profiles.name, profiles.bio, profiles.avatar_url, profiles.theme FROM users JOIN profiles ON users.id = profiles.user_id WHERE users.username = $1',
    [username]
  )

  if (userResult.rows.length === 0) {
    notFound()
  }

  const profile = userResult.rows[0]

  await pool.query(
    'INSERT INTO page_views (user_id) VALUES ($1)',
    [profile.id]
  )

  const linksResult = await pool.query(
    'SELECT * FROM links WHERE user_id = $1 AND is_active = true ORDER BY position ASC',
    [profile.id]
  )

  const links = linksResult.rows
  const theme = themes[(profile.theme as ThemeKey) ?? 'default'] ?? themes.default

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col items-center py-16 px-4`}>
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <div className={`w-20 h-20 rounded-full ${theme.avatar} flex items-center justify-center mb-4`}>
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <span className={`text-2xl font-bold ${theme.text}`}>
              {profile.name?.[0]?.toUpperCase() ?? username[0].toUpperCase()}
            </span>
          )}
        </div>
        <h1 className={`text-lg font-bold ${theme.text}`}>{profile.name || username}</h1>
        {profile.bio && (
          <p className={`text-sm ${theme.subtext} mt-1 text-center max-w-xs`}>{profile.bio}</p>
        )}
      </div>

      {/* Links */}
      <div className="w-full max-w-sm space-y-3">
        {links.length === 0 ? (
          <p className={`text-sm text-center ${theme.subtext}`}>No links yet.</p>
        ) : (
          links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full text-center py-3 px-6 rounded-xl text-sm font-medium transition-colors shadow-sm ${theme.button}`}
            >
              {link.title}
            </a>
          ))
        )}
      </div>

      {/* Footer */}
      <p className={`mt-12 text-xs ${theme.subtext}`}>
        made with <span className="font-semibold">linkita</span>
      </p>
    </div>
  )
}