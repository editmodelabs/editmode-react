import React, { useEffect, useState } from "react";
import { api, getCachedData, storeCache } from "./utilities";

export function useCollectionChunk(identifier, limit = "", tags = []) {
  const [chunks, setChunk] = useState([]);
  const cacheId = identifier + limit + tags.join("");

  useEffect(() => {
    const cachedChunk = getCachedData(cacheId);
    if (cachedChunk) {
      const data = JSON.parse(cachedChunk);
      setChunk(data);
    }

    const urlParams = new URLSearchParams({
      limit,
      collection_identifier: identifier,
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

  if (!chunks && !chunks.length) {
    return null;
  }
  return chunks;
}
