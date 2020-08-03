import React from "react";
import { Text, Image } from 'react-native';

export const renderChunk = (cnk, props) => {
  let chunk = { ...cnk, content: cnk.content };
  switch (chunk.chunk_type) {
    case "single_line_text":
      return (
        <Text
          key={chunk.identifier}
          {...props}
        >
          {chunk.content}
        </Text>
      );
    case "image":
      return (
        <Image
          source={{
            uri: 'https:' + chunk.content,
            isStatic: true,
          }}
        />
      );
    default:
      return <Text {...props}>{chunk.content}</Text>;
  }
};
