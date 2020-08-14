import { createContext } from "react";

export const EditmodeContext = createContext({
  branch: null,
  projectId: null,
  chunkFallback: null,
});
