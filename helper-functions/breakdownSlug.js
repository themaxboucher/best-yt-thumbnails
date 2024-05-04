export default function breakdownSlug(slug) {
  // TODO: Check if the function argument is a valid slug

  // Remove leading and trailing slashes, if any
  slug = slug.replace(/^\/+|\/+$/g, "");

  // Split the slug by '/'
  const parts = slug.split("/");

  // Return array of the slugs subfolders
  return parts;
}
