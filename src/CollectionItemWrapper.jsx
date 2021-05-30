import React from "react";
import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { computeClassName } from "./utilities";

export function CollectionItemWrapper({
  chunk,
  children,
  key,
  className = "",
}) {
  return (
    <ChunkCollectionContext.Provider value={chunk}>
      <div
        className={computeClassName(
          className,
          "chunks-collection-item--wrapper"
        )}
      >
        {children}
      </div>
    </ChunkCollectionContext.Provider>
  );
}
