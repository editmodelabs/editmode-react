import { storeCache, getCachedData, api, tryParse } from "./utilities";
import { EditmodeContext } from "./EditmodeContext";
import { useEffect, useState, useContext } from "react";

export const useGetChunk = (identifier, field = "", fallback = "") => {
  const { projectId, defaultChunks, next } = useContext(EditmodeContext);
  const [project, setProject] = useState(projectId);
  const [chunk, setChunk] = useState(undefined);

  const cacheId = identifier + project + field;

  useEffect(() => {
    let fallbackChunk;
    if (!next) {
      if (!project && window["chunksProjectIdentifier"]) {
        setProject(window["chunksProjectIdentifier"]);
      }

      const cachedChunk = getCachedData(cacheId);
      const newChunk = cachedChunk && tryParse(cachedChunk) || {
        chunk_type: "single_line_text",
        content: fallback,
      }
      setChunk(newChunk)

      let url = `chunks/${identifier}?project_id=${project}`;

      api
        .get(url)
        .then((res) => {
          const error = res.data.error || res.data.message;
          if (!error) {
            storeCache(cacheId, res.data);
            if (!cachedChunk) setChunk(res.data);
          }
        })
        .catch((error) => console.error(error, identifier, field));
    } else if (next && defaultChunks) {
      if (identifier) {
        fallbackChunk = defaultChunks.find((chunkItem) => {
          return (
            chunkItem.content_key === identifier ||
            chunkItem.identifier === identifier
          );
        });
      } else {
        fallbackChunk = defaultChunks.find(
          (chunkItem) =>
            chunkItem.content_key === contentKey &&
            chunkItem.project_id == projectId
        );
      }
      setChunk(fallbackChunk);
    }
  }, [cacheId, defaultChunks]);

  if (field && chunk && chunk.chunk_type == "collection_item") {
    field = field.toLowerCase();
    const fieldChunk = chunk.content.find(
      (c) =>
        c.custom_field_identifier.toLowerCase() == field ||
        c.custom_field_name.toLowerCase() == field
    );
    if (fieldChunk) {
      setChunk(fieldChunk);
    } else {
      console.error(
        `We can't find a ${identifier} content with ${field} field`
      );
      return "";
    }
  }

  return (chunk && chunk.content) || "";
};
