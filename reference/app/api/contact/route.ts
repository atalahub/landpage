import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields are required' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
    })

    // TODO: Integrar com serviço de email
    // Exemplo com Resend:
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'your-email@example.com',
    //   subject: subject,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // })

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

