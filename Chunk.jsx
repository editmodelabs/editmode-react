import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chunk(props) {
  const { identifier } = props;
  const [chunkData, setChunkData] = useState("");
  const chunkInFocus = useRef("");

  useEffect(() => {
    const cached = localStorage.getItem(identifier);
    if (cached) {
      setChunkData(JSON.parse(cached));
    } else {
      axios
        .get(`https://www.editmode.app/api/v1/chunks/${identifier}`)
        .then((res) => {
          setChunkData(res.data);
          localStorage.setItem(identifier, JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [identifier]);

  const cacheChunk = () => {
    const data = JSON.stringify({
      identifier: `${chunkData.identifier}`,
      content: `${chunkInFocus.current.innerText}`,
      project_identifier: `${chunkData.project_identifier}`,
      custom_fields: `${chunkData.custom_fields}`,
      chunk_type: `${chunkData.chunk_type}`,
      bit_type: `${chunkData.bit_type}`,
      bit: {
        identifier: `${chunkData.identifier}`,
        content: `${chunkInFocus.current.innerText}`,
      },
    });
    localStorage.setItem(`${identifier}`, data);
  };

  return (
    <>
      {chunkData.chunk_type === "plain" ? (
        <span
          className="chunk"
          data-chunk={identifier}
          ref={chunkInFocus}
          suppressContentEditableWarning="true"
          onBlur={cacheChunk}
        >
          {chunkData.content}
        </span>
      ) : null}
      {chunkData.chunk_type === "rich" ? 
        console.log(chunkData.content)
      : null}
    </>
  );
}
