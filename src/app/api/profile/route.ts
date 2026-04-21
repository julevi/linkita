import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

async function getUserFromToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
    return decoded
  } catch {
    return null
  }
}

// GET - busca o perfil do usuário
export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await pool.query(
    'SELECT profiles.*, users.username, users.email FROM profiles JOIN users ON profiles.user_id = users.id WHERE profiles.user_id = $1',
    [user.id]
  )

  return NextResponse.json({ profile: result.rows[0] })
}

// PUT - atualiza o perfil
export async function PUT(request: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, bio, avatar_url, theme } = await request.json()

  const result = await pool.query(
    'UPDATE profiles SET name = $1, bio = $2, avatar_url = $3, theme = $4 WHERE user_id = $5 RETURNING *',
    [name, bio, avatar_url, theme, user.id]
  )

  return NextResponse.json({ profile: result.rows[0] })
}