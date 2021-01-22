import React from "react";

export const renderChunk = (chunk, props) => {
  // const { chunk, content } = sanitizeContent(data, props)
  const content = chunk.content

  const defaultprops = {
    "data-chunk": chunk.identifier,
    "data-chunk-editable": true,
    "data-chunk-content-key": chunk.content_key,
    "data-chunk-type": chunk.chunk_type,
    "key": chunk.identifier
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return (<em-span
        {...defaultprops}
        dangerouslySetInnerHTML={{__html: content}}
        {...props}
      />);
    case "rich_text":
      return (<em-span
        {...defaultprops}
        class="editmode-richtext-editor"
        dangerouslySetInnerHTML={{__html: content}}
        {...props}
      />);
    case "image":
      return (<img
        {...defaultprops}
        src={chunk.content}
        data-chunk-editable={false}
        alt=""
        {...props}
      />);
    default:
      return <span {...props}>{content}</span>;
  }
};
