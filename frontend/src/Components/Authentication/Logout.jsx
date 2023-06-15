import Cookies from 'js-cookie'
import { useNavigate } from 'react-router' 
import AuthContext from '../../Contexts/AuthContext'
import { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import {BACKEND_BASE_URL} from '../../API/Api'
import axios from 'axios';



const Logout = (currentUrl) => {

    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext)
    const {user} = useContext(AuthContext)

    const handleLogout = () => {
        const accessToken = Cookies.get("access_token")
        const refreshToken = Cookies.get("refresh_token")

        axios.post(`${BACKEND_BASE_URL}user/logout`, {refresh_token: refreshToken}).then((response) =>{

            Cookies.remove("access_token")
            Cookies.remove("refresh_token")
            setUser(null)

            window.location.reload()
            if(currentUrl){
            {currentUrl == 'admin' ? 
                navigate("/admin-login") :
                navigate("/login")
                }
            }else{
                navigate("/login")
            }
        }).catch((error) =>{
            console.error("logout component error: ", error);
        } )
      

    }

    return(
        <button style={{
            border: 'none',
            padding: '0',
            background: 'none',
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
          }} onClick={handleLogout}>Logout</button>
    )  
}
export default Logout;