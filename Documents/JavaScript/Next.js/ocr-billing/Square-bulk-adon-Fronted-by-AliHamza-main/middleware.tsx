import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken') 

  const isAuth = token ? true : false // Check if token exists

  const { pathname } = req.nextUrl

  if (pathname === '/upload' && !isAuth) {
    const url = req.nextUrl.clone()
    url.pathname = '/login' // Redirect to home page if not authenticated
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/upload'], // Apply middleware only on the /upload page
}