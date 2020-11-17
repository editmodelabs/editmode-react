// @ts-check

import React from "react";
import { useChunk } from "./useChunk";

export function Chunk({ children, identifier, src, contentKey, ...props }) {
  const type = src ? "image" : undefined;
  const defaultContent = src || children;
  const tag = props.tag || "em-span"
  delete props.tag;

  const chunkProps = getChunkProps(props)
  const { Component } = useChunk(defaultContent, { identifier, type, contentKey, tag });

  if (chunkProps.length) {
    chunkProps.forEach(prop => {
      const key = prop[0];
      const attributeId = prop[1];
      const prefix =  prop[2]
      const raw = prefix === "chunk-"

      const value = useChunk(props[key] || "", {
        identifier: attributeId, 
        type: undefined,
        contentKey: "",
        tag: "em-span"
      })

      props[key] = raw ? value.content : <value.Component />
      delete props[prefix + key]
    });
  }

  return <Component {...props} />
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;

function getChunkProps(obj){
  let str, key, results = [];

  for(key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key.indexOf("chunk-") === 0 || key.indexOf("Chunk-") === 0) {
        str = key.substring(0,6)
        results.push([key.replace(str, ""), obj[key], str ])
      }
    }
  }
  
  return results;
}
