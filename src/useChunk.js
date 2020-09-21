// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";

import { api } from "./api";
import { EditmodeContext } from "./EditmodeContext";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";
import { Platform, AsyncStorage } from 'react-native';

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
  let chunk = cachedChunk ? JSON.parse(cachedChunk) : fallbackChunk || defaultContent
  if (chunk) {
    return {
      Component(props) {
        return renderChunk(chunk, props)
      },
      content: chunk.content
    };
  }
}

const getCachedData = (id) => {
  if(Platform.OS === 'web') {
    return localStorage.getItem(id);
  } else {
    const fetchChunk = async () => {
      try {
        return await AsyncStorage.getItem(id);
      } catch (error) {
        console.log('Error in fetching chunk.', error);
      }
    };
  }
  return false
}

const storeCache = (id, data) => {
    // Store Data
    if(Platform.OS === 'web') {
      localStorage.setItem(id, JSON.stringify(data));
    } else {
      const storeChunk = async () => {
        try {
          await AsyncStorage.setItem(
            id,
            JSON.stringify(data)
          );
        } catch (error) {
          console.log('Error in saving chunk.', error);
        }
      }
    }
}