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

export async function GET() {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const total = await pool.query(
    'SELECT COUNT(*) as total FROM page_views WHERE user_id = $1',
    [user.id]
  )

  const last7days = await pool.query(
    'SELECT COUNT(*) as total FROM page_views WHERE user_id = $1 AND viewed_at >= NOW() - INTERVAL \'7 days\'',
    [user.id]
  )

  const today = await pool.query(
    'SELECT COUNT(*) as total FROM page_views WHERE user_id = $1 AND viewed_at >= CURRENT_DATE',
    [user.id]
  )

  return NextResponse.json({
    total: Number(total.rows[0].total),
    last7days: Number(last7days.rows[0].total),
    today: Number(today.rows[0].total)
  })
}