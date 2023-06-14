// import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import PageNotFound from './Components/Others/PageNotFound.jsx'


function App() {
  const {user} = useContext(AuthContext)

  return (

    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path = "*" Component={PageNotFound} />
          <Route  path="/login" element={user ?<Navigate to = "/" /> : <Login />} />
          <Route path="/register" element ={user ? <Navigate to="/logout" /> : <Register />} />
          <Route path="/logout" Component={Logout} />
          <Route path="/new-story" />
          <Route path="/verify-email" element={user ?<Navigate to = "/" /> : <VerifyEmail />} />
          <Route path="admin-login" Component={AdminLogin} />
          <Route path="/admin-dashboard" Component={AdminDashboard} />
          <Route path="/article/:id" Component={ArticlePage} />
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
