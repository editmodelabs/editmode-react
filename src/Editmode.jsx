// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { getCachedData, storeCache } from "./utilities";
import { api } from "./utilities";
import Watermark from "./Watermark.jsx";

export function Editmode({ children, projectId, defaultChunks }) {
  const [branch, setbranch] = useState(null);
  const [hasWaterMark, setHasWaterMark] = useState(null);
  const [cachedData, setCachedData] = useState(null);
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }
  const cacheId = projectId + "_provider";
  useEffect(() => {
    const cachedItem = getCachedData(cacheId);
    const data = JSON.parse(cachedItem);
    window["chunksProjectIdentifier"] = projectId;

    const script = document.createElement("script");
    script.src = "http://localhost:10001/magic-editor.js";
    document.body.append(script);

    let params = new URL(document.location.href).searchParams;
    setbranch(params.get("em_branch_id"));

    if (!data) {
      api
        .get(`/projects/${projectId}`)
        .then((res) => {
          storeCache(cacheId, res.data);
          const project = res.data;
          if (project.has_watermark) {
            setHasWaterMark(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const project = data;
      if (project.has_watermark) setHasWaterMark(true);
    }
  }, []);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
      {hasWaterMark && <Watermark />}
    </EditmodeContext.Provider>
  );
}
export default Editmode;
