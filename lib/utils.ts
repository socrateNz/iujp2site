import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const SetImageUrl = (url: string): string => {
  return `${process.env.NEXT_PUBLIC_API?.substring(0, process.env.NEXT_PUBLIC_API?.length-4)}${url.replace(/\\\//g, '/')}`
}