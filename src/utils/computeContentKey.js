import hash from "@emotion/hash";
import kebabCase from "lodash.kebabcase";

export function computeContentKey(content) {
  if (typeof content !== "string") {
    console.error(
      `Cannot compute chunk.content_key. Expected a string, received ${typeof content}.`
    );
    return;
  }

  return `${kebabCase(content.slice(0, 32))}-${hash(content)}`;
}
