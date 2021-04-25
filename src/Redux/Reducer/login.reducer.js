import {
  USER_LOGIN_CREATED,
  USER_REGISTRATION_CREATED,
} from "../Constant/constants";

const initialState = {
  Bio: null,
  address: null,
  date: null,
  email: null,
  image: null,
  mobile: null,
  name: null,
  id: null,
};
const user_data = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_CREATED:
      const user = {
        ...state,
        ...payload,
      };
      console.log(user);
      return user;
    case USER_REGISTRATION_CREATED:
      break;

    default:
      return state;
  }
};

export default user_data;
