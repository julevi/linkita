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

// GET - busca todos os links do usuário
export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const result = await pool.query(
    'SELECT * FROM links WHERE user_id = $1 ORDER BY position ASC',
    [user.id]
  )

  return NextResponse.json({ links: result.rows })
}

// POST - cria um novo link
export async function POST(request: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, url } = await request.json()

  if (!title || !url) {
    return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 })
  }

  // Pega a última posição
  const lastLink = await pool.query(
    'SELECT MAX(position) as max_pos FROM links WHERE user_id = $1',
    [user.id]
  )
  const position = (lastLink.rows[0].max_pos ?? -1) + 1

  const result = await pool.query(
    'INSERT INTO links (user_id, title, url, position) VALUES ($1, $2, $3, $4) RETURNING *',
    [user.id, title, url, position]
  )

  return NextResponse.json({ link: result.rows[0] }, { status: 201 })
}