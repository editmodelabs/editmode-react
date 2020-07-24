import DOMpurify from "dompurify";
import React from "react";
import { Platform, Text } from 'react-native';

export const renderChunk = (cnk, props) => {
  const sanitizedContent = Platform.OS === 'web'
    ? DOMpurify.sanitize(cnk.content)
    : cnk.content;

  let chunk = { ...cnk, content: sanitizedContent };
  switch (chunk.chunk_type) {
    case "single_line_text":
      return Platform.OS === 'web'
        ? (
          <span
            data-chunk={chunk.identifier}
            data-chunk-editable={true}
            data-chunk-content-key={chunk.content_key}
            data-chunk-type="single_line_text"
            key={chunk.identifier}
            {...props}
          >
            {chunk.content}
          </span>)
        : (
          <Text
            data-chunk={chunk.identifier}
            data-chunk-editable={true}
            data-chunk-content-key={chunk.content_key}
            data-chunk-type="single_line_text"
            key={chunk.identifier}
            {...props}
          >
            {chunk.content}
          </Text>);
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
      return Platform.OS === 'web' ? <span {...props}>{chunk.content}</span> : <Text {...props}>{chunk.content}</Text> ;
  }
};
