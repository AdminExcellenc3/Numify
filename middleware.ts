import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/reset-password"];

export async function middleware(request: NextRequest) {
  try {
    // Create a response and supabase client
    const { supabase, response } = createMiddlewareClient(request);

    // Refresh session if it exists
    const { data: { session } } = await supabase.auth.getSession();

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    const isStaticRoute = request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/);

    // Skip middleware for API routes and static files
    if (isApiRoute || isStaticRoute) {
      return response;
    }

    // Redirect authenticated users away from public routes
    if (session && isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect unauthenticated users to login from protected routes
    if (!session && !isPublicRoute) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};