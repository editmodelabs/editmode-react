import { useEffect, useState } from "react";
import { api } from "./utilities";

export function useCollectionData(projectId, coll_id) {
  const [collections, setCollections] = useState(null);
  const url = `collections/?project_id=${projectId}`;

  useEffect(() => {
    if (projectId) {
      api
        .get(url)
        .then((res) => {
          if (coll_id) {
            const filtered = filterCollections(coll_id, res.data);
            setCollections(filtered);
          } else setCollections(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  return [collections];
}

function filterCollections(coll_id, data) {
  const new_obj = data.find((coll_data, i) => coll_data.identifier == coll_id);
  return new_obj;
}
