import React, { useContext } from "react";
import { renderChunk } from "./utils/renderChunk.jsx";
import { CollectionContext } from "./ChunkCollection.jsx";

import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function ChunkFieldValue({ children, className, identifier }) {
  const chunk = useContext(ChunkCollectionContext);

  if (!chunk) {
    return null;
  }

  const fieldChunk = chunk.content.find(
    (chunk) => chunk.custom_field_identifier === identifier
  );

  if (!fieldChunk) {
    console.warn(
      `Could not find field ${identifier} for ${chunk.collection.name}`
    );

    return null;
  }

  return renderChunk(fieldChunk, className);
}

export default ChunkFieldValue;
