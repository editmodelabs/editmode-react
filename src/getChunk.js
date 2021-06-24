

import { storeCache, getCachedData, api } from './utilities'

export const getChunk = (identifier, projectId) => {
  const cacheId = identifier + projectId;
  let cachedChunk = getCachedData(cacheId);
  let chunk = cachedChunk && JSON.parse(cachedChunk);
  let url = `chunks/${identifier}?project_id=${projectId}`;
  let result = chunk && chunk.content || ""

  api
    .get(url)
    .then((res) => {
      storeCache(cacheId, res.data);
    })
    .catch((error) => console.log(error)); // Set error state
  return result
}