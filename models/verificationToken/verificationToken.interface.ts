import { Types } from "mongoose";

export interface IVerificationToken {
  _id?: Types.ObjectId;
  /** Referencia al usuario al que pertenece este token (relación 1:1). */
  userId: Types.ObjectId;
  /** UUID generado aleatoriamente para el enlace de verificación. */
  token: string;
  /** Fecha de expiración (24 horas desde la creación). */
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
