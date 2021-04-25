import history from "../history/history";
const isAuthenticated = localStorage.getItem("token");

export const authenticated = () => {
  if (!isAuthenticated) {
    history.push("/u/login");
    return false;
  }
  return true;
};
