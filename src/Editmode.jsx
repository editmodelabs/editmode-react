// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { getTimedCachedData, storeTimedCache } from "./utilities";
import { api } from "./utilities";
import Watermark from "./Watermark.jsx";

export function Editmode({ children, projectId, defaultChunks }) {
  const [branch, setbranch] = useState(null);
  const [hasWaterMark, setHasWaterMark] = useState(null);
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }
  const cacheId = projectId + "_provider";
  useEffect(() => {
    window["chunksProjectIdentifier"] = projectId;
    window["chunksAppFramework"] = "reactjs"
    const cachedItem = getTimedCachedData(cacheId);
    if (cachedItem) window["chunksProjectLoaded"] = true;
    const script = document.createElement("script");

    script.src = "https://unpkg.com/editmode-magic-editor@^0/dist/magic-editor.js";
    document.body.append(script);

    let params = new URL(document.location.href).searchParams;
    setbranch(params.get("em_branch_id"));

    if (!cachedItem) {
      api
        .get(`/projects/${projectId}`)
        .then((res) => {
          storeTimedCache(cacheId, res.data);
          const project = res.data;
          if (project.has_watermark) {
            setHasWaterMark(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const project = cachedItem;
      if (project.has_watermark) setHasWaterMark(true);
    }
  }, []);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      { children }
      { hasWaterMark && <Watermark projectId={projectId}/> }
    </EditmodeContext.Provider>
  );
}

export default Editmode;
