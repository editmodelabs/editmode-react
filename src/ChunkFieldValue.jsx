import React, { useContext } from "react";

import { renderChunk } from "./utils";
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

  let dummyFieldChunk;
  if (chunk && chunk.placeholder) {
    dummyFieldChunk = {...fieldChunk, 
      identifier: "",
      content: fieldChunk.chunk_type === 'image' ? 'http://lvh.me:3001/upload.png' : ""
    }
    if (dummyFieldChunk.chunk_type === 'rich_text') {
      props.style ? props.style['width'] = "100px" : props.style = {minWidth: "200px"}
    }
  }

  if (chunk && fieldChunk) props = {...props, "data-parent-identifier": chunk.identifier, 'data-custom-field-identifier': fieldChunk.custom_field_identifier }
  return renderChunk(dummyFieldChunk || fieldChunk, props);
}

export default ChunkFieldValue;
