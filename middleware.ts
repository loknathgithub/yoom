import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./auth";

const protectedRoutes = [ '/',
    '/upcoming',
    '/recordings',
    '/previous',
    '/personal-room',
    '/meeting(.*)']

export default async function middleware(request: NextRequest){
    const session = await authOptions.auth();
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    if(isProtected && !session) return NextResponse.redirect(new URL("/auth/signin", request.url))
    
    return NextResponse.next()
}