// @ts-check
import { useContext, useEffect, useState, useMemo, Component } from "react";

import { EditmodeContext } from "./EditmodeContext";
import { api, renderChunk, computeContentKey, getCachedData, storeCache, sanitizeContent } from './utilities'

export function useChunk(defaultContent, { identifier, type, contentKey, variables }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [chunk, setChunk] = useState(undefined);

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
  console.log(url)
  useEffect(() => {
    // Render content
    let cachedChunk = getCachedData(cacheId)
    let newChunk;
    if (cachedChunk) {
      let dataChunk = JSON.parse(cachedChunk);
      const parsedChunk = sanitizeContent(dataChunk, variables, fallbackChunk)

      newChunk = parsedChunk;
    } else if (fallbackChunk) {
      newChunk = fallbackChunk;
    } else {
      newChunk = {
        chunk_type: type || "single_line_text",
        content: defaultContent,
        content_key: contentKey
      }
    }

    if (newChunk) setChunk(newChunk)

    // Fetch new data
    let error;
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data)
        if (!cachedChunk) {
          const parsedChunk = sanitizeContent(res.data, variables, fallbackChunk)
          setChunk(parsedChunk)
        }
      }) // Store chunk to localstorage
      .catch((error) => console.log(error)); // Set error state

    if (error && identifier) {
      console.warn(
        `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier}) as a prop to your Chunk component instance?`
      );
    }
  }, [cacheId]);

  

  if (chunk) {
    return {
      Component(props) {
        return renderChunk(chunk, props)
      },
      content: chunk.content
    };
  } else {
    return {
      Component() {
        return null
      }
    }
  }
}