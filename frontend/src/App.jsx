
import {BrowserRouter as Router, Route,  Routes,  Navigate,  Link} from "react-router-dom";
import Login from "./Components/Authentication/Login.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Authentication/Register.jsx";
import Logout from "./Components/Authentication/Logout.jsx";
import { useContext } from "react";
import AuthContext from "./Contexts/AuthContext.jsx";
import VerifyEmail from "./Components/Authentication/VerifyEmail.jsx";
import AdminLogin from "./Components/Authentication/AdminLogin.jsx";
import ArticlePage from "./Components/Article/SingleArticlePage/SingleArticlePage.jsx";
import PageNotFound from "./Components/Others/PageNotFound.jsx";
import UserProtectedRoute from "./Components/Authentication/UserProtectedRoute.jsx";
import Account from "./Components/Account/Account.jsx";
import AdminProtectedRoute from "./Components/Authentication/AdminProtectedRoute.jsx";
import NewArticle from "./Components/NewArticle/NewArticle.jsx";
import EditArticle from "./Components/EditArticle/EditArticle.jsx";
import AuthorProfile from "./Components/AuthorProfile/AuthorProfile.jsx";
import AdminPanelUser from "./Components/Admin/Users/AdminPanelUser.jsx";
import AdminPanelLayout from "./Components/Admin/Layout/AdminPanelLayout.jsx";
import AdminPanelCategory from "./Components/Admin/Category/AdminPanelCategory.jsx";
import AdminPanelArticles from "./Components/Admin/Articles/AdminPanelArticles.jsx";
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/*" Component={PageNotFound} />
          <Route path="/404" Component={PageNotFound} />
          <Route  path="/login" element={user ?<Navigate to = "/" /> : <Login />} />
          <Route  path="/register" element={user ?<Navigate to = "/" /> : <Register />} />
          <Route path="/logout" Component={Logout} />
          <Route path="/verify-email" element={user ? <Navigate to="/" /> : <VerifyEmail />} />
          <Route path="/article/:id" Component={ArticlePage} />
          <Route path="/user/:username" element={<AuthorProfile />} />


          {/* User Protected Routes  */}
          <Route path='/new-article' element={<UserProtectedRoute > <NewArticle /> </UserProtectedRoute>} />
          <Route path="/account/*" element={<UserProtectedRoute user={user}> <Account /></UserProtectedRoute>} />
          <Route path='edit-article/:articleId' element={<UserProtectedRoute user={user}> <EditArticle /></UserProtectedRoute>} />

          {/* Admin Protected Routes */}
          <Route path="/admin/users" element={<AdminProtectedRoute user={user}><AdminPanelLayout><AdminPanelUser /></AdminPanelLayout></AdminProtectedRoute>} />
          <Route path="/admin/articles" element={<AdminProtectedRoute user={user}><AdminPanelLayout><AdminPanelArticles /></AdminPanelLayout></AdminProtectedRoute>} />
          <Route path="/admin/categories" element={<AdminProtectedRoute user={user}><AdminPanelLayout><AdminPanelCategory /></AdminPanelLayout></AdminProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute user={user}><AdminPanelLayout><AdminDashboard /></AdminPanelLayout></AdminProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute user={user}><AdminPanelLayout><AdminDashboard /></AdminPanelLayout></AdminProtectedRoute>} />



          {/* <Route path="/admin/users" element={<AdminProtectedRoute user={user}> <AdminPanelUser /> </AdminProtectedRoute> } /> */}

          <Route path="admin-login" Component={AdminLogin} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
