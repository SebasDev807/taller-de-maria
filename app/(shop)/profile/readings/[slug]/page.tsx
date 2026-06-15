import React from "react";
import { getReadingBySlug } from "@/actions/savedReadings.actions";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { SingleReadingClient } from "@/components/profile/SingleReadingClient";
import Link from "next/link";

export const metadata = {
  title: "Detalle de Lectura | Taller De Maria",
  description: "Detalle de tu oración o evangelio guardado.",
};

export default async function SingleReadingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getSession();

  if (!session?.userId) {
    redirect("/auth/login");
  }

  const response = await getReadingBySlug(slug);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const reading = response.data;

  return (
    <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-xl mt-20">
      {/* Header Section with Back Button */}
      <header className="mb-xl max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-sm">
            Lectura Guardada
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 italic">
            Reflexiona sobre las palabras que han tocado tu corazón.
          </p>
        </div>
        <Link 
          href="/profile/readings"
          className="flex items-center font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined mr-xs">arrow_back</span>
          Volver a Mis Lecturas
        </Link>
      </header>

      {/* Client Component for individual reading */}
      <SingleReadingClient 
        id={reading._id}
        type={reading.type}
        title={reading.title}
        text={reading.text}
        reference={reading.reference}
        createdAt={reading.createdAt}
      />
    </main>
  );
}
