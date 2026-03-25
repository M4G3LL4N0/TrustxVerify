import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  
  // TODO: Add actual waitlist signup logic
  // const email = String(formData.get('email'))
  // const name = String(formData.get('name'))
  
  return NextResponse.redirect(new URL('/thank-you', request.url), {
    status: 303,
  })
}
