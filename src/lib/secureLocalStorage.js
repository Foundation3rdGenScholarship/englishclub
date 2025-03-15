export const storeAccessToken = (accessToken) => {

  const token = accessToken?.access_token || accessToken?.data?.access_token;

  localStorage.setItem("access_token", token);
};

export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");
  return token;
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};
