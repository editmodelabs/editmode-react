import AsyncStorage from "@react-native-community/async-storage";

export const getCachedData = false
  ? (id) => localStorage.getItem(id)
  : async (id) => {
      try {
        return await AsyncStorage.getItem(id);
      } catch (error) {
        console.error("Error in fetching chunk.", error);
      }
    };

export const storeCache = false
  ? (id, data) => localStorage.setItem(id, JSON.stringify(data))
  : async (id, data) => {
      try {
        await AsyncStorage.setItem(id, JSON.stringify(data));
      } catch (error) {
        console.error("Error in saving chunk.", error);
      }
    };
