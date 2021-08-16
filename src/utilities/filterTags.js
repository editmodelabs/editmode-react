export const filterByTag = (
  /** @type {any[]} */ chunks,
  /** @type {any[]} */ filters
) => {
  return chunks.filter((chunk) =>
    filters.every(
      (tag) => chunk.collection && chunk.tags && chunk.tags.includes(tag)
    )
  );
};
