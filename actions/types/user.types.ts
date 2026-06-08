import { IUser } from "@/models/user/user.interface";

/** Datos requeridos para crear un usuario nuevo. */
export type CreateUserInput = Pick<IUser, "name" | "email" | "password"> &
  Partial<Pick<IUser, "role">>;
