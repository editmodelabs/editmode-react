import React, { useContext } from "react";

import { renderChunk } from "./utilities";
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function ChunkFieldValue({ children, identifier, transformation, ...props }) {
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

  const dummyFieldChunk = chunk?.placeholder && ({
    ...fieldChunk,
    identifier: '',
    content: fieldChunk.chunk_type === 'image'
      ? 'https://editmode.com/upload.png'
      : "",
  })

  if (chunk && fieldChunk) {
    props = {...props, "data-parent-identifier": chunk.identifier, 'data-custom-field-identifier': fieldChunk.custom_field_identifier }
  }
  return renderChunk(dummyFieldChunk || fieldChunk, props);
}

export default ChunkFieldValue;
