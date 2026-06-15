"use client";

import React, { useTransition } from "react";
import { toggleUserStatus, toggleUserRole } from "@/actions/user.actions";
import { UserRole } from "@/models/user/user.interface";

/**
 * Interface representing a user object passed to the row component.
 */
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  phoneNumber?: string;
  totalSpent: number;
  createdAt: string;
}

/**
 * Props for the UserRow component.
 */
interface UserRowProps {
  /**
   * The user data to be displayed in the row.
   */
  user: UserData;
}

/**
 * Utility to extract initials from a name.
 */
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

/**
 * Renders a single row in the users table.
 * Provides controls for toggling the user's role and their active status.
 *
 * @param {UserRowProps} props - The properties passed to the component.
 * @returns {JSX.Element} The user row component.
 */
export const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const [isPendingStatus, startTransitionStatus] = useTransition();
  const [isPendingRole, startTransitionRole] = useTransition();

  const handleToggleStatus = () => {
    startTransitionStatus(async () => {
      await toggleUserStatus(user.id);
    });
  };

  const handleToggleRole = () => {
    startTransitionRole(async () => {
      await toggleUserRole(user.id);
    });
  };

  // Determine avatar background color based on active status
  const avatarBg = user.isActive ? "bg-primary-fixed" : "bg-surface-variant";
  const avatarText = user.isActive
    ? "text-on-primary-fixed"
    : "text-on-surface-variant";

  return (
    <tr className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${avatarBg} ${avatarText} flex items-center justify-center font-label-md text-label-md`}
          >
            {getInitials(user.name)}
          </div>
          <span className="font-medium text-primary">{user.name}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-on-surface-variant">{user.email}</td>
      <td className="py-4 px-6 font-medium capitalize">
        <span
          className={`px-2 py-1 rounded text-xs ${
            user.role === UserRole.Admin
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-surface-variant text-on-surface-variant"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="py-4 px-6 text-on-surface-variant">
        <span
          className={`flex items-center gap-1 ${
            user.isActive ? "text-primary" : "text-error"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: user.isActive
                ? "var(--tw-colors-primary, #271310)"
                : "var(--tw-colors-error, #ba1a1a)",
            }}
          />
          {user.isActive ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="py-4 px-6 text-on-surface-variant">
        {new Date(user.createdAt).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="py-4 px-6 text-on-surface-variant font-medium">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(user.totalSpent)}
      </td>
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleToggleRole}
            disabled={isPendingRole}
            title={`Cambiar a ${
              user.role === UserRole.Admin ? "Usuario" : "Admin"
            }`}
            className="flex items-center justify-center w-36 gap-1 text-sm border border-outline hover:border-primary text-outline hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-surface-variant disabled:opacity-50 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              manage_accounts
            </span>
            <span>{user.role === UserRole.Admin ? "Quitar Admin" : "Hacer Admin"}</span>
          </button>
          <button
            onClick={handleToggleStatus}
            disabled={isPendingStatus}
            title={user.isActive ? "Desactivar" : "Activar"}
            className={`flex items-center justify-center w-36 gap-1 text-sm border px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 cursor-pointer ${
              user.isActive
                ? "border-error/50 text-error hover:bg-error hover:text-on-error"
                : "border-primary/50 text-primary hover:bg-primary hover:text-on-primary"
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              {user.isActive ? "person_off" : "person"}
            </span>
            <span>{user.isActive ? "Desactivar" : "Activar"}</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
