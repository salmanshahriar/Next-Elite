import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|(?:\\.svg|\\.png|\\.jpg|\\.webp)|apple-icon\\.png).*)',
  ],
};
