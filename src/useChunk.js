import { useContext, useEffect, useState, useMemo } from "react";

import { EditmodeContext } from "./EditmodeContext";
import { renderChunk, computeContentKey } from "./utilities";

export function useChunk(
  defaultContent,
  { identifier, type, contentKey, field }
) {
  const { projectId, defaultChunks, branch } = useContext(EditmodeContext);
  let [chunk, setChunk] = useState(undefined);

  if (!contentKey) {
    contentKey = defaultContent ? computeContentKey(defaultContent) : null;
  }

  let cacheId = identifier || contentKey + projectId + field;

  useEffect(() => {
    let fallbackChunk;
    if (identifier) {
      fallbackChunk = defaultChunks.find((chunkItem) => {
        return chunkItem.identifier === identifier;
      });
    } else {
      fallbackChunk = defaultChunks.find(
        (chunkItem) =>
          chunkItem.content_key === contentKey &&
          chunkItem.project_id == projectId
      );
    }
    setChunk(fallbackChunk);
  }, [cacheId, branch]);

  // Modify chunk if field is present and chunk_type is collection
  // e.g. <Chunk identifier="identifier_......" field="Title"/>
  if (chunk && chunk.chunk_type == "collection_item" && field) {
    field = field.toLowerCase();
    const fieldChunk = chunk.content.find(
      (c) =>
        c.custom_field_identifier.toLowerCase() == field ||
        c.custom_field_name.toLowerCase() == field
    );
    if (fieldChunk) {
      setChunk(fieldChunk); // This will set chunk to fieldChunk, and will be rendered by line: 92
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
        return renderChunk(chunk, props, cacheId);
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
