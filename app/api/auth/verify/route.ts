import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User, VerificationToken } from "@/models";

/**
 * GET /api/auth/verify?token=<uuid>
 *
 * Flujo de verificación de cuenta:
 * 1. Busca el token en la colección VerificationToken (modelo separado, 1:1 con User).
 * 2. Comprueba que no haya expirado.
 * 3. Activa la cuenta del usuario referenciado (isActive = true).
 * 4. Elimina el documento de token (ya cumplió su función).
 * 5. Redirige al login con feedback.
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

    // 1. Buscar el token en su propia colección
    const verificationRecord = await VerificationToken.findOne({ token });

    // Token no encontrado (ya usado o nunca existió)
    if (!verificationRecord) {
      return NextResponse.redirect(
        new URL("/auth/login?verified=invalid", req.url)
      );
    }

    // 2. Comprobar expiración
    if (verificationRecord.expiresAt < new Date()) {
      // Limpiar token expirado (el TTL de MongoDB también lo haría, pero es más inmediato)
      await VerificationToken.deleteOne({ _id: verificationRecord._id });
      return NextResponse.redirect(
        new URL("/auth/login?verified=expired", req.url)
      );
    }

    // 3. Activar la cuenta del usuario referenciado
    const user = await User.findByIdAndUpdate(
      verificationRecord.userId,
      { $set: { isActive: true } },
      { new: true }
    );

    if (!user) {
      return NextResponse.redirect(
        new URL("/auth/login?verified=invalid", req.url)
      );
    }

    // 4. Eliminar el token — ya cumplió su función
    await VerificationToken.deleteOne({ _id: verificationRecord._id });

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
