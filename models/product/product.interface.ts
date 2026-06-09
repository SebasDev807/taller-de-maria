import { Types } from "mongoose";
import { ICategory } from "../category/category.interface";

export interface IProduct {
  _id?: Types.ObjectId;
  sku: string;
  price: number;
  description?: string;
  stock: number;
  imageUrls: string[];
  category: Types.ObjectId | ICategory;
  features: string[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
