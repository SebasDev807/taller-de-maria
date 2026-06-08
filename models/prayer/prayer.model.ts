import { model, models, Schema } from "mongoose";
import { IPrayer } from "./prayer.interface";

if (process.env.NODE_ENV === "development" && models.Prayer) {
  delete models.Prayer;
}

const PrayerSchema = new Schema<IPrayer>(
  {
    text: {
      type: String,
      required: [true, "El texto de la oración es obligatorio"],
      trim: true,
    },
    reference: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Evita el error "Cannot overwrite model once compiled" en Next.js
const Prayer = models.Prayer ?? model<IPrayer>("Prayer", PrayerSchema);

export default Prayer;
