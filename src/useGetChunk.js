

import { storeCache, getCachedData, api } from './utilities'
import { EditmodeContext } from "./EditmodeContext"
import {useEffect, useState, useContext} from 'react'

export const useGetChunk = (identifier, field = null) => {
  const [projectId, setProject] = useState(null);
  let [chunk, setChunk] = useState(undefined);
  const cacheId = identifier + projectId + field;

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
      .catch((error) => console.error(error)); // Set error state
  }, [cacheId])

  if (field && chunk && chunk.chunk_type == "collection_item") {
    field = field.toLowerCase()
    const fieldChunk = chunk.content.find(c =>
      c.custom_field_identifier.toLowerCase() == field || c.custom_field_name.toLowerCase() == field
    )
    if (fieldChunk) {
      setChunk(fieldChunk)
    } else {
      console.error(`We can't find a ${identifier} content with ${field} field`)
      return ""
    }
  }
  
  return chunk && chunk.content || ""
}