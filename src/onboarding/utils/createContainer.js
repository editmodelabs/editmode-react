import { CONTAINER_CLASS } from "./CONSTANTS";
const isBrowser = () => typeof window !== "undefined";

export const createContainerElement = () => {
  if (isBrowser()) {
    let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
    if (containerDiv) {
      return containerDiv;
    }
    containerDiv = document.createElement("div");
    containerDiv.classList.add(CONTAINER_CLASS);
    containerDiv.classList.add("full-screen");
    document.body.append(containerDiv);
    return containerDiv;
  }
};
