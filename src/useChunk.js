// @ts-check

import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { BranchContext } from "./BranchContext";
import { renderChunk } from "./utils/renderChunk.jsx";

export function useChunk(defaultContent, { identifier }) {
  const [chunk, setChunk] = useState(null);
  const branch = useContext(BranchContext);

  useEffect(() => {
    axios
      .get(`https://www.editmode.app/api/v1/chunks/${identifier}`, branch)
      .then((res) => {
        setChunk(res.data);
      })
      .catch((err) =>
        console.log(
          `Something went wrong trying to retrieve chunk data: ${err}.Have you provided the correct Editmode identifier as a prop to your Chunk component instance?`
        )
      );
  }, [branch, defaultContent, identifier]);

  if (!chunk) {
    return {
      content: defaultContent,
      element: defaultContent,
    };
  }

  return {
    content: chunk.content,
    element: renderChunk(chunk),
  };
}
