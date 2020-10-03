// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { generateUrl } from './utils'


export function Editmode({ children, projectId, defaultChunks }) {
  const [branch, setbranch] = useState(null)

  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }



  useEffect(() => {
    window["chunksProjectIdentifier"] = projectId;
    const script = document.createElement("script");
    const url = generateUrl('asset')
    script.src = `${url}/editmode@^2.0.0/dist/editmode.js`;
    script.async = true;
    document.body.append(script);

    let params = new URL(document.location.href).searchParams;
    setbranch(params.get("em_branch"));
  }, []);

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
    </EditmodeContext.Provider>
  );
}
export default Editmode;