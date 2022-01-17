import { CONTAINER_CLASS } from "./CONSTANTS";

export const removeContainerElement = () => {
  let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
  containerDiv.remove();
};
