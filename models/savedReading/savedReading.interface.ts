import { Document, Types } from "mongoose";

export interface ISavedReading extends Document {
  title?: string;
  text: string;
  reference?: string;
  userId: Types.ObjectId;
  type: "prayer" | "gospel";
  createdAt: Date;
  updatedAt: Date;
}
