import type { MetadataRoute } from "next";

// TODO(confirm): replace with the real production domain once decided.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homekeep.com";

const publicRoutes = [
  "/",
  "/plans",
  "/contractors",
  "/cheat-sheet",
  "/app",
  "/terms",
  "/privacy",
  "/signup",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
