import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

export async function PUT(request: Request) {
  const user = await getUserFromToken()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { email, currentPassword, newPassword } = await request.json()

  // Busca usuário atual
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [user.id])
  const currentUser = result.rows[0]

  // Verifica senha atual
  const passwordMatch = await bcrypt.compare(currentPassword, currentUser.password_hash)
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
  }

  // Atualiza email e/ou senha
  if (newPassword) {
    const password_hash = await bcrypt.hash(newPassword, 10)
    await pool.query(
      'UPDATE users SET email = $1, password_hash = $2 WHERE id = $3',
      [email, password_hash, user.id]
    )
  } else {
    await pool.query('UPDATE users SET email = $1 WHERE id = $2', [email, user.id])
  }

  return NextResponse.json({ success: true })
}