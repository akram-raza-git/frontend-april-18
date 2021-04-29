import { instance } from "../../action/interceptors";
import { storeUserInfo } from "../../Redux/action/user.action";

export const fetchUserProfile = (userId) => {
  return (dispatch) =>
    instance
      .get(`/profile/${userId}`)
      .then((resp) => {
        if (resp && resp.data) {
          dispatch(storeUserInfo(resp.data));
          return resp.data;
        }
        return resp;
      })
      .catch((error) => error);
};
export const updateUserProfile = (data) => {
  return () =>
    instance
      .put(`/profile/`, data)
      .then((resp) => {
        if (resp && resp.data) return resp.data;
        return resp;
      })
      .catch((error) => error);
};
