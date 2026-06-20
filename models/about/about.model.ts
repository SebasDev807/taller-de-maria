import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  title: string;
  history: string;
  address: string;
  contact: string;
  schedule: string;
  pillars: string[];
}

const aboutSchema: Schema<IAbout> = new Schema(
  {
    title: { type: String, required: true },
    history: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    schedule: { type: String, required: true },
    pillars: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", aboutSchema);

export default About;
