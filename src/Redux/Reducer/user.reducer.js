import { STORE_USER_DATA } from "../Constant/constants";

export const storeUserProfileInfo = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case STORE_USER_DATA:
      return { ...payload };

    default:
      return state;
  }
};
