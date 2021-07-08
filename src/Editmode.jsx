// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { getTimedCachedData, storeTimedCache } from "./utilities";
import { api } from "./utilities";
import Watermark from "./Watermark.jsx";
import { useHotkeys } from "react-hotkeys-hook";

export function Editmode({ children, projectId, defaultChunks, branchId }) {
  const [branch, setbranch] = useState("");
  const [hasWaterMark, setHasWaterMark] = useState(null);
  const [isEditorActive, setIsEditorActive] = useState(false);

  useHotkeys("cmd+shift+e", () => {
    setIsEditorActive(!isEditorActive);
  });
  console.log(isEditorActive);
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }
  const cacheId = projectId + "_provider";
  useEffect(() => {
    let params = new URL(document.location.href).searchParams;
    let queryParams = new URLSearchParams(window.location.search);
    branchId ? setbranch(branchId) : setbranch(params.get("em_branch_id"));
    setIsEditorActive(window.location.href.indexOf("editmode") > -1);

    if (branchId && isEditorActive) {
      queryParams.set("em_branch_id", `${branchId}`);
      history.pushState(null, null, "?" + queryParams.toString());
    }

    window["chunksProjectIdentifier"] = projectId;
    window["chunksAppFramework"] = "reactjs";
    const cachedItem = getTimedCachedData(cacheId);
    if (cachedItem) window["chunksProjectLoaded"] = true;
    const script = document.createElement("script");

    script.src =
      "https://unpkg.com/editmode-magic-editor@^0/dist/magic-editor.js";
    document.body.append(script);

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
  }, [branch, isEditorActive]);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
      {hasWaterMark && <Watermark projectId={projectId} />}
    </EditmodeContext.Provider>
  );
}

export default Editmode;
