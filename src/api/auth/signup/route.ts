import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

interface SignupRequestBody {
  name: string
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  password: string
}

// In-memory store for demo purposes
// In production, use a proper database
const users: User[] = []

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user exists
    const existingUser = users.find(user => user.email === email)

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    }

    users.push(newUser)

    // Store user data in cookie
    const cookieStore = await cookies()
    cookieStore.set('user-session', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }))

    return new NextResponse(
      JSON.stringify({ message: 'User created successfully' }), 
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}