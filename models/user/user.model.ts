import { model, models, Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(UserRole),
        message: `El rol debe ser uno de: ${Object.values(UserRole).join(", ")}`,
      },
      default: UserRole.User,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    /** Token UUID para verificar la cuenta por email. */
    verificationToken: {
      type: String,
      default: null,
    },
    /** Fecha de expiración del token (24 horas desde el registro). */
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Evita el error "Cannot overwrite model once compiled" en Next.js
const User = models.User ?? model<IUser>("User", UserSchema);

export default User;
