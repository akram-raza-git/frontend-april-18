import { instance } from "./interceptors";

export const registerUser = (data) => {
  return instance
    .post("/user/register", data)
    .then((resp) => resp)
    .catch((error) => error);
};

export const loginUser = (data) => {
  return instance
    .post("/user/login", data)
    .then((resp) => resp)
    .catch((error) => error);
};
