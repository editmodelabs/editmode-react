// @ts-check
import React from "react";
export function CustomCollection({
  chunks,
  className,
  children,
  identifier,
  tags = [],
  limit = "",
}) {
  const cacheId = identifier + limit + tags.join("");
  return (
    <div
      className={
        className
          ? className + " chunks-collection-wrapper"
          : "chunks-collection-wrapper"
      }
      data-chunk-cache-id={cacheId}
      data-chunk-collection-identifier={identifier}
    >
      {children}
    </div>
  );
}
