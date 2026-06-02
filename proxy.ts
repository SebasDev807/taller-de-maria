import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { UserRole } from "@/models/user/user.interface";

// ---------------------------------------------------------------------------
// Rutas protegidas
// ---------------------------------------------------------------------------

const ADMIN_PREFIX = "/admin";
const AUTH_LOGIN = "/auth/login";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Leer la cookie de sesión
  const token = req.cookies.get("auth_session")?.value;
  const session = await decrypt(token);

  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  const isLoginRoute = pathname === AUTH_LOGIN;

  // ── Protección del panel admin ──────────────────────────────────────────
  if (isAdminRoute) {
    // Sin sesión → redirigir al login
    if (!session) {
      return NextResponse.redirect(new URL(AUTH_LOGIN, req.nextUrl));
    }

    // Con sesión pero rol != admin → redirigir a la tienda
    if (session.role !== UserRole.Admin) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  // ── Si ya tiene sesión admin activa y va al login → redirigir al dashboard ──
  if (isLoginRoute && session?.role === UserRole.Admin) {
    return NextResponse.redirect(new URL(ADMIN_PREFIX, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas excepto:
     * - _next/static  (archivos estáticos)
     * - _next/image   (optimización de imágenes)
     * - favicon.ico
     * - archivos con extensión (imágenes, fuentes, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ttf)$).*)",
  ],
};
