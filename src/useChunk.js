// @ts-check
import { useContext, useEffect, useState } from "react";

import { api } from "./api";
import { EditmodeContext } from "./EditmodeContext";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";

export function useChunk(defaultContent, { identifier }) {
  const { projectId } = useContext(EditmodeContext);
  const [[error, chunk], setResponse] = useState([undefined, undefined]);
  const contentKey = defaultContent ? computeContentKey(defaultContent) : null;

  const url = identifier
    ? `chunks/${identifier}`
    : `chunks/${contentKey}?project_id=${projectId}`;

  useEffect(() => {
    api
      .get(url)
      .then((res) => setResponse([null, res.data]))
      .catch((error) => setResponse([error, null]));
  }, [url]);

  if (error) {
    if (identifier) {
      console.warn(
        `Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier}) as a prop to your Chunk component instance?`
      );
    }

    return {
      Component(props) {
        return renderChunk(
          {
            chunk_type: "single_line_text",
            content: defaultContent,
            content_key: contentKey,
          },
          props
        );
      },
      content: defaultContent,
    };
  }

  if (!chunk) {
    return {
      Component() {
        return null;
      },
      content: defaultContent,
    };
  }

  // TODO What about other content types (e.g. collection, image, etc.?)
  // Possibilities are:
  // - <Chunk type={Editmode.IMAGE_CHUNK} />
  // - useChunk(defaultContent, { identifier: "123", type: Editmode.IMAGE_CHUNK })
  // - <ImageChunk>
  // - useChunkCollection / useChunkImage / useChunkCollection
  return {
    Component(props) {
      return renderChunk(chunk, props);
    },
    content: chunk.content,
  };
}
