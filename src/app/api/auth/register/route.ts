import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { name, email, username, password } = await request.json()

        // Validações básicas
        if (!name || !email || !username || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Verifica se email já existe
        const emailExists = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        )
        if (emailExists.rows.length > 0) {
            return NextResponse.json(
                { error: 'Email already in use' },
                { status: 400 }
            )
        }

        // Verifica se username já existe
        const usernameExists = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        )
        if (usernameExists.rows.length > 0) {
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: 400 }
            )
        }

        // Criptografa a senha
        const password_hash = await bcrypt.hash(password, 10)

        // Cria o usuário
        const newUser = await pool.query(
            'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username',
            [email, username, password_hash]
        )

        // Cria o perfil do usuário
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
            { error: String(error) },
            { status: 500 }
        )
    }
}