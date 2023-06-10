import Cookies from 'js-cookie'
import { useNavigate } from 'react-router' 
import AuthContext  from '../Contexts/AuthContext'
import { useContext } from 'react'


const Logout = () => {
    const navigate = useNavigate()
    const {setUser} = useContext(AuthContext)

    const handleLogout = () => {
        Cookies.remove("access_token")
        Cookies.remove("refresh_token")
        setUser(null)
        
        navigate("/")
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