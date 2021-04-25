import {
  USER_LOGIN_CREATED,
  USER_REGISTRATION_CREATED,
} from "../Constant/constants";

export const user_login = (data) => {
  return {
    type: USER_LOGIN_CREATED,
    payload: data,
  };
};

export const user_registration = (data) => {
  return {
    type: USER_REGISTRATION_CREATED,
    payload: data,
  };
};
