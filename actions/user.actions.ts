"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { UserRole } from "@/models/user/user.interface";
import { mockUsers } from "@/models/user/user.seed";
import { hashPassword } from "@/helpers";
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
