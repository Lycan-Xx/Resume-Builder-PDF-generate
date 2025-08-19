// @ts-ignore
import { clsx } from "clsx"
// @ts-ignore  
import { twMerge } from "tailwind-merge"

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}