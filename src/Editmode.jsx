// @ts-check
import React, { useEffect, useState } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { getTimedCachedData, storeTimedCache } from "./utilities";
import { api } from "./utilities";
import Watermark from "./Watermark.jsx";
import { useHotkeys } from "react-hotkeys-hook";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { CONTAINER_CLASS } from "./onboarding/utils/CONSTANTS";
import { renderOnboarder } from "./onboarding/index.jsx";

export function Editmode({
  children,
  projectId,
  defaultChunks,
  branchId = "",
  next = false,
}) {
  const [branch, setbranch] = useState("");
  const [hasWaterMark, setHasWaterMark] = useState(null);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const isBrowser = () => typeof window !== "undefined";
  if (isBrowser()) {
    window["chunksPresetBranchId"] = branchId;
  }
  useHotkeys("cmd+shift+e", () => {
    setIsEditorActive(!isEditorActive);
  });

  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }
  const cacheId = projectId + "_provider";
  useEffect(() => {
    let params = new URL(document.location.href).searchParams;
    branchId ? setbranch(branchId) : setbranch(params.get("em_branch_id"));
    setIsEditorActive(window.location.href.indexOf("editmode") > -1);

    if (branchId && isEditorActive) {
      params.set("em_branch_id", `${branchId}`);
      history.pushState(null, null, "?" + params.toString());
    }

    window["chunksProjectIdentifier"] = projectId;
    window["chunksAppFramework"] = "reactjs";
    const cachedItem = getTimedCachedData(cacheId);
    if (cachedItem) window["chunksProjectLoaded"] = true;
    const script = document.createElement("script");

    script.src =
      "https://unpkg.com/editmode-magic-editor@~1/dist/magic-editor.js";

    if (!window["magicEditorInjected"]) {
      script.setAttribute("async", "");
      document.body.append(script);
      window["magicEditorInjected"] = true;
    }

    if (!cachedItem) {
      api
        .get(`/projects/${projectId}`)
        .then((res) => {
          storeTimedCache(cacheId, res.data);
          const project = res.data;
          if (project.has_watermark) {
            setHasWaterMark(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const project = cachedItem;
      if (project.has_watermark) setHasWaterMark(true);
    }
  }, [branch, isEditorActive]);

  return (
    <EditmodeContext.Provider
      value={{ branch, projectId, defaultChunks, next }}
    >
      {isBrowser() && (
        <KeyboardEventHandler
          handleKeys={["cmd+shift+l"]}
          onKeyEvent={() => {
            if (!isOnboardingActive) {
              renderOnboarder(setIsOnboardingActive);
              setIsOnboardingActive(
                (isOnboardingActive) => !isOnboardingActive
              );
            } else {
              let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
              containerDiv.remove();
              setIsOnboardingActive(
                (isOnboardingActive) => !isOnboardingActive
              );
            }
          }}
        />
      )}
      {children}
      {hasWaterMark && <Watermark projectId={projectId} />}
    </EditmodeContext.Provider>
  );
}
