import { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import RoundLoading from '../Shimmers/RoundLoading';

const UserProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulating an asynchronous operation to fetch the user
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Render the content based on user presence
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
  if (user) {
    return children;
  } else {
    sessionStorage.setItem("originalLocation", location.pathname);
    // Navigate to login with the original location as the "from" state
    return (
      <Navigate
        to={{
          pathname: '/login'
        }}
      />
    );
  }
};

export default UserProtectedRoute;
