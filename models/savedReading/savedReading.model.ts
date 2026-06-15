import { model, models, Schema } from "mongoose";
import { ISavedReading } from "./savedReading.interface";

if (process.env.NODE_ENV === "development" && models.SavedReading) {
  delete models.SavedReading;
}

const SavedReadingSchema = new Schema<ISavedReading>(
  {
    slug: {
      type: String,
      required: [true, "El slug es obligatorio"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: [true, "El texto es obligatorio"],
      trim: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID de usuario es obligatorio"],
    },
    type: {
      type: String,
      enum: ["prayer", "gospel"],
      required: [true, "El tipo de lectura es obligatorio"],
    },
  },
  {
    timestamps: true,
  }
);

const SavedReading = models.SavedReading ?? model<ISavedReading>("SavedReading", SavedReadingSchema);

export default SavedReading;
