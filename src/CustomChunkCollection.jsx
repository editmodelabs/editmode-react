// @ts-check
import React from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { computeClassName } from "./utilities";

export function CustomChunkCollection({
  chunks,
  className,
  children,
  identifier,
  tags = [],
  limit = "",
  itemClass = "",
}) {
  const cacheId = identifier + limit + tags.join("");
  const placeholderChunk = chunks.length
    ? { ...chunks[0], placeholder: true }
    : {};

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
      {children}
      {chunks.length && (
        <ChunkCollectionContext.Provider
          key={chunks[0].identifier + "dummy"}
          value={placeholderChunk}
        >
          <div
            className={computeClassName(
              itemClass,
              "chunks-col-placeholder-wrapper chunks-hide"
            )}
          >
            {children}
          </div>
        </ChunkCollectionContext.Provider>
      )}
    </div>
  );
}
