import { model, models, Schema } from "mongoose";
import { IGospel } from "./gospel.interface";

if (process.env.NODE_ENV === "development" && models.Gospel) {
  delete models.Gospel;
}

const GospelSchema = new Schema<IGospel>(
  {
    title: {
      type: String,
      required: [true, "El título del evangelio es obligatorio"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "El texto del evangelio es obligatorio"],
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
const Gospel = models.Gospel ?? model<IGospel>("Gospel", GospelSchema);

export default Gospel;
