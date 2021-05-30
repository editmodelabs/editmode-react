import React from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function CollectionItemWrapper({ chunk, children, className = "" }) {
  return (
    <ChunkCollectionContext.Provider value={chunk}>
      <div
        className={
          className
            ? className + " chunks-collection-item--wrapper"
            : "chunks-collection-item--wrapper"
        }
      >
        {children}
      </div>
    </ChunkCollectionContext.Provider>
  );
}
