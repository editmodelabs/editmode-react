import { createContext } from "react";

export const HeadManagerContext = createContext({
  // updateHead,
  // mountedInstances,
  // updateScripts,
  // scripts,
});

if (process.env.NODE_ENV !== "production") {
  HeadManagerContext.displayName = "HeadManagerContext";
}
