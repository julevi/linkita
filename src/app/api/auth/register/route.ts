import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, username, password } = validation.data

    const emailExists = await pool.query(
      'SELECT id FROM users WHERE email = $1', [email]
    )
    if (emailExists.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already in use' }, { status: 400 }
      )
    }

    const usernameExists = await pool.query(
      'SELECT id FROM users WHERE username = $1', [username]
    )
    if (usernameExists.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username already taken' }, { status: 400 }
      )
    }

    const password_hash = await bcrypt.hash(password, 12)

    const newUser = await pool.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username',
      [email, username, password_hash]
    )

    await pool.query(
      'INSERT INTO profiles (user_id, name) VALUES ($1, $2)',
      [newUser.rows[0].id, name]
    )

    return NextResponse.json({
      success: true,
      user: newUser.rows[0]
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}