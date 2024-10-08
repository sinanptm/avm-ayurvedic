import { NextRequest, NextResponse } from "next/server";

const patientMiddleware = (request: NextRequest, pathname: string) => {
    const patientToken = request.cookies.get("patientToken")?.value;

    if (patientToken) {
        if (
            pathname === '/signin' ||
            pathname === '/signup' ||
            pathname === '/signin/opt-verification' ||
            pathname === '/signin/reset-password'
        ) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    } else {
        if (
            pathname === '/profile' ||
            pathname === '/appointments' ||
            pathname === '/register'
        ) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    }

    return undefined;
};

export default patientMiddleware;
