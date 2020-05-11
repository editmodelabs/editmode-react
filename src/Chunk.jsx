import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chunk(props) {
  const { identifier, children } = props;
  const [chunkData, setChunkData] = useState("");
  const chunkRef = useRef();

  useEffect(() => {
    axios
      .get(`https://www.editmode.app/api/v1/chunks/${identifier}`)
      .then(res => {
        localStorage.setItem(identifier, JSON.stringify(res.data));
        setChunkData(res.data);
      })
      .catch(err => console.log("err"));
  }, [identifier]);

  return (
    <>
      {(chunkData && chunkData.chunk_type === "single_line_text") ||
      (JSON.parse(localStorage.getItem(identifier)) &&
        JSON.parse(localStorage.getItem(identifier)).chunk_type ===
          "single_line_text") ? (
        <span className="em-chunk" data-chunk={identifier} ref={chunkRef}>
          {chunkData
            ? chunkData.content
            : JSON.parse(localStorage.getItem(identifier))
            ? JSON.parse(localStorage.getItem(identifier)).content
            : children}
        </span>
      ) : (
        <span>{children}</span>
      )}
    </>
  );
}
