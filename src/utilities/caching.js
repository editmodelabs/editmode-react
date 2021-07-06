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

export const storeTimedCache = (id, data) => {
  if (isBrowser()) {
    const expiry = new Date(new Date().setHours(new Date().getHours() + 1)); // Set 1 hour expiration
    const item = {
      value: data,
      expiry: expiry.getTime(),
    };
    localStorage.setItem(id, JSON.stringify(item));
  }
};

export const getTimedCachedData = (id) => {
  if (isBrowser()) {
    const cachedItem = localStorage.getItem(id);
    if (!cachedItem) return null;
    const item = JSON.parse(cachedItem);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(id);
      return null;
    }
    return item.value;
  }
};
