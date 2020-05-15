import DOMpurify from "dompurify";
import React from "react";

export const renderChunk = (cnk, cssClass) => {
  let chunk = { ...cnk, content: DOMpurify.sanitize(cnk.content) };
  switch (chunk.chunk_type) {
    case "single_line_text":
      return (
        <span
          data-chunk={chunk.identifier}
          className={cssClass}
          key={chunk.identifier}
        >
          {chunk.content}
        </span>
      );
    case "image":
      return (
        <img
          src={chunk.content}
          alt=""
          className={cssClass}
          key={chunk.identifier}
        />
      );
    default:
      return <span className={cssClass}>{chunk.content}</span>;
  }
};
