import { Document, Types } from "mongoose";

export interface ISavedReading extends Document {
  slug: string;
  title?: string;
  text: string;
  reference?: string;
  userId: Types.ObjectId;
  type: "prayer" | "gospel";
  createdAt: Date;
  updatedAt: Date;
}
