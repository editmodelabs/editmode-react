// @ts-check
import React from "react";
import { BranchContext } from "./BranchContext";

function Editmode(props) {
  let script = document.createElement("script");
  script.src = "https://www.editmode.app/assets/chunks.js";
  script.async = true;
  document.body.append(script);

  let params = new URL(document.location.href).searchParams;
  let em_branch = params.get("em_branch");

  return (
    <BranchContext.Provider value={{ em_branch }}>
      {props.children}
    </BranchContext.Provider>
  );
}
export default Editmode;
