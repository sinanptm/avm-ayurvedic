import { NextRequest, NextResponse } from "next/server";

const doctorMiddleware = (request: NextRequest, pathname: string) => {
    if (pathname === '/doctor') {
        return NextResponse.redirect(new URL('/doctor/slots', request.url));
    }

    const doctorToken = request.cookies.get("doctorToken")?.value;

    if (!doctorToken) {
        if (pathname.startsWith('/doctor')) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    }

    return undefined;
};

export default doctorMiddleware;
