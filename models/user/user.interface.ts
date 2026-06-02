import { Types } from "mongoose";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
