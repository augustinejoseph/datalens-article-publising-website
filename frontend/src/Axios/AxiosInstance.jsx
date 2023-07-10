// adminAxiosToDjangoServerInterceptor.js

import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../Components/index';
import jwtDecode from 'jwt-decode';

export const adminAxiosToDjangoServerInterceptor = axios.create();

adminAxiosToDjangoServerInterceptor.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || isTokenExpired(accessToken)) {
      if (refreshToken) {
        try {
          console.log('inside try in refresh token');
          const response = await axios.post(`${BACKEND_BASE_URL}token/refresh/`, {
            refresh_token: refreshToken,
          });
          console.log('refrshing token respones ', response);


          console.log('new access token requested');
          const newAccessToken = response.data.access_token;

          Cookies.set('access_token', newAccessToken);
          console.log('inside new access token ', newAccessToken);


          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error('Error refreshing access token:', error);
        }
      } else {
        console.error('Refresh token is not available');
      }
    } else {
      console.log('access toekn added to request');

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log('eror last on in interceptor', error);
    return Promise.reject(error);
  }
);


const isTokenExpired = (token) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken = jwtDecode(token);
  return decodedToken.exp < currentTime;
};


