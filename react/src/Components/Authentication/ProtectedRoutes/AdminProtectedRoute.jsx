import {RoundLoading, AuthContext, Navigate, useLocation, useState, useEffect, useContext} from '../../index'

const AdminProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const isAdmin = user?.is_admin
    console.log("is admin check in admin protected route", isAdmin)
    console.log(typeof isAdmin, "is admin datatype");
  
    useEffect(() => {
      // Simulating an asynchronous operation to fetch the user
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);
    
    if (isAdmin) {
        // Code to execute if user is an admin
        console.log("User is an admin");
      } else {
        // Code to execute if user is not an admin
        console.log("User is not an admin");
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
  
    // Render the content based on user presence
    if (isAdmin) {
      return children;
    } else {
      sessionStorage.setItem("originalLocation", location.pathname);
      // Navigate to login with the original location as the "from" state
      return (
        <Navigate
          to={{
            pathname: '/admin-login'
          }}
        />
      );
    }
  };
  
  export default AdminProtectedRoute;

