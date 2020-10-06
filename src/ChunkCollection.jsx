// @ts-check
import React, { useEffect, useState } from "react";

import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { api, getCachedData, storeCache } from './utils'

export function ChunkCollection({
  children,
  className,
  identifier,
  limit = "",
  tags = [],
  itemClass = "",
}) {
  const [chunks, setResponse] = useState([]);
  const cacheId = identifier + limit + tags.join("")

  useEffect(() => {
    // Get data from localStorage
    let cachedChunk = getCachedData(cacheId)
    let data = cachedChunk && JSON.parse(cachedChunk)
    if (data) setResponse(data)

    const urlParams = new URLSearchParams({
      limit,
      collection_identifier: identifier,
    });

    tags.map((tag) => urlParams.append("tags[]", tag));

    let error; 
    api
      .get(`chunks?${urlParams}`)
      .then((res) => {
        storeCache(cacheId, res.data.chunks)
        if (!data) setResponse(res.data.chunks)
      })
      .catch((error) => error = error);
    
    if (error) {
      console.log(
        `Something went wrong trying to retrieve chunk collection: ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
      );
    }
  }, [identifier]);

  if (!chunks || !chunks.length) {
    return <>children</>;
  }
  
  const placeholderChunk = ( chunks.length && {...chunks[0], placeholder: true} ) || {}

  return (
    <div className={className + " chunks-collection-wrapper"} data-chunk-cache-id={cacheId} data-chunk-collection-identifier={identifier}>
      {
        chunks.map((chunk) => (
          <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
            <div className="chunks-collection-item--wrapper">
              {children}
            </div>
          </ChunkCollectionContext.Provider>
        ))
      }
      {
        chunks.length &&
          <ChunkCollectionContext.Provider key={chunks[0].identifier + "dummy"} value={placeholderChunk}>
            <div className={itemClass + " chunks-col-placeholder-wrapper chunks-hide"}>
              {children}
            </div>
          </ChunkCollectionContext.Provider>
      }
      
    </div>
  )
}

export default ChunkCollection;
