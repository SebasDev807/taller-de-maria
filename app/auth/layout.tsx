import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "../globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Acceso Admin - Taller De Maria",
  description: "Portal de Administración de Taller De Maria",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${lato.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body-md text-body-md antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
