import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import storeMemoryInStore from "./memory.reducer";
import { storeUserProfileInfo } from "./user.reducer";

const reducer = combineReducers({
  loginReducer,
  storeMemoryInStore,
  storeUserProfileInfo,
});

export default reducer;
