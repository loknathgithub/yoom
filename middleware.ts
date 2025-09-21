import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = [ '/',
    '/upcoming',
    '/recordings',
    '/previous',
    '/personal-room',
    '/meeting(.*)']

const publicRoutes = ["/auth/signin", "/auth/error"];

export default async function middleware(request: NextRequest){
    const session = await auth();
    const { pathname } = request.nextUrl;

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    if (isPublicRoute) return NextResponse.next();

    const isProtectedRoute = protectedRoutes.some(route => {
        // Handle the root route ('/') with an exact match
        if (route === '/') return pathname === '/';
        // For all other protected routes, use startsWith
        return pathname.startsWith(route);
    });
    if(isProtectedRoute && !session ) return NextResponse.redirect(new URL("/auth/signin", request.url))
    
    return NextResponse.next()
}