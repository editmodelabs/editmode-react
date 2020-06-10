// @ts-check

import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Context } from "./Context";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";

const api = axios.create({
  baseURL: "https://api.editmode.com/",
  headers: {
    Accept: "application/json",
  },
});

export function useChunk(defaultContent, { identifier }) {
  const [chunk, setChunk] = useState(null);
  const { branch, projectId } = useContext(Context);
  const contentKey = computeContentKey(defaultContent);

  useEffect(() => {
    const url = identifier
      ? `chunks/${identifier}`
      : `chunks/${contentKey}?project_id=${projectId}`;

    api
      .get(url)
      .then((res) => {
        setChunk(res.data);
      })
      .catch((err) =>
        console.log(
          `Something went wrong trying to retrieve chunk data: ${err}.Have you provided the correct Editmode identifier as a prop to your Chunk component instance?`
        )
      );
  }, [branch, defaultContent, identifier]);

  // TODO What about other content types (e.g. collection, image, etc.?)
  // Possibilities are:
  // - <Chunk type={Editmode.IMAGE_CHUNK} />
  // - useChunk(defaultContent, { identifier: "123", type: Editmode.IMAGE_CHUNK })
  // - <ImageChunk>
  // - useChunkCollection / useChunkImage / useChunkCollection
  if (!chunk) {
    return {
      content: defaultContent,
      element: renderChunk({
        chunk_type: "single_line_text",
        content: defaultContent,
        content_key: contentKey,
      }),
    };
  }

  return {
    content: chunk.content,
    element: renderChunk(chunk),
  };
}
