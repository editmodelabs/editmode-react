// @ts-check
import React, { useEffect } from "react";
import { BranchContext } from "./BranchContext";

function Editmode({ children, projectId }) {
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
  let em_branch = params.get("em_branch");

  return (
    <BranchContext.Provider value={{ em_branch }}>
      {children}
    </BranchContext.Provider>
  );
}
export default Editmode;
