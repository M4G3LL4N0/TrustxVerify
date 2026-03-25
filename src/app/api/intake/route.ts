import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  
  // TODO: Add actual intake form processing logic
  // Process form data here
  
  return NextResponse.redirect(new URL('/request-received', request.url), {
    status: 303,
  })
}
