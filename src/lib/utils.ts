import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizePolishString = (str: string) => {
  return str
    .split('(')[0] // Remove everything after "("
    .trim() // Clean up trailing spaces
    .normalize('NFD') // Decompose characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/ł/g, 'l') // Fix for ł
    .replace(/Ł/g, 'L')
    .replace(/\//g, '') // Escape forward slashes
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .toLowerCase()
}
