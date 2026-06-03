import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "../globals.css";
import { AdminLayoutShell } from "@/components";

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
  title: "Admin Dashboard - Taller De Maria",
  description: "Management Console for Taller De Maria",
};

export default function AdminRootLayout({
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
      <body className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-full">
        <AdminLayoutShell>
          {children}
        </AdminLayoutShell>
      </body>
    </html>
  );
}
