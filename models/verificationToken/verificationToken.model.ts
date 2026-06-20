import { model, models, Schema, Types } from "mongoose";
import { IVerificationToken } from "./verificationToken.interface";

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El userId es obligatorio"],
      unique: true, // 1:1 — un token por usuario
    },
    token: {
      type: String,
      required: [true, "El token es obligatorio"],
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "La fecha de expiración es obligatoria"],
    },
  },
  {
    timestamps: true,
  }
);

// TTL index: MongoDB elimina automáticamente el documento cuando expira
VerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationToken =
  models.VerificationToken ??
  model<IVerificationToken>("VerificationToken", VerificationTokenSchema);

export default VerificationToken;
