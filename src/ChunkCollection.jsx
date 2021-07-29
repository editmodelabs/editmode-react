// @ts-check
import React, { useEffect, useState, useContext } from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { EditmodeContext } from "./EditmodeContext";
import { getCachedData, storeCache, computeClassName, api } from "./utilities";

export function ChunkCollection({
  children,
  className,
  identifier,
  limit = "",
  tags = [],
  itemClass = "",
  contentKey = null,
}) {
  const [chunks, setChunk] = useState([]);
  const cacheId = identifier + limit + tags.join("");
  const { projectId, branch, defaultChunks } = useContext(EditmodeContext);

  useEffect(() => {
    const collection_chunks = defaultChunks.filter(
      (chunk) =>
        (chunk.collection && chunk.collection.identifier == identifier) ||
        (chunk.collection && chunk.collection.name == identifier)
    );
    setChunk(collection_chunks);
  }, [identifier]);

  if (!chunks?.length) {
    return null;
  }
  const placeholderChunk = chunks.length
    ? { ...chunks[0], placeholder: true }
    : {};

  function getChunk(chunk, field) {
    const fieldChunk = chunk.content.find((c) => c.custom_field_name == field);
    if (fieldChunk && typeof fieldChunk !== "undefined") {
      return fieldChunk.content;
    } else {
      return "";
    }
  }

  return (
    <div
      className={computeClassName(className, "chunks-collection-wrapper")}
      data-chunk-cache-id={cacheId}
      data-chunk-collection-identifier={identifier}
      data-chunk-tags={tags ? tags.join("|") : ""}
    >
      {chunks.map((chunk, index) => (
        <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
          <div
            className={computeClassName(
              itemClass,
              "chunks-collection-item--wrapper"
            )}
          >
            {typeof children === "function"
              ? children(getChunk, chunk, index)
              : children}
          </div>
        </ChunkCollectionContext.Provider>
      ))}
      {chunks.length && (
        <ChunkCollectionContext.Provider
          key={chunks[0].identifier + "dummy"}
          value={placeholderChunk}
        >
          <template
            className={computeClassName(
              itemClass,
              "chunks-col-placeholder-wrapper"
            )}
          >
            {typeof children === "function"
              ? children(getChunk, placeholderChunk, 0)
              : children}
          </template>
        </ChunkCollectionContext.Provider>
      )}
    </div>
  );
}

export default ChunkCollection;
