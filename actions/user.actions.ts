"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { mockUsers } from "@/models/user/user.seed";
import { hashPassword } from "@/helpers";
import { revalidatePath } from "next/cache";
import type { ActionResult, CreateUserInput } from "./types";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/**
 * Crea un usuario nuevo en la base de datos.
 * Si no se indica `role`, se asigna `UserRole.User` por defecto.
 */
export async function createUser(
  input: CreateUserInput
): Promise<ActionResult<{ id: string; email: string; role: UserRole }>> {
  try {
    await dbConnect();

    const existing = await User.findOne({ email: input.email.toLowerCase() });
    if (existing) {
      return { success: false, error: "Ya existe un usuario con ese email." };
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await User.create({
      name: input.name.trim(),
      email: input.email.toLowerCase().trim(),
      password: hashedPassword,
      role: input.role ?? UserRole.User,
      phoneNumber: input.phoneNumber?.trim(),
    });

    return {
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Inserta los usuarios mock (seed) en la base de datos.
 * Omite los emails que ya existen para evitar duplicados.
 */
export async function seedUsers(): Promise<
  ActionResult<{ inserted: number; skipped: number }>
> {
  try {
    await dbConnect();

    let inserted = 0;
    let skipped = 0;

    for (const mockUser of mockUsers) {
      const existing = await User.findOne({
        email: mockUser.email.toLowerCase(),
      });

      if (existing) {
        skipped++;
        continue;
      }

      const hashedPassword = await hashPassword(mockUser.password);

      await User.create({
        ...mockUser,
        password: hashedPassword,
      });

      inserted++;
    }

    return { success: true, data: { inserted, skipped } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

/**
 * Obtiene todos los usuarios ordenados por fecha de creación descendente.
 * Retorna objetos planos de JavaScript seguros para Client Components.
 */
export async function getUsers(): Promise<
  ActionResult<
    Array<{
      id: string;
      name: string;
      email: string;
      role: UserRole;
      isActive: boolean;
      phoneNumber?: string;
      createdAt: string;
    }>
  >
> {
  try {
    await dbConnect();
    const users = await User.find().sort({ createdAt: -1 }).lean();

    const plainUsers = users.map((u: any) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role as UserRole,
      isActive: u.isActive ?? false,
      phoneNumber: u.phoneNumber,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
    }));

    return { success: true, data: plainUsers };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al obtener usuarios.";
    return { success: false, error: message };
  }
}

/**
 * Alterna el estado (isActive) de un usuario.
 * Simula un "soft delete" si se desactiva.
 */
export async function toggleUserStatus(userId: string): Promise<ActionResult<{ isActive: boolean }>> {
  try {
    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, error: "Usuario no encontrado." };
    }

    const newStatus = !user.isActive;
    await User.updateOne({ _id: userId }, { $set: { isActive: newStatus } });
    
    revalidatePath("/admin/users");

    return { success: true, data: { isActive: newStatus } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al actualizar estado.";
    return { success: false, error: message };
  }
}

/**
 * Alterna el rol de un usuario entre admin y user.
 */
export async function toggleUserRole(userId: string): Promise<ActionResult<{ role: UserRole }>> {
  try {
    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, error: "Usuario no encontrado." };
    }

    const newRole = user.role === UserRole.Admin ? UserRole.User : UserRole.Admin;
    await User.updateOne({ _id: userId }, { $set: { role: newRole } });

    revalidatePath("/admin/users");

    return { success: true, data: { role: newRole } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al actualizar rol.";
    return { success: false, error: message };
  }
}
