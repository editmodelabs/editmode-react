// @ts-check
import React, { useEffect } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { Platform } from 'react-native';

export function Editmode({ children, projectId }) {
  console.log('React Native Platform:', Platform);

  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }

  useEffect(() => {
    window["chunksProjectIdentifier"] = projectId;

    const script = document.createElement("script");
    script.src = "https://static.editmode.com/editmode@^1.0.0/dist/editmode.js";
    script.async = true;
    document.body.append(script);
  }, []);

  let params = new URL(document.location.href).searchParams;
  let branch = params.get("em_branch");

  return (
    <EditmodeContext.Provider value={{ branch, projectId }}>
      {children}
    </EditmodeContext.Provider>
  );
}
export default Editmode;
