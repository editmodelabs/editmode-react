// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";

import { api } from "./api";
import { EditmodeContext } from "./EditmodeContext";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";
import { Platform, AsyncStorage } from 'react-native';

export function useChunk(defaultContent, { identifier, type }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [[error, chunk], setResponse] = useState([undefined, undefined]);
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
      .then((res) => setResponse([null, res.data]))
      .catch((error) => setResponse([error, null]));
  }, [url]);

  if (error) {
    if (identifier) {
      console.warn(
        `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier}) as a prop to your Chunk component instance?`
      );
    }

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

  if (!chunk) {
    let cachedChunk;
    // Fetch Data
    if(Platform.OS === 'web') {
      cachedChunk = localStorage.getItem(cacheId);
    } else {
      const fetchChunk = async () => {
        try {
          cachedChunk = await AsyncStorage.getItem(cacheId);
        } catch (error) {
          console.log('Error in fetching chunk.', error);
        }
      };
    }
    if (cachedChunk) {
      return {
        Component() {
          return null;
        },
        content: cachedChunk,
      };
    } else if (fallbackChunk) {
      return {
        Component() {
          return null;
        },
        content: fallbackChunk,
      };
    } else if (defaultContent) {
      return {
        Component() {
          return null;
        },
        content: defaultContent,
      };
    }
  } else {
    // Store Data
    if(Platform.OS === 'web') {
      localStorage.setItem(cacheId, JSON.stringify(chunk));
    } else {
      const storeChunk = async () => {
        try {
          await AsyncStorage.setItem(
            chunk.identifier,
            JSON.stringify(chunk)
          );
        } catch (error) {
          console.log('Error in saving chunk.', error);
        }
      }
    }
  }

  return {
    Component(props) {
      return renderChunk(chunk, props);
    },
    content: chunk.content,
  };
}
