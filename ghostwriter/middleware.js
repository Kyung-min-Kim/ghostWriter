import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/signin")) {
    const session = await getToken({ req: request });
    if (session != null) {
      return NextResponse.redirect(
        "http://localhost:3000?redirectedFrom=signin"
      );
    }
  }

  if (request.nextUrl.pathname.startsWith("/myJournal")) {
    const session = await getToken({ req: request });
    if (session == null) {
      return NextResponse.redirect(
        "http://localhost:3000?redirectedFrom=myJournal"
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin/:path*", "/myJournal/:path*"],
};
