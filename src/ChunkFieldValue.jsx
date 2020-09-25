import React, { useContext } from "react";

import { renderChunk } from "./utils/renderChunk.jsx";
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function ChunkFieldValue({ children, identifier, ...props }) {
  const chunk = useContext(ChunkCollectionContext);

  if (!chunk) {
    return null;
  }

  const fieldChunk = chunk.content.find(
    (chunk) => chunk.custom_field_identifier === identifier || chunk.custom_field_name === identifier
  );

  if (!fieldChunk) {
    console.warn(
      `Could not find field ${identifier} for ${chunk.collection.name}`
    );

    return null;
  }

  return renderChunk(fieldChunk, props);
}

export default ChunkFieldValue;
