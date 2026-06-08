import { IGospel } from "@/models/gospel/gospel.interface";

/** Datos del evangelio expuestos por las Server Actions. */
export type GospelData = Pick<IGospel, "title" | "text" | "reference">;

export interface GospelHistoryData extends GospelData {
  id: string;
  createdAt: string;
}
