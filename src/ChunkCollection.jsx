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
  // const { collection } = useCollectionData(["Featured Projects"]);
  const { projectId, branch } = useContext(EditmodeContext);

  useEffect(() => {
    // Get data from localStorage
    const cachedChunk = getCachedData(cacheId);
    if (cachedChunk) {
      const data = JSON.parse(cachedChunk);
      setChunk(data);
    }
    let params = new URL(document.location.href).searchParams;
    const branchId = branch || params.get("em_branch_id") || "";
    const urlParams = new URLSearchParams({
      limit,
      collection_identifier: identifier || contentKey,
      project_id: projectId,
      branch_id: branchId,
    });

    tags.forEach((tag) => urlParams.append("tags[]", tag));

    if (!cachedChunk) {
      api
        .get(`chunks?${urlParams}`)
        .then((res) => {
          if (res.data.error) throw res.data.error;
          storeCache(cacheId, res.data.chunks);
          if (!cachedChunk) setChunk(res.data.chunks);
        })
        .catch((error) => {
          console.error(
            `Something went wrong trying to retrieve chunk collection: ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
          );
        });
    }
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
