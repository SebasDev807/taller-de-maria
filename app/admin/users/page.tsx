import React from "react";
import { getUsers } from "@/actions/user.actions";
import { UsersHeader, UsersTable } from "@/components/admin/users";

/**
 * Server component that renders the Users Management page for the Admin Dashboard.
 * Fetches the user list from the database via server actions and renders the UI.
 *
 * @returns {Promise<JSX.Element>} The Users management page.
 */
export default async function AdminUsersPage() {
  const result = await getUsers();

  const users = result.success && result.data ? result.data : [];

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop bg-surface min-h-screen">
      <UsersHeader
        title="Usuarios"
        subtitle="Gestiona y visualiza los detalles de los usuarios."
      />
      
      {result.success === false && (
        <div className="mb-4 p-4 rounded bg-error-container text-on-error-container">
          <p>Error al cargar usuarios: {result.error}</p>
        </div>
      )}

      <UsersTable users={users} />
    </main>
  );
}
