"use server";

import dbConnect from "@/lib/mongodb";
import { About } from "@/models";
import { aboutSchema } from "./schemas";
import type { ActionResult, AboutData } from "./types";
import { revalidatePath } from "next/cache";

export async function getAboutConfig(): Promise<ActionResult<AboutData | null>> {
  try {
    await dbConnect();
    const about = await About.findOne().lean();

    if (!about) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: {
        title: about.title,
        history: about.history,
        address: about.address,
        contact: about.contact,
        schedule: about.schedule,
        pillars: about.pillars,
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}

export async function updateAboutConfig(formData: FormData): Promise<ActionResult<AboutData>> {
  const pillarsString = formData.get("pillars")?.toString() || "";
  const pillarsArray = pillarsString.split("\n").map(p => p.trim()).filter(p => p !== "");

  const validated = aboutSchema.safeParse({
    title: formData.get("title"),
    history: formData.get("history"),
    address: formData.get("address"),
    contact: formData.get("contact"),
    schedule: formData.get("schedule"),
    pillars: pillarsArray,
  });

  if (!validated.success) {
    const firstError = validated.error.issues[0]?.message ?? "Datos inválidos";
    return { success: false, error: firstError };
  }

  const { title, history, address, contact, schedule, pillars } = validated.data;

  try {
    await dbConnect();

    const about = await About.findOne();

    if (about) {
      about.title = title;
      about.history = history;
      about.address = address;
      about.contact = contact;
      about.schedule = schedule;
      about.pillars = pillars;
      await about.save();
    } else {
      await About.create({ title, history, address, contact, schedule, pillars });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/settings");
    revalidatePath("/admin/settings/about");

    return {
      success: true,
      data: { title, history, address, contact, schedule, pillars },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error inesperado.";
    return { success: false, error: message };
  }
}
