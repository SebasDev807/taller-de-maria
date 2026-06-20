import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models";

/**
 * GET /api/auth/verify?token=<uuid>
 *
 * Verifica el token de confirmación de cuenta:
 * 1. Busca el usuario por token.
 * 2. Comprueba que el token no haya expirado.
 * 3. Activa la cuenta (isActive = true) y limpia el token.
 * 4. Redirige al login con un parámetro de éxito para mostrar feedback.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login?verified=invalid", req.url)
    );
  }

  try {
    await dbConnect();

    const user = await User.findOne({ verificationToken: token });

    // Token no encontrado
    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/login?verified=invalid", req.url)
      );
    }

    // Token expirado
    if (
      user.verificationTokenExpires &&
      user.verificationTokenExpires < new Date()
    ) {
      return NextResponse.redirect(
        new URL("/auth/login?verified=expired", req.url)
      );
    }

    // ✅ Activar cuenta y limpiar token
    await User.updateOne(
      { _id: user._id },
      {
        $set: { isActive: true },
        $unset: { verificationToken: "", verificationTokenExpires: "" },
      }
    );

    return NextResponse.redirect(
      new URL("/auth/login?verified=success", req.url)
    );
  } catch (err) {
    console.error("[verify] Error:", err);
    return NextResponse.redirect(
      new URL("/auth/login?verified=error", req.url)
    );
  }
}
