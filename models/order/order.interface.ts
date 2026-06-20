import mongoose, { Document } from "mongoose";

export type OrderStatus = "pending" | "cancelled" | "completed";

export interface IOrderItem {
  product: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | string;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
