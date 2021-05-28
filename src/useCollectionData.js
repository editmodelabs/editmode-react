import { useContext, useEffect, useState, useMemo } from "react";
import {
  api,
  renderChunk,
  computeContentKey,
  getCachedData,
  storeCache,
} from "./utilities";

export function useCollectionData() {
  const { projectId } = useContext(EditmodeContext);
  const url = `collections/?project_id=${projectId}`;
}
