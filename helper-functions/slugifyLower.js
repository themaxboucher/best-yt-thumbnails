import slugify from "slugify";

// Slugify string and make it lowercase
export default function slugifyLower(string) {
  return slugify(string, { lower: true });
}
