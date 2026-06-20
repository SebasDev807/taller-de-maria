import { Types } from "mongoose";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  role: UserRole;
  phoneNumber?: string;
  totalSpent?: number;
  /** Token UUID enviado por email para confirmar la cuenta. */
  verificationToken?: string | null;
  /** Fecha de expiración del token de verificación (24 horas). */
  verificationTokenExpires?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
