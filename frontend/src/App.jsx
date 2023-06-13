// import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Register from "./Components/Register.jsx";
import Logout from "./Components/Logout.jsx";
import { useContext } from "react";
import AuthContext from "./Contexts/AuthContext.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import Footer from "./Components/Footer.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import ArticlePage from "./Components/ArticlePage.jsx";


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
