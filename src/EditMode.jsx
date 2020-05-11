import React from "react";

export default function Editmode(props) {
  let script = document.createElement("script");
  script.src = "https://www.editmode.app/assets/chunks.js";
  script.async = true;
  document.body.append(script);

  return (
    <>
      {/* {console.log(window.location.search === "?editmode=1")} */}

      {props.children}
    </>
  );
}
