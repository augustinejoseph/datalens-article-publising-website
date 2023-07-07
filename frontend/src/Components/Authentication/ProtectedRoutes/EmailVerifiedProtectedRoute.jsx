import {RoundLoading, AuthContext, Navigate, useLocation, useState, useEffect, useContext} from '../../index'

const EmailVerifiedProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const is_active = user?.is_active
    console.log("is emal verified", is_active)
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);
    
    if (is_active) {
        console.log("User email  is verified");
      } else {
        console.log("User email not verified");
      }

    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div><RoundLoading /></div>
        </div>
      );
    }
  
    if (is_active) {
      return children;
    } else {
      sessionStorage.setItem("originalLocation", location.pathname);
      return (
        <Navigate
          to={{
            pathname: '/verify-email'
          }}
        />
      );
    }
  };
  
  export default EmailVerifiedProtectedRoute;

