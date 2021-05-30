import { ChunkCollectionContext } from "./ChunkCollectionContext";
export function CustomCollection({
  chunks,
  className,
  children,
  identifier,
  tags = [],
  limit = "",
}) {
  const cacheId = identifier + limit + tags.join("");
  return (
    <div
      className={
        className
          ? className + " chunks-collection-wrapper"
          : "chunks-collection-wrapper"
      }
      data-chunk-cache-id={cacheId}
      data-chunk-collection-identifier={identifier}
    >
      {chunks.map((chunk) => (
        <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
          <div className="chunks-collection-item--wrapper">{children}</div>
        </ChunkCollectionContext.Provider>
      ))}
      {chunks.length && (
        <ChunkCollectionContext.Provider
          key={chunks[0].identifier + "dummy"}
          value={placeholderChunk}
        >
          <div
            className={
              itemClass + " chunks-col-placeholder-wrapper chunks-hide"
            }
          >
            {children}
          </div>
        </ChunkCollectionContext.Provider>
      )}
    </div>
  );
}
