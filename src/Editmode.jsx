// @ts-check
import React, { useEffect } from "react";
import { Context } from "./Context";

export function Editmode({ children, projectId }) {
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }

  useEffect(() => {
    window["chunksProjectIdentifier"] = "prj_yvskxAScvL8x";

    const script = document.createElement("script");
    script.src = "https://static.editmode.com/editmode@^1.0.0/dist/editmode.js";
    script.async = true;
    document.body.append(script);
  }, []);

  let params = new URL(document.location.href).searchParams;
  let branch = params.get("em_branch");

  return (
    <Context.Provider value={{ branch, projectId }}>
      {children}
    </Context.Provider>
  );
}
export default Editmode;
