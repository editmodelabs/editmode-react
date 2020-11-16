// @ts-check

import React, {useEffect} from "react";
import { useChunk } from "./useChunk";

export function Chunk({ children, identifier, src, contentKey, ...props }) {
  const type = src ? "image" : undefined;
  const defaultContent = src || children;
  const tag = props.tag || "em-span"
  delete props.tag;

  const customProps = getCustomProps(props)
  const { Component } = useChunk(defaultContent, { identifier, type, contentKey, tag });

  if (customProps.length) {
    customProps.forEach(prop => {
      const key = prop[0];
      const attributeId = prop[1];
      const value = useChunk("", {
        identifier: attributeId, 
        type: null,
        contentKey: null,
        tag: null
      }, true)
      props[key] = value
      delete props["chunk-" + key]
    });
  }

  return <Component {...props} />
}

// Here for backwards-compatibility, but named exports are preferred
export default Chunk;


function getCustomProps(obj, str = "chunk-"){
  var key, results = [];

  for(key in obj) obj.hasOwnProperty(key) 
               && key.indexOf(str) === 0 
               && results.push([key.replace(str, ""), obj[key] ]);
  return results;
}
