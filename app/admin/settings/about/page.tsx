import { getAboutConfig } from "@/actions/about.actions";
import { AdminPageHeader, AboutForm } from "@/components/admin";

export default async function AboutSettingsPage() {
  const result = await getAboutConfig();
  const initialData = result.success ? result.data : null;

  return (
    <main className="flex-1 overflow-y-auto bg-surface p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <AdminPageHeader
          title="Configuración de 'Acerca de'"
          description="Administra la información pública de tu taller (historia, dirección, contacto, etc)."
        />

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <AboutForm initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
