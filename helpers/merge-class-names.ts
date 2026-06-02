import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClassNames = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
