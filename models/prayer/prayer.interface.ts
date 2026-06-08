import { Types } from "mongoose";

/**
 * Interfaz que representa una Oración en la base de datos.
 */
export interface IPrayer {
  _id?: Types.ObjectId;
  /** Texto completo de la oración */
  text: string;
  /** Referencia o fuente de la oración (opcional) */
  reference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
