import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    console.log('Newsletter subscription:', email)

    // TODO: Integrar com serviço de email marketing
    // Exemplo com Mailchimp, ConvertKit, etc.

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

