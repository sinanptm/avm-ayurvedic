import { NextRequest, NextResponse } from "next/server";

const adminMiddleware = (request: NextRequest, pathname: string) => {
    if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    const adminToken = request.cookies.get("adminToken")?.value;

    if (adminToken) {

    } else {
        if (pathname.startsWith('/admin')) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    }

    return undefined;
};

export default adminMiddleware;
