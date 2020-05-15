import React from "react";
export const BranchContext = React.createContext();

function Editmode(props) {
  let script = document.createElement("script");
  script.src = "https://www.editmode.app/assets/chunks.js";
  script.async = true;
  document.body.append(script);

  let params = new URL(document.location).searchParams;
  let em_branch = params.get("em_branch");

  return (
    <BranchContext.Provider value={{ em_branch }}>
      {props.children}
    </BranchContext.Provider>
  );
}
export default Editmode;