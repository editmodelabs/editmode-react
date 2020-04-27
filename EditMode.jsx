import React from "react";
import * as cron from "node-cron";

export default function EditMode(props) {
    let script = document.createElement("script");
    script.src = "https://www.editmode.app/assets/chunks.js";
    script.async = true;
    document.body.append(script);

    cron.schedule('0 */12 * * *', function(){
        console.log('Cleared cache');
        const cachedChunks = Object.keys(localStorage).filter(k => k.substr(0,4) === "cnk_");
        for (let cnk in cachedChunks) {
           localStorage.removeItem(cachedChunks[cnk]);
        }

      });

    return(
        <div className="wrapper">
            {props.children}
        </div>
    );
}