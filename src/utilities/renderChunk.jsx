import React from "react";
import { sanitizeContent, transformImage } from './'

export const renderChunk = (data, props) => {
  const { chunk, parsedChunk } = sanitizeContent(data, props)
  const transformation = props.transformation
  if (transformation && chunk.chunk_type == 'image') {
    chunk.content = transformImage(chunk.content, transformation)
    console.log(transformImage(chunk.content, transformation))
  }

  const defaultprops = {
    "data-chunk": chunk.identifier,
    "data-chunk-editable": true,
    "data-chunk-content-key": chunk.content_key,
    "data-chunk-type": chunk.chunk_type,
    "key": chunk.identifier,
    class: props.className
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return (<em-span
        {...defaultprops}
        dangerouslySetInnerHTML={{__html: parsedChunk}}
        {...props}
      />);
    case "rich_text":
      return (<em-span
        {...defaultprops}
        dangerouslySetInnerHTML={{__html: parsedChunk}}
        {...props}
        class={"editmode-richtext-editor " + props.className}
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
      return <span {...props}>{parsedChunk}</span>;
  }
};
