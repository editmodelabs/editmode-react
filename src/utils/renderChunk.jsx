import DOMpurify from "dompurify";
import React from "react";

export const renderChunk = (cnk, cssClass) => {
  let chunk = { ...cnk, content: DOMpurify.sanitize(cnk.content) };
  switch (chunk.chunk_type) {
    case "single_line_text":
      return (
        <span
          data-chunk={chunk.identifier}
          data-chunk-editable={true}
          data-chunk-content-key={chunk.content_key}
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
          data-chunk={chunk.identifier}
          data-chunk-editable={false}
          alt=""
          className={cssClass}
          key={chunk.identifier}
        />
      );
    default:
      return <span className={cssClass}>{chunk.content}</span>;
  }
};
