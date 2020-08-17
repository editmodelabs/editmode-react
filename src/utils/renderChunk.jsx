import DOMpurify from "dompurify";
import React from "react";
import { Platform, Text, Image } from 'react-native';

export const renderChunk = (cnk, props) => {
  const sanitizedContent = Platform.OS === 'web'
    ? DOMpurify.sanitize(cnk.content)
    : cnk.content;

  let chunk = { ...cnk, content: sanitizedContent };
  let tokens = chunk.content.match(/\{{(.*?)\}}/g);

  let parsedChunk = chunk.content;

  if (tokens !== null) {
    tokens.forEach(function(token) {
      parsedChunk = parsedChunk.replace(token, props.variable[token.substr(2, token.length-4)]);
    });
  }

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
            {parsedChunk}
          </em-span>)
        : (<Text
            key={chunk.identifier}
            {...props}
          >
            {parsedChunk}
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
            dangerouslySetInnerHTML={{__html: parsedChunk}}
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
        ? <span {...props}>{parsedChunk}</span>
        : <Text {...props}>{parsedChunk}</Text>;
  }
};
