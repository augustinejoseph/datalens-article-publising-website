import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_BASE_URL, useNavigate } from "../Components/index";
import jwtDecode from "jwt-decode";

export const adminAxiosToDjangoServerInterceptor = axios.create();

adminAxiosToDjangoServerInterceptor.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");
    const decoded_token = jwtDecode(accessToken);
    const admin = decoded_token.is_admin;

    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${BACKEND_BASE_URL}/token/refresh/`,
            {
              refresh_token: refreshToken,
            },
          );

          const newAccessToken = response.data.access_token;

          Cookies.set("access_token", newAccessToken);

          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error("Error refreshing access token:", error);
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          const navigate = useNavigate();
          navigate("/login");
          if (admin) {
            navigate("/admin login");
          } else {
            navigate("/login");
          }
        }
      } else {
        console.error("Refresh token is not available");
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const isTokenExpired = (token) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken = jwtDecode(token);
  return decodedToken.exp < currentTime;
};
