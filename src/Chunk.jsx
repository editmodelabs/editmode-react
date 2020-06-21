// @ts-check

import React from "react";
import { useChunk } from "./useChunk";

export function Chunk({ children, identifier, ...props }) {
  const { Component } = useChunk(children, { identifier });

  return <Component {...props} />;
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;
