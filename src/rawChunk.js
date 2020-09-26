import { useContext } from 'react'
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export const rawChunk = (identifier, ...props) => {
  const collectionChunk = useContext(ChunkCollectionContext);

  if (collectionChunk) {
    const fieldChunk = chunk.content.find(
      (chunk) => chunk.custom_field_identifier === identifier || chunk.custom_field_name === identifier
    );
  }

  console.log(props, collectionChunk)
}