// @ts-check
import React, { useEffect, useState, useContext } from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { EditmodeContext } from "./EditmodeContext";
import { getCachedData, storeCache, computeClassName } from "./utilities";
import axios from "axios";
const isBrowser = () => typeof window !== "undefined";

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
  const { projectId } = useContext(EditmodeContext);

  useEffect(() => {
    // Get data from localStorage
    const api = axios.create({
      baseURL: "https://api2.editmode.com/",
      headers: {
        Accept: "application/json",
        "referrer": isBrowser() ? window.location.href : ""
      }
    });
    const cachedChunk = getCachedData(cacheId);
    if (cachedChunk) {
      const data = JSON.parse(cachedChunk);
      setChunk(data);
    }

    const urlParams = new URLSearchParams({
      limit,
      collection_identifier: identifier || contentKey,
      project_id: projectId,
    });

    tags.forEach((tag) => urlParams.append("tags[]", tag));

    api
      .get(`chunks?${urlParams}`)
      .then((res) => {
        storeCache(cacheId, res.data.chunks);
        if (!cachedChunk) setChunk(res.data.chunks);
      })
      .catch((error) => {
        console.error(
          `Something went wrong trying to retrieve chunk collection: ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
        );
      });
  }, [identifier]);

  if (!chunks?.length) {
    return null;
  }
  const placeholderChunk = chunks.length
    ? { ...chunks[0], placeholder: true }
    : {};
  console.log(chunks);
  return (
    <div
      className={computeClassName(className, "chunks-collection-wrapper")}
      data-chunk-cache-id={cacheId}
      data-chunk-collection-identifier={identifier}
    >
      {chunks.map((chunk) => (
        <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
          <div
            className={computeClassName(
              itemClass,
              "chunks-collection-item--wrapper"
            )}
          >
            {children}
          </div>
        </ChunkCollectionContext.Provider>
      ))}
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

export default ChunkCollection;
