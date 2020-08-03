import DOMpurify from "dompurify";
import React from "react";
import { Platform, Text, Image } from 'react-native';

export const renderChunk = (cnk, props) => {
  const sanitizedContent = Platform.OS === 'web'
    ? DOMpurify.sanitize(cnk.content)
    : cnk.content;

  let chunk = { ...cnk, content: sanitizedContent };
  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return Platform.OS === 'web'
        ? (<em-span
            data-chunk={chunk.identifier}
            data-chunk-editable={true}
            data-chunk-content-key={chunk.content_key}
            data-chunk-type={chunk.chunk_type}
            key={chunk.identifier}
            {...props}
          >
            {chunk.content}
          </em-span>)
        : (<Text
            key={chunk.identifier}
            {...props}
          >
            {chunk.content}
          </Text>);
    case "rich_text":
      return Platform.OS === 'web'
        ? (<em-span
            class="editmode-richtext-editor"
            data-chunk={chunk.identifier}
            data-chunk-editable={true}
            data-chunk-content-key={chunk.content_key}
            data-chunk-type="rich_text"
            key={chunk.identifier}
            dangerouslySetInnerHTML={{__html: chunk.content}}
            {...props}
          >
          </em-span>)
        : null;
    case "image":
      return Platform.OS === 'web'
        ? (<img
            src={chunk.content}
            data-chunk={chunk.identifier}
            data-chunk-editable={false}
            data-chunk-content-key={chunk.content_key}
            data-chunk-type="image"
            alt=""
            key={chunk.identifier}
            {...props}
          />)
        : (<Image
              source={{
                uri: 'https:' + chunk.content,
                isStatic: true,
              }}
            />);
    default:
      return Platform.OS === 'web'
        ? <span {...props}>{chunk.content}</span>
        : <Text {...props}>{chunk.content}</Text>;
  }
};
