import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await request.formData();

  return NextResponse.redirect(new URL("/thank-you", request.url), {
    status: 303,
  });
}
