const getCachedData = (id) => {
  return localStorage.getItem(id);
}

const storeCache = (id, data) => {
  localStorage.setItem(id, JSON.stringify(data));
}

export {getCachedData, storeCache}