import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const url = request.nextUrl;

  // console.log("Middleware Token:", token);
  console.log("Middleware URL:", url.pathname);

  if (token) {
    console.log("Token found, user authenticated");

    if (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup')) {
      console.log("Redirecting to /profile because user is authenticated");
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // console.log("No token found, user not authenticated");

    if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/profile') || url.pathname.startsWith('/share-recipe')) {
      console.log("Redirecting to /signin because user is not authenticated");
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // Default response if no condition matches
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin', '/signup', '/dashboard', '/verify/:path*', '/taskform', '/profile', '/share-recipe'],
};