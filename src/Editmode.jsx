// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";

export function Editmode({ children, projectId, defaultChunks }) {
  const [branch, setbranch] = useState(null);

  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }

  useEffect(() => {
    window["chunksProjectIdentifier"] = projectId;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/editmode-magic-editor@^0/dist/magic-editor.js";
    document.body.append(script);

    let params = new URL(document.location.href).searchParams;
    setbranch(params.get("em_branch_id"));
  }, []);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
    </EditmodeContext.Provider>
  );
}
export default Editmode;
