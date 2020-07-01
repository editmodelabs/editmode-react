// @ts-check
import React from "react";
import useSWR from "swr";

import { api } from "./api";
import { ChunkCollectionContext } from "./ChunkCollectionContext";

export function ChunkCollection({ children, className, identifier, limit = "", tags = [] }) {
  let urlParams = new URLSearchParams()
  urlParams.append('collection_identifier', identifier)
  urlParams.append('limit', limit)
  if ( tags.length > 0 ) tags.map( tag => urlParams.append('tags[]', tag))

  const {
    data: chunks = [],
    error,
  } = useSWR(`chunks?${urlParams}`, (url) =>
    api.get(url).then((res) => res.data.chunks)
  );

  if (error) {
    console.log(
      `Something went wrong trying to retrieve chunk collection: ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
    );

    return <>{children}</>;
  }

  if (!chunks.length) {
    return children;
  }

  return chunks.map((chunk) => (
    <ChunkCollectionContext.Provider key={chunk.identifier} value={chunk}>
      <div data-collection-name={chunk.collection.name} className={className}>
        {children}
      </div>
    </ChunkCollectionContext.Provider>
  ));
}

export default ChunkCollection;
