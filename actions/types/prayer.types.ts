import { IPrayer } from "@/models/prayer/prayer.interface";

/** Datos de la oración expuestos por las Server Actions. */
export type PrayerData = Pick<IPrayer, "text" | "reference">;

/** Datos de la oración incluidos en el historial. */
export interface PrayerHistoryData extends PrayerData {
  id: string;
  /** Fecha de la última actualización (ISO string). */
  updatedAt: string;
}
