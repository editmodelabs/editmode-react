const isBrowser = () => typeof window !== "undefined";

export const getCachedData = (id) => {
  if (isBrowser()) {
    return localStorage.getItem(id);
  }
};

export const storeCache = (id, data) => {
  if (isBrowser()) {
    localStorage.setItem(id, JSON.stringify(data));
  }
};
