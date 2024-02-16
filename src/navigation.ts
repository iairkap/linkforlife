import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "he", "es"]; // Tus locales
export const localePrefix = "always"; // Prefijo del locale

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
