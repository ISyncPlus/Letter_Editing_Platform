export const sanitizeFilename = (rawTitle) => {
  const finalTitle = rawTitle.trim() === "" ? "Untitled Document" : rawTitle.trim();
  const cleaned = finalTitle.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-").toLowerCase();
  return cleaned || "document";
};
