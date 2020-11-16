// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";

import { EditmodeContext } from "./EditmodeContext";
import { api, renderChunk, computeContentKey, getCachedData, storeCache } from './utils'

export function useChunk(defaultContent, { identifier, type, contentKey, tag }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [chunk, setChunk] = useState({
    chunk_type: type || "single_line_text",
    content: defaultContent || "",
    content_key: contentKey
  });

   if (!contentKey)  {
     contentKey = defaultContent ? computeContentKey(defaultContent) : null;
   }

  const cacheId = identifier || contentKey + projectId;

  let fallbackChunk;
  if (typeof defaultChunks !== 'undefined') {
    fallbackChunk = useMemo(
      () => {
        if (identifier) {
          return defaultChunks.find(chunkItem => chunkItem.identifier === identifier);
        } else {
          return defaultChunks.find(chunkItem => chunkItem.content_key === contentKey && chunkItem.project_id == projectId);
        }
      },
      [defaultChunks, identifier]
    );
  }

  const url = `chunks/${identifier || contentKey}?project_id=${projectId}`;

  useEffect(() => {
    let cachedChunk = getCachedData(cacheId)
    let newChunk = cachedChunk ? JSON.parse(cachedChunk) : fallbackChunk
    if (newChunk) setChunk(newChunk)

    // Fetch new data
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data)
        if (!cachedChunk) setChunk(res.data)
      }) // Store chunk to localstorage
      .catch((error) => {
        if (identifier) {
          console.warn(
            `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier}) as a prop to your Chunk component instance?`
          );
        }
      });
  }, [cacheId]);



  if (chunk) {
    return {
      Component: props => {
        return renderChunk(chunk, tag, props)
      },
      content: chunk.content
    };
  }
}