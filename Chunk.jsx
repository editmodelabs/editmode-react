import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chunk(props) {
  const { label, identifier } = props;
  const [chunkContent, setChunkContent] = useState(label);
  const chunkInFocus = useRef("");

  useEffect(() => {
    const cached = localStorage.getItem(identifier);
    if (cached) {
      setChunkContent(cached);
    } else {
      axios
        .get(`https://www.editmode.app/api/v1/chunks/${identifier}`)
        .then((res) => {
          setChunkContent(res.data.content);
          cacheChunk(res.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const cacheChunk = (content) => {
    localStorage.setItem(identifier, content);
  }

  return (
    <span
      className="chunk"
      data-chunk={identifier}
      ref={chunkInFocus}
      contentEditable="true"
      suppressContentEditableWarning="true"
      onBlur={() => cacheChunk(chunkInFocus.current.innerText)}
    >
      {chunkContent}
    </span>
  );
}
