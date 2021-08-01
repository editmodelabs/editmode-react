//@ts-ignore
import React from "react";
import { AmpStateContext } from "./amp-context";

export function isInAmpMode({
  ampFirst = false,
  hybrid = false,
  hasQuery = false,
} = {}) {
  return ampFirst || (hybrid && hasQuery);
}

export function useAmp() {
  return isInAmpMode(React.useContext(AmpStateContext));
}
