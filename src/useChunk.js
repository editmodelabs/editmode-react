// @ts-check
import { useContext, useMemo } from "react";
import useSWR from 'swr';

import { api } from "./api";
import { EditmodeContext } from "./EditmodeContext";
import { renderChunk } from "./utils/renderChunk.jsx";
import { computeContentKey } from "./utils/computeContentKey";

export function useChunk(defaultContent, { identifier, type }) {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const contentKey = defaultContent ? computeContentKey(defaultContent) : null;
  const fallbackChunk = useMemo(
    () => defaultChunks.find(chunkItem => chunkItem.identifier === identifier),
    [defaultChunks, identifier]
  );
  const url = identifier
    ? `chunks/${identifier}`
    : `chunks/${contentKey}?project_id=${projectId}`;
  const SWROptions = {
    revalidateOnFocus: false,
    initialData: fallbackChunk
  };
  const { data: chunk, error } = useSWR(url, (url) => api.get(url).then((res) => res.data), SWROptions);

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
            chunk_type: type || "single_line_text",
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

  return {
    Component(props) {
      return renderChunk(chunk, props);
    },
    content: chunk.content,
  };
}
