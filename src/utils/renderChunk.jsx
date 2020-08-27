import DOMpurify from "dompurify";
import React from "react";

export const renderChunk = (cnk, props) => {
  let chunk = { ...cnk, content: DOMpurify.sanitize(cnk.content) };
  let tokens = chunk.content.match(/\{{(.*?)\}}/g);

  let parsedChunk = chunk.content;

  if (tokens !== null) {
    tokens.forEach(function(token) {
      parsedChunk = parsedChunk.replace(token, props.variables[token.substr(2, token.length-4)]);
    });
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return <em-span
        data-chunk={chunk.identifier}
        data-chunk-editable={true}
        data-chunk-content-key={chunk.content_key}
        data-chunk-type={chunk.chunk_type}
        key={chunk.identifier}
        {...props}
      >
        {parsedChunk}
      </em-span>
    case "rich_text":
      return <em-span
        class="editmode-richtext-editor"
        data-chunk={chunk.identifier}
        data-chunk-editable={true}
        data-chunk-content-key={chunk.content_key}
        data-chunk-type="rich_text"
        key={chunk.identifier}
        dangerouslySetInnerHTML={{__html: parsedChunk}}
        {...props}
      >
      </em-span>
    case "image":
      return <img
        src={chunk.content}
        data-chunk={chunk.identifier}
        data-chunk-editable={false}
        data-chunk-content-key={chunk.content_key}
        data-chunk-type="image"
        alt=""
        key={chunk.identifier}
        {...props}
      />
    default:
        return <span {...props}>{parsedChunk}</span>
  }
};
