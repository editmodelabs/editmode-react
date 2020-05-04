import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Chunk(props) {
  const { identifier, children } = props;
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
      {chunk_type === "plain" ? (
        <span
          className="chunk"
          data-chunk={identifier}
          ref={chunkInFocus}
          suppressContentEditableWarning="true"
        >
          {chunkData ? chunkData.content : children}
        </span>
      ) : null}
    </>
  );
}
