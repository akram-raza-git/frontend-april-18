import { FETCH_MEMORIES_DATA } from "../Constant/constants";
export const storeMemoryInStore = (payload) => {
  return {
    type: FETCH_MEMORIES_DATA,
    payload,
  };
};
