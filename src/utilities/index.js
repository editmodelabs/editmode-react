export {
  getCachedData,
  storeCache,
  getTimedCachedData,
  storeTimedCache,
} from "./caching";
export { computeContentKey } from "./computeContentKey";
export { sanitizeContent } from "./sanitizeContent";
export { transformImage } from "./transformImage";
export { computeClassName } from "./computeClassName";
export { api } from "./api";
export { renderChunk } from "./renderChunk.jsx";
export { setDefaultContent } from "./setDefaultContent"
export { filterByTag } from "./filterTags";

export const tryParse = (string) => {
  try {
    return JSON.parse(string)
  } catch (error) {
    return null
  }
}