import { FETCH_MEMORIES_DATA } from "../Constant/constants";

const storeMemoryInStore = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MEMORIES_DATA:
      const user = [...payload];
      return user;
    default:
      return state;
  }
};

export default storeMemoryInStore;
