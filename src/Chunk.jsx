// @ts-check

import React from "react";
import { useChunk } from "./useChunk";

export function Chunk({ children, identifier, src, ...props }) {
  const type = src ? "image" : undefined;
  const defaultContent = src || children;
  const { Component } = useChunk(defaultContent, { identifier, type });

  return <Component {...props} />;
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;
