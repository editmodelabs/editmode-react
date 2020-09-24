// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";

import { api } from "./api";
import { EditmodeContext } from "./EditmodeContext";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";

export function useChunk(defaultContent, { identifier, type }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [[error, response], setResponse] = useState([undefined, undefined]);
  const contentKey = defaultContent ? computeContentKey(defaultContent) : null;
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
  const url = identifier
    ? `chunks/${identifier}`
    : `chunks/${contentKey}?project_id=${projectId}`;

  useEffect(() => {
    api
      .get(url)
      .then((res) => storeCache(cacheId, res.data)) // Store chunk to localstorage
      .catch((error) => setResponse([error, null])); // Set error state
  }, [url]);

  if (error && identifier) {
    console.warn(
      `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier}) as a prop to your Chunk component instance?`
    );
  }

  // Render content
  let cachedChunk = getCachedData(cacheId)
  let chunk = cachedChunk ? JSON.parse(cachedChunk) : fallbackChunk
  if (chunk) {
    return {
      Component(props) {
        return renderChunk(chunk, props)
      },
      content: chunk.content
    };
  } else {
    return {
      Component(props) {
        return renderChunk(
          {
            chunk_type: type || "single_line_text",
            content: defaultContent,
            content_key: contentKey,
          },
          props
        );
      },
      content: defaultContent,
    };
  }
}

const getCachedData = (id) => {
  return localStorage.getItem(id);
}

const storeCache = (id, data) => {
  localStorage.setItem(id, JSON.stringify(data));
}