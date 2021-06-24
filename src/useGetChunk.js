

import { storeCache, getCachedData, api } from './utilities'
import { EditmodeContext } from "./EditmodeContext"
import {useEffect, useState, useContext} from 'react'

export const useGetChunk = (identifier) => {
  const [projectId, setProject] = useState(null);
  let [chunk, setChunk] = useState(undefined);
  const cacheId = identifier + projectId;

  useEffect(() => {
    setProject(window["chunksProjectIdentifier"])
    const cachedChunk = getCachedData(cacheId);
    if (cachedChunk) setChunk(JSON.parse(cachedChunk))
    let url = `chunks/${identifier}?project_id=${projectId}`;
  
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data);
        if (!cachedChunk) setChunk(res.data)
      })
      .catch((error) => console.log(error)); // Set error state
  }, [cacheId])
  
  return chunk && chunk.content || ""
}