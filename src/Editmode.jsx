// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import MagicEditor from 'editmode-magic-editor'

export function Editmode({ children, projectId, defaultChunks }) {
  const [branch, setbranch] = useState(null);
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }

  useEffect(() => {
    let params = new URL(document.location.href).searchParams;
    setbranch(params.get("em_branch_id"));
    window["chunksProjectIdentifier"] = projectId;
    MagicEditor.start()
  }, []);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
    </EditmodeContext.Provider>
  );
}
export default Editmode;
