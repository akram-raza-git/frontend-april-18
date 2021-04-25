import { instance } from "../../action/interceptors";

export const fetchUserProfile = (userId) => {
  return instance
    .get(`/profile/${userId}`)
    .then((resp) => {
      if (resp && resp.data) return resp.data;
      return resp;
    })
    .catch((error) => error);
};
export const updateUserProfile = (data) => {
  return instance
    .put(`/profile/`, data)
    .then((resp) => {
      if (resp && resp.data) return resp.data;
      return resp;
    })
    .catch((error) => error);
};
