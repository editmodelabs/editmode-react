export const data = { chunk: null };

export const reducer = (data, action) => {
  if (action.type === "set_chunk") return { chunk: action.payload };
  else return data;
};
