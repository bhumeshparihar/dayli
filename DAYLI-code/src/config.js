// Public brand settings; Vite embeds VITE_ variables in the client build.
export const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";
const instagram = import.meta.env.VITE_INSTAGRAM_URL || "";
export const instagramUrl = /^https:\/\/(www\.)?instagram\.com\//.test(
  instagram,
)
  ? instagram
  : "";
const count = import.meta.env.VITE_JOINED_COUNT;
export const joinedCount = count && /^\d+$/.test(count) ? Number(count) : null;
