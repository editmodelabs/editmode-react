import { EditmodeContext } from "./EditmodeContext";
import { useEffect, useState, useContext, useMemo } from "react";

export const useGetChunk = (identifier, field = "") => {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [chunk, setChunk] = useState(undefined);

  useEffect(() => {
    let fallbackChunk;
    if (identifier) {
      fallbackChunk = defaultChunks.find((chunkItem) => {
        console.log(chunkItem);
        return chunkItem.identifier === identifier;
      });
    } else {
      fallbackChunk = defaultChunks.find(
        (chunkItem) =>
          chunkItem.content_key === contentKey &&
          chunkItem.project_id == projectId
      );
    }
    setChunk(fallbackChunk);
  }, []);

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
