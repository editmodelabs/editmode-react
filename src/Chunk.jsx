import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chunk(props) {
  const { chunk_type, identifier, children } = props;
  const [chunkData, setChunkData] = useState("");
  const chunkInFocus = useRef("");

  useEffect(() => {
    axios
      .get(`https://www.editmode.app/api/v1/chunks/${identifier}`)
      .then((res) => {
        localStorage.setItem(identifier, JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
    setChunkData(JSON.parse(localStorage.getItem(identifier)));
  }, [identifier]);


  return (
    <>
      {chunk_type === "single_line_text" ? (
        <span
          className="chunk"
          data-chunk={identifier}
          ref={chunkInFocus}
          contentEditable="true"
          suppressContentEditableWarning="true"
        >
          {chunkData ? chunkData.content : children}
        </span>
      ) : null}
    </>
  );
}
