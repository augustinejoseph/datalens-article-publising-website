import { Cookies, axios, BACKEND_BASE_URL } from "../Components/index";

export const TokenRefresh = async () => {
  const refreshToken = Cookies.get("refresh_token");
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/token/refresh/`, {
      refresh_token: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    Cookies.set("access_token", newAccessToken);
    console.log(
      "new access token genrated manulaly inside token refresh",
      newAccessToken,
    );
  } catch (error) {}
};
export default TokenRefresh;
