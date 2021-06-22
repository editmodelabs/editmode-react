import React, { useEffect, useState } from "react";
import { getCachedData, storeCache } from "./utilities";
import { EditmodeContext } from "./EditmodeContext";
import axios from "axios";

export function useCollectionChunks(identifier, limit = "", tags = []) {
  const { projectId } = useContext(EditmodeContext);
  const [chunks, setChunk] = useState([]);
  const cacheId = identifier + limit + tags.join("");

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://api2.editmode.com/",
      headers: {
        Accept: "application/json",
      },
      params: {
        referrer: window.location.href,
      },
    });
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
