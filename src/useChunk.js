// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

import { EditmodeContext } from "./EditmodeContext";
import {
  renderChunk,
  computeContentKey,
  getCachedData,
  storeCache,
} from "./utilities";

export function useChunk(defaultContent, { identifier, type, contentKey }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [chunk, setChunk] = useState(undefined);

  if (!contentKey) {
    contentKey = defaultContent ? computeContentKey(defaultContent) : null;
  }

  const cacheId = identifier || contentKey + projectId;

  let fallbackChunk;
  if (typeof defaultChunks !== "undefined") {
    fallbackChunk = useMemo(() => {
      if (identifier) {
        return defaultChunks.find(
          (chunkItem) => chunkItem.identifier === identifier
        );
      } else {
        return defaultChunks.find(
          (chunkItem) =>
            chunkItem.content_key === contentKey &&
            chunkItem.project_id == projectId
        );
      }
    }, [defaultChunks, identifier]);
  }

  let url = `chunks/${identifier || contentKey}?project_id=${projectId}`;

  useEffect(() => {
    // Render content
    const api = axios.create({
      baseURL: "https://api2.editmode.com/",
      headers: {
        Accept: "application/json",
      },
      params: {
        referrer: window.location.href,
      },
    });

    let cachedChunk = getCachedData(cacheId);
    let newChunk = cachedChunk
      ? JSON.parse(cachedChunk)
      : fallbackChunk || {
          chunk_type: type || "single_line_text",
          content: defaultContent,
          content_key: contentKey,
        };

    if (newChunk) setChunk(newChunk);

    // Fetch new data
    let error;
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data);
        if (!cachedChunk) setChunk(res.data);
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
        return renderChunk(chunk, props);
      },
      content: chunk.content,
    };
  } else {
    return {
      Component() {
        return null;
      },
    };
  }
}
