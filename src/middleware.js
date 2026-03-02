import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect /admin/* routes (except /admin/login and /api/auth/*)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET || "super-secret-key-for-development",
        });

        if (!token) {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
