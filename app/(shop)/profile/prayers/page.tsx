import React from "react";
import { getSavedReadings } from "@/actions/savedReadings.actions";
import { ProfilePrayersClient } from "@/components/profile/ProfilePrayersClient";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Mis Plegarias | Taller De Maria",
  description: "Tu rincón personal de paz y devoción.",
};

export default async function ProfilePrayersPage() {
  const session = await getSession();

  if (!session?.userId) {
    redirect("/auth/login");
  }

  const response = await getSavedReadings();
  const readings = response.success && response.data ? response.data : [];

  return (
    <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-xl mt-20">
      {/* Header Section */}
      <header className="mb-xl max-w-2xl">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-sm">
          Mis Plegarias
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 italic">
          Tu rincón personal de paz y devoción.
        </p>
      </header>

      {/* Client Component for filtering and rendering */}
      <ProfilePrayersClient initialReadings={readings} />
    </main>
  );
}
