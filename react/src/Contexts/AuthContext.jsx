import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const premiumTrial = Cookies.get("premium_trial");
    const access_token = Cookies.get("access_token");
    if (access_token) {
      const decoded_token = jwt_decode(access_token);
      const {
        name,
        email,
        is_active,
        is_banned,
        is_admin,
        user_id,
        user_name,
        is_premium,
      } = decoded_token;
      const user = {
        name: name,
        email: email,
        is_active: is_active,
        is_banned: is_banned,
        is_admin: is_admin,
        user_id: user_id,
        user_name: user_name,
        is_premium: is_premium,
      };
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
