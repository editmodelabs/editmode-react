import { storeCache, getCachedData, api } from "./utilities";
import { EditmodeContext } from "./EditmodeContext";
import { useEffect, useState, useContext, useMemo } from "react";

export const useGetChunk = (identifier, field = "") => {
  const { projectId, defaultChunks } = useContext(EditmodeContext);
  const [project, setProject] = useState(projectId);
  const [chunk, setChunk] = useState(undefined);

  console.log(identifier);
  const cacheId = identifier + project + field;
  console.log("ARGHH");
  let fallbackChunk;
  if (typeof defaultChunks !== "undefined") {
    fallbackChunk = useMemo(() => {
      if (identifier) {
        return defaultChunks.find((chunkItem) => {
          console.log(chunkItem);
          return chunkItem.identifier === identifier;
        });
      } else {
        return defaultChunks.find(
          (chunkItem) =>
            chunkItem.content_key === contentKey &&
            chunkItem.project_id == projectId
        );
      }
    }, [defaultChunks, identifier]);
  }

  useEffect(() => {
    if (!project && window["chunksProjectIdentifier"]) {
      setProject(window["chunksProjectIdentifier"]);
    }

    setChunk("DDDD", fallbackChunk);

    let url = `chunks/${identifier}?project_id=${project}`;

    // api
    //   .get(url)
    //   .then((res) => {
    //     const error = res.data.error || res.data.message;
    //     if (!error) {
    //       storeCache(cacheId, res.data);
    //       if (!cachedChunk) setChunk(res.data);
    //     }
    //   })
    //   .catch((error) => console.error(error, identifier, field)); // Set error state
  }, [cacheId]);

  console.log(chunk);
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
