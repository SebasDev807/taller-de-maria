import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPillar {
  icon: string;
  title: string;
  description: string;
}

export interface IAbout extends Document {
  title: string;
  history: string;
  address: string;
  contact: string;
  schedule: string;
  pillars: IPillar[];
}

const pillarSchema = new Schema<IPillar>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const aboutSchema: Schema<IAbout> = new Schema(
  {
    title: { type: String, required: true },
    history: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    schedule: { type: String, required: true },
    pillars: { type: [pillarSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", aboutSchema);

export default About;
