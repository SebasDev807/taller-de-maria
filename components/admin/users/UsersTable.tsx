import React from "react";
import { UserRow, UserData } from "./UserRow";

/**
 * Props for the UsersTable component.
 */
interface UsersTableProps {
  /**
   * Array of users to display in the table.
   */
  users: UserData[];
}

/**
 * Renders the users data table.
 * Includes column headers and maps over users data to render UserRow components.
 *
 * @param {UsersTableProps} props - The properties passed to the component.
 * @returns {JSX.Element} The users table component.
 */
export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-ambient overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-container-high bg-surface-container-low">
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">
                Cliente
              </th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">
                Email
              </th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">
                Rol
              </th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">
                Estado
              </th>
              <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">
                Fecha Registro
              </th>
              <th className="py-4 px-6 text-right font-label-md text-label-md text-on-surface-variant font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="font-body-md text-body-md text-on-surface">
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-on-surface-variant"
                >
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Static layout as per template, can be hooked up to logic later) */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-surface-container-high bg-surface-container-lowest">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Mostrando {Math.min(1, users.length)} a {users.length} de {users.length} entradas
        </span>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded text-outline hover:text-primary hover:bg-surface-variant disabled:opacity-50 transition-colors"
            disabled
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              chevron_left
            </span>
          </button>
          <button className="w-8 h-8 rounded bg-secondary-container text-primary-container font-label-sm text-label-sm flex items-center justify-center">
            1
          </button>
          <button
            className="p-1 rounded text-outline hover:text-primary hover:bg-surface-variant transition-colors disabled:opacity-50"
            disabled
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
