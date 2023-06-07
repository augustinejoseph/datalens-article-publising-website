import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import RequireAuth from "./Components/RequireAuthSample/RequireAuth";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/protected" Component={RequireAuth} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
