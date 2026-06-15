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
  isActive?: boolean;
  role: UserRole;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
