// @ts-check
import React, { useEffect, useState } from "react";

import { api } from "./api";
import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { getCachedData, storeCache } from './utils'

export function ChunkCollection({
  children,
  className,
  identifier,
  limit = "",
  tags = [],
}) {
  const [chunks, setResponse] = useState([]);
  const cacheId = identifier + limit + tags.join("")

  useEffect(() => {
    const urlParams = new URLSearchParams({
      limit,
      collection_identifier: identifier,
    });

    // Render content
    let cachedChunk = getCachedData(cacheId)
    let data = cachedChunk && JSON.parse(cachedChunk)
    setResponse(data)

    tags.map((tag) => urlParams.append("tags[]", tag));

    let error; 
    api
      .get(`chunks?${urlParams}`)
      .then((res) => {
        storeCache(cacheId, res.data.chunks)
        if (!chunks.length) setResponse(res.data.chunks)
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

  return chunks.map((chunk) => (
    <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
      <div data-collection-name={chunk.collection.name} className={className}>
        {children}
      </div>
    </ChunkCollectionContext.Provider>
  ));
}

export default ChunkCollection;
