"use server";

import dbConnect from "@/lib/mongodb";
import { Cart } from "@/models";
import { Product } from "@/models";
import { getSession } from "@/lib/session";
import { CartItem } from "@/store/shopping-cart";

export async function getCart(): Promise<CartItem[]> {
  const session = await getSession();
  if (!session) return [];

  await dbConnect();
  const cart = await Cart.findOne({ user: session.userId }).populate({
    path: "items.product",
    model: Product
  }).lean();
  if (!cart) return [];

  return cart.items.map((item: any) => ({
    id: item.product._id.toString(),
    name: item.product.name,
    description: item.product.description || "",
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.imageUrls?.[0] || "",
    alt: item.product.name,
    stock: item.product.stock || 0
  }));
}

export async function syncCart(localItems: CartItem[]): Promise<CartItem[]> {
  const session = await getSession();
  if (!session) return localItems;

  await dbConnect();
  let cart = await Cart.findOne({ user: session.userId });

  if (!cart) {
    cart = new Cart({ user: session.userId, items: [] });
  }

  // Fusionar carritos (se suman cantidades)
  for (const localItem of localItems) {
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === localItem.id.toString()
    );
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += localItem.quantity;
    } else {
      cart.items.push({ product: localItem.id.toString(), quantity: localItem.quantity });
    }
  }

  await cart.save();
  return getCart();
}

export async function addToCart(productId: string, quantity: number): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await dbConnect();
  let cart = await Cart.findOne({ user: session.userId });

  if (!cart) {
    cart = new Cart({ user: session.userId, items: [{ product: productId, quantity }] });
  } else {
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
}

export async function updateCartItem(productId: string, delta: number): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await dbConnect();
  const cart = await Cart.findOne({ user: session.userId });
  if (!cart) return;

  const existingItemIndex = cart.items.findIndex(
    (item: any) => item.product.toString() === productId
  );
  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += delta;
    if (cart.items[existingItemIndex].quantity <= 0) {
      cart.items.splice(existingItemIndex, 1);
    }
    await cart.save();
  }
}

export async function removeFromCart(productId: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await dbConnect();
  const cart = await Cart.findOne({ user: session.userId });
  if (!cart) return;

  cart.items = cart.items.filter(
    (item: any) => item.product.toString() !== productId
  );
  await cart.save();
}

export async function clearCart(): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await dbConnect();
  const cart = await Cart.findOne({ user: session.userId });
  if (!cart) return;

  cart.items = [];
  await cart.save();
}
