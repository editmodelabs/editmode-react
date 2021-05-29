import { useEffect, useState } from "react";
import { api } from "./utilities";

export function useCollectionData(projectId, collection_filter) {
  const [collection, setCollection] = useState(null);
  const url = `collections/?project_id=${projectId}`;

  useEffect(() => {
    if (projectId) {
      api
        .get(url)
        .then((res) => {
          if (collection_filter) {
            const filtered = filterCollections(collection_filter, res.data);
            setCollection(filtered);
          } else setCollection(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  return [collection];
}

function filterCollections(filter_arr, collections) {
  const new_obj = collections.filter((collection, i) =>
    filter_arr.includes(collection["name"])
  );
  return new_obj;
}
