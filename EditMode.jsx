import React from "react";
import * as cron from "node-cron";

export default function EditMode(props) {
    let script = document.createElement("script");
    script.src = "https://www.editmode.app/assets/chunks.js";
    script.async = true;
    document.body.append(script);

    return(
        <>
            {props.children}
        </>
    );
}