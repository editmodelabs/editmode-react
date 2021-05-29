import { useEffect, useState } from "react";
import { api } from "./utilities";

export function useCollectionData(projectId, collection_filter) {
  console.log("PROJ", projectId);
  const [collection, setCollection] = useState(null);
  const url = `collections/?project_id=${projectId}`;
  console.log("url", url);

  useEffect(() => {
    if (projectId) {
      api
        .get(url)
        .then((res) => {
          if (collection_filter) {
            const filtered = filterCollection(collection_filter, res.data);
            console.log("FF", filtered);
            setCollection(filtered);
          } else setCollection(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  return [collection];
}

function filterCollection(filter_arr, res_data) {
  const new_obj = res_data.filter((res_object, i) =>
    filter_arr.includes(res_object["name"])
  );
  return new_obj;
}
