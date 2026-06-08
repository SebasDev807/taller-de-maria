import { Types } from "mongoose";

/**
 * Interfaz que representa un Evangelio en la base de datos.
 */
export interface IGospel {
  _id?: Types.ObjectId;
  /** Título del evangelio */
  title: string;
  /** Texto completo del evangelio */
  text: string;
  /** Referencia bíblica u origen (opcional) */
  reference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
