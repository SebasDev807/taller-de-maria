import { LoginForm } from "@/components";
import Link from "next/link";
import { Metadata } from "next";

export interface LoginPageProps {
  searchParams: Promise<{ verified?: string }>;
}

export const metadata: Metadata = {
  title: "Iniciar Sesión - Taller De Maria",
  description: "Inicia Sesión en Taller De Maria",
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { verified } = await searchParams;

  const banners: Record<string, { icon: string; text: string; style: string }> = {
    success: {
      icon: "verified",
      text: "¡Cuenta confirmada! Ya puedes iniciar sesión.",
      style: "bg-[#E6F4EA] text-[#1E4D2B] border border-[#A8D5B5]",
    },
    expired: {
      icon: "schedule",
      text: "El enlace de verificación ha expirado. Regístrate de nuevo.",
      style: "bg-[#FFF8E1] text-[#6D4C00] border border-[#FFD54F]",
    },
    invalid: {
      icon: "error",
      text: "El enlace no es válido o ya fue usado.",
      style: "bg-error-container text-on-error-container border border-error",
    },
    error: {
      icon: "warning",
      text: "Ocurrió un error al verificar tu cuenta. Intenta de nuevo.",
      style: "bg-error-container text-on-error-container border border-error",
    },
  };

  const banner = verified ? banners[verified] : null;

  return (
    <main className="fade-in min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop">
      {/* Card */}
      <div className="login-card w-full max-w-[440px] bg-surface-container-lowest rounded-xl p-md md:p-lg flex flex-col gap-lg border border-surface-container-high">

        {/* ── Header ── */}
        <div className="text-center flex flex-col items-center gap-sm">
          <span
            className="material-symbols-outlined text-secondary login-icon mb-2"
            style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
          >
            church
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
            Taller De Maria
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Inicia Sesión
          </p>
        </div>

        {/* ── Banner de verificación ── */}
        {banner && (
          <div
            role="alert"
            className={`flex items-center gap-2 font-label-sm text-label-sm px-4 py-3 rounded-lg ${banner.style}`}
          >
            <span
              className="material-symbols-outlined shrink-0"
              style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
            >
              {banner.icon}
            </span>
            <span>{banner.text}</span>
          </div>
        )}

        {/* --- login form --*/}
        <LoginForm />

        {/* ── Footer ── */}
        <div className="text-center flex flex-col items-center gap-sm">
          <Link
            href="/auth/register"
            className="font-label-sm text-label-sm text-secondary hover:underline underline-offset-4 transition-all"
          >
            ¿No tienes una cuenta? Crea una
          </Link>
          <Link
            href="/"
            className="font-label-sm text-label-sm text-secondary hover:underline underline-offset-4 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              arrow_back
            </span>
            Volver a la tienda
          </Link>
          <p className="font-label-sm text-label-sm text-outline">
            © {new Date().getFullYear()} Taller De Maria. Todos los derechos reservados.
          </p>
        </div>
      </div>


    </main>
  );
}
