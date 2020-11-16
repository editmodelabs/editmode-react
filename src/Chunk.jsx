// @ts-check

import React, {useEffect} from "react";
import { useChunk } from "./useChunk";

export function Chunk({ children, identifier, src, contentKey, ...props }) {
  const type = src ? "image" : undefined;
  const defaultContent = src || children;
  const tag = props.tag || "em-span"
  delete props.tag;
  const { Component } = useChunk(defaultContent, { identifier, type, contentKey, tag });

  return <Component {...props} />
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;
