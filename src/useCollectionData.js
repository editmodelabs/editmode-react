import { useContext, useEffect, useState, useMemo } from "react";
import { EditmodeContext } from "./EditmodeContext";
import { api } from "./utilities";

export function useCollectionData(fieldFilter) {
  const { projectId } = useContext(EditmodeContext);
  const [collection, setCollection] = useState(null);
  const url = `collections/?project_id=${projectId}`;

  useEffect(() => {
    let error;
    api
      .get(url)
      .then((res) => {
        if (fieldFilter) {
          const filtered_collection = filterCollection(fieldFilter, res.data);
          setCollection(filtered_collection);
        } else setCollection(filterCollection(res.data));
      })
      .catch((error) => console.log(error));
  }, []);

  return { collection };
}

function filterCollection(filter_arr, res_data) {
  const new_obj = res_data.filter((res_object, i) =>
    filter_arr.includes(res_object["name"])
  );
  return new_obj;
}
