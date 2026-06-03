import { LoginForm } from "@/components";
import Link from "next/link";


export default function AdminLoginPage() {

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
            Portal de Administración
          </p>
        </div>
        {/* --- login form --*/}

        <LoginForm />

        {/* ── Footer ── */}
        <div className="text-center flex flex-col items-center gap-sm">
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
            © {new Date().getFullYear()} Taller De Maria. Acceso restringido.
          </p>
        </div>
      </div>


    </main>
  );
}
