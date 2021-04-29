import { STORE_USER_DATA } from "../Constant/constants";

export const storeUserInfo = (payload) => {
  return { type: STORE_USER_DATA, payload };
};
