import React from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function CollectionItemWrapper({
  chunk,
  children,
  key,
  className = "",
}) {
  return (
    <ChunkCollectionContext.Provider value={chunk}>
      <div className={computeClassName(className)}>{children}</div>
    </ChunkCollectionContext.Provider>
  );
}

function computeClassName(className) {
  className = className
    ? className + " chunks-collection-item--wrapper"
    : "chunks-collection-item--wrapper";
  return className;
}
