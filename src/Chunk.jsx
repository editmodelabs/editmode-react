// @ts-check

import { useChunk } from "./useChunk";

export function Chunk({ children, className, identifier }) {
  const chunk = useChunk(children, { identifier });

  return chunk.element;
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;
