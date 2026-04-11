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

// PUT - atualiza um link
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { title, url, is_active } = await request.json()

  const result = await pool.query(
    'UPDATE links SET title = $1, url = $2, is_active = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
    [title, url, is_active, id, user.id]
  )

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  return NextResponse.json({ link: result.rows[0] })
}

// DELETE - deleta um link
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  await pool.query(
    'DELETE FROM links WHERE id = $1 AND user_id = $2',
    [id, user.id]
  )

  return NextResponse.json({ success: true })
}