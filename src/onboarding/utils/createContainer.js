import { CONTAINER_CLASS } from "./CONSTANTS";

export const createContainerElement = () => {
  let containerDiv = document.querySelector(`.${CONTAINER_CLASS}`);
  if (containerDiv) {
    return containerDiv;
  }
  containerDiv = document.createElement('div');
  containerDiv.classList.add(CONTAINER_CLASS);
  containerDiv.classList.add('full-screen');
  document.body.append(containerDiv);
  return containerDiv;
}