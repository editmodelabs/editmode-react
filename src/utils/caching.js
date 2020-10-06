export const getCachedData = (id) => {
  return localStorage.getItem(id);
}

export const storeCache = (id, data) => {
  localStorage.setItem(id, JSON.stringify(data));
}
