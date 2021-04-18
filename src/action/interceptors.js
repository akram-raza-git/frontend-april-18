import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common["auth-token"] = token ? token : null;

export const instance = axios.create({
  baseURL: "http://localhost:4000",
});
