import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "../globals.css";
import { Footer, TopNavBar } from "@/components";

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
  title: "Taller De Maria - Inicio",
  description: "Paz y devoción en cada detalle.",
};

export default function RootLayout({
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
      <body className="bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-full flex flex-col">
        <TopNavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
