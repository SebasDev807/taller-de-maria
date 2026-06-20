"use server";

import dbConnect from "@/lib/mongodb";
import { Order, Product } from "@/models";
import { getSession } from "@/lib/session";
import { CartItem } from "@/store/shopping-cart";
import { OrderStatus } from "@/models/order/order.interface";

export async function createOrder(items: CartItem[], total: number) {
  const session = await getSession();
  if (!session) throw new Error("Debes iniciar sesión para realizar un pedido.");

  await dbConnect();

  const orderItems = items.map(item => ({
    product: item.id.toString(),
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const order = new Order({
    user: session.userId,
    items: orderItems,
    total: total,
    status: "pending",
  });

  await order.save();
  return { success: true, orderId: order._id.toString() };
}

export async function getOrders() {
  const session = await getSession();
  if (!session) throw new Error("No autorizado");

  await dbConnect();
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).lean();
  
  return orders.map((order: any) => ({
    id: order._id.toString(),
    user: {
      name: order.user?.name || "Usuario Desconocido",
      email: order.user?.email || "Sin Email",
    },
    items: order.items.map((item: any) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  }));
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const session = await getSession();
  if (!session) throw new Error("No autorizado");

  await dbConnect();
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Pedido no encontrado");

  // Restar stock al completar el pedido
  if (status === "completed" && order.status !== "completed") {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }
  }

  // Devolver stock si se cancela o se quita el estado completado
  if (order.status === "completed" && status !== "completed") {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }
  }

  order.status = status;
  await order.save();

  return { success: true };
}

export async function deleteOrder(orderId: string) {
  const session = await getSession();
  if (!session) throw new Error("No autorizado");

  await dbConnect();
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Pedido no encontrado");

  // Devolver stock si estaba completado y se elimina
  if (order.status === "completed") {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }
  }

  await Order.findByIdAndDelete(orderId);
  return { success: true };
}
