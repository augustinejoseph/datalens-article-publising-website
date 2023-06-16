// import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./Components/Authentication/Login.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Authentication/Register.jsx";
import Logout from "./Components/Authentication/Logout.jsx";
import { useContext } from "react";
import AuthContext from "./Contexts/AuthContext.jsx";
import VerifyEmail from "./Components/Authentication/VerifyEmail.jsx";
import AdminLogin from "./Components/Authentication/AdminLogin.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import ArticlePage from "./Components/Article/SingleArticlePage.jsx";
import PageNotFound from "./Components/Others/PageNotFound.jsx";
import UserProtectedRoute from "./Components/Authentication/UserProtectedRoute.jsx";
import Account from "./Components/Account/Account.jsx";
import AdminProtectedRoute from "./Components/Authentication/AdminProtectedRoute.jsx";
import NewArticle from "./Components/NewArticle/NewArticle.jsx";

function App() {
  const { user } = useContext(AuthContext);
  // console.log(user, 'user form app.js')

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="*" Component={PageNotFound} />
          <Route  path="/login" element={user ?<Navigate to = "/" /> : <Login />} />
          <Route  path="/register" element={user ?<Navigate to = "/" /> : <Register />} />
          <Route path="/logout" Component={Logout} />
          <Route path="/verify-email" element={user ? <Navigate to="/" /> : <VerifyEmail />} />
          <Route path="/article/:id" Component={ArticlePage} />

          {/* User Protected Routes  */}
          <Route path='/new-article' element={<UserProtectedRoute > <NewArticle /> </UserProtectedRoute>} />
          <Route path="/account/*" element={<UserProtectedRoute user={user}> <Account /></UserProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin-dashboard/*" element={<AdminProtectedRoute user={user}> <AdminDashboard /> </AdminProtectedRoute> } />
          <Route path="admin-login" Component={AdminLogin} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
