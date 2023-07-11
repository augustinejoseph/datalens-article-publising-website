import {Cookies, axios, BACKEND_BASE_URL} from '../Components/index'

export const TokenRefresh = async () => {
    const refreshToken = Cookies.get('refresh_token')
    try{
        console.log('inside try in email manual refresh token');
        const response = await axios.post(`${BACKEND_BASE_URL}token/refresh/`, {
        refresh_token: refreshToken,
    })
    const newAccessToken = response.data.access_token
    Cookies.set('access_token', newAccessToken) 
    console.log('new access token genrated manulaly inside token refresh', newAccessToken);

    }catch(error){
        console.log('error in manual token refresh', error);
    }

}
export default TokenRefresh;