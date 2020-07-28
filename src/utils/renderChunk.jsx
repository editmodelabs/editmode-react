import DOMpurify from "dompurify";
import React from "react";

export const renderChunk = (cnk, props) => {
  let chunk = { ...cnk, content: DOMpurify.sanitize(cnk.content) };
  switch (chunk.chunk_type) {
    case "single_line_text":
      return (
        <em-span
          data-chunk={chunk.identifier}
          data-chunk-editable={true}
          data-chunk-content-key={chunk.content_key}
          data-chunk-type="single_line_text"
          key={chunk.identifier}
          {...props}
        >
          {chunk.content}
        </em-span>
      );
    case "rich_text":
      return (
        <em-span
          class="editmode-richtext-editor"
          data-chunk={chunk.identifier}
          data-chunk-editable={true}
          data-chunk-content-key={chunk.content_key}
          data-chunk-type="rich_text"
          key={chunk.identifier}
          dangerouslySetInnerHTML={{__html: chunk.content}}
          {...props}
        >
        </em-span>
      )
    case "image":
      return (
        <img
          src={chunk.content}
          data-chunk={chunk.identifier}
          data-chunk-editable={false}
          data-chunk-content-key={chunk.content_key}
          data-chunk-type="image"
          alt=""
          key={chunk.identifier}
          {...props}
        />
      );
    default:
      return <span {...props}>{chunk.content}</span>;
  }
};
