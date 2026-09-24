import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/** Published posts, newest first. Same-day posts fall back to title order. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() ||
      a.data.title.localeCompare(b.data.title),
  );
}

// Dates are parsed from "YYYY-MM-DD" as UTC midnight, so format in UTC too or
// US timezones would show the previous day.
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
