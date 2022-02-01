import { CONTAINER_CLASS } from "./CONSTANTS";
const isBrowser = () => typeof window !== "undefined";

export const removeContainerElement = () => {
  if (isBrowser()) {
    let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
    containerDiv.remove();
  }
};
