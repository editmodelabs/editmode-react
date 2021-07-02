import React from "react";
import { sanitizeContent, transformImage } from './'
import SVG from 'react-inlinesvg';

export const renderChunk = (data, props) => {
  const { chunk, parsedChunk } = sanitizeContent(data, props)
  const transformation = props.transformation
  if (transformation && chunk.chunk_type == 'image') {
    chunk.content = transformImage(chunk.content, transformation)
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
      if (isSvg(chunk.content)) {
        return <SVG 
          {...defaultprops}
          src={chunk.content}
          data-chunk-editable={false}
          alt=""
          wrapper="svg"
          {...props}
         />
      } else if (chunk.content) {
        return (<img
          {...defaultprops}
          src={chunk.content}
          data-chunk-editable={false}
          alt=""
          {...props}
        />);
      } else {
        return (
          <svg 
            {...defaultprops}
            data-chunk-editable={false}
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
          </svg>
        )
      }
    default:
      return <span {...props}>{parsedChunk}</span>;
  }
};

function isSvg(url) {
  return(url.match(/\.(svg)/) != null);
}