// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";

import { EditmodeContext } from "./EditmodeContext";
import {
  api,
  renderChunk,
  computeContentKey,
  getCachedData,
  storeCache,
} from "./utilities";

export function useChunk(defaultContent, { identifier, type, contentKey, field }) {
  const { projectId, defaultChunks, branch } = useContext(EditmodeContext);
  let [chunk, setChunk] = useState(undefined);

  if (!contentKey) {
    contentKey = defaultContent ? computeContentKey(defaultContent) : null;
  }

  let cacheId = identifier || contentKey + projectId + field;

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

  useEffect(() => {
    let params = new URL(document.location.href).searchParams;
    const branchId = branch || params.get("em_branch_id") || ""
    const branchParams = branchId && `branch_id=${branchId}` || ""
    let url = `chunks/${identifier || contentKey}?project_id=${projectId}&${branchParams}`;
    if (branchId) cacheId += branchId
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

  // Modify chunk if field is present and chunk_type is collection
  // e.g. <Chunk identifier="identifier_......" field="Title"/>
  if ( chunk && chunk.chunk_type == "collection_item" && field) {
    field = field.toLowerCase();
    const fieldChunk = chunk.content.find(c =>
      c.custom_field_identifier.toLowerCase() == field || c.custom_field_name.toLowerCase() == field
    )
    if (fieldChunk) {
      setChunk(fieldChunk) // This will set chunk to fieldChunk, and will be rendered by line: 92
    } else {
      return {
        Component() {
          return null;
        },
      };
    }
  }

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
