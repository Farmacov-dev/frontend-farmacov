export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
