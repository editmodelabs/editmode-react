import { ChunkCollectionContext } from "./ChunkCollectionContext";
import { useContext } from "react";
import { reducer } from "./reducer";
import { applyMiddleware } from "redux";

const ContextGetter = () => {
  const chunk = useContext(ChunkCollectionContext);
  return;
};

export function useURL(url) {
  console.log(url);
  const chunk = useContext(ChunkCollectionContext);
  console.log(chunk);
  if (!chunk) {
    return null;
  }
  const fieldChunk = chunk.content.find(
    (chunk) => chunk.custom_field_name === url
  );

  if (!fieldChunk) {
    console.warn(
      `Could not find field ${identifier} for ${chunk.collection.name}`
    );

    return null;
  }
  return fieldChunk;
}

const setChunkMiddleware = (store) => (next) => (action) => {
  if (action.type === "set_chunk") {
    setChunk(action.payload);
  }
  return next(action);
};

const store = createStore(reducer, applyMiddleware(setChunkMiddleware));
