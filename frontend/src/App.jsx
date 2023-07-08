// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from "@stripe/stripe-js/pure";
// const STRIPE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
import {
  Login,
  Home,
  Register,
  Logout,
  VerifyEmail,
  AdminLogin,
  ArticlePage,
  PageNotFound,
  UserProtectedRoute,
  AdminProtectedRoute,
  NewArticle,
  EditArticle,
  AuthorProfile,
  AdminPanelUser,
  AdminPanelLayout,
  AdminPanelCategory,
  AdminPanelArticles,
  NavigationBar,
  SortedArticle,
  AuthContext,
  useContext,
  ErrorPage,
  AdminDashboard,
  AllFeatured,
  SubscriptionPlans,
  useLocation,
  useEffect,
  useState,
  PremiumProtectedRoute,
  EmailVerifiedProtectedRoute,
  
} from "./Components/index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  const [showNavigationBar, setShowNavigationBar] = useState(true);

  useEffect(() => {
    const { pathname } = window.location;
    setShowNavigationBar(
      !(pathname === "/plans" || pathname === "/login" || pathname === "/register")
    );
  }, []);
  return (
    <div>
      <Router>
        {showNavigationBar && <NavigationBar />}

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/*" Component={PageNotFound} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" Component={PageNotFound} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/logout" Component={Logout} />
          <Route
            path="/verify-email"
            element={user && user.is_active ? " " : <VerifyEmail />}
          />
          <Route path="/article/:id" Component={ArticlePage} />
          <Route path="/user/:username" element={<AuthorProfile />} />
          <Route path="/user/undefined" element={<ErrorPage />} />
          <Route path="/user/null" element={<ErrorPage />} />
          <Route path="/article/undefined" element={<ErrorPage />} />
          <Route path="/article/null" element={<ErrorPage />} />
          <Route path="/category/:categoryName" element={<SortedArticle />} />
          <Route path="/tag/:hashtagName" element={<SortedArticle />} />
          <Route path="/featured" Component={AllFeatured} />
          <Route path="/trending" Component={AllFeatured} />
          <Route path="/plans" element={<SubscriptionPlans />} />

          {/* Premium Protected Route */}
          <Route
            path="/premium"
            element={
              <PremiumProtectedRoute>
                <AllFeatured></AllFeatured>
              </PremiumProtectedRoute>
            }
          />

          {/* User Protected Routes  */}
          <Route
            path="/new-article"
            element={
              // <UserProtectedRoute>
                <EmailVerifiedProtectedRoute >
                <NewArticle />
                </EmailVerifiedProtectedRoute>
              // </UserProtectedRoute>
            }
          />
          {/* <Route path="/account/*" element={<UserProtectedRoute user={user}> <Account /></UserProtectedRoute>} /> */}
          <Route
            path="edit-article/:articleId"
            element={
              <UserProtectedRoute user={user}>
                <EditArticle />
              </UserProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute user={user}>
                <AdminPanelLayout>
                  <AdminPanelUser />
                </AdminPanelLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <AdminProtectedRoute user={user}>
                <AdminPanelLayout>
                  <AdminPanelArticles />
                </AdminPanelLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminProtectedRoute user={user}>
                <AdminPanelLayout>
                  <AdminPanelCategory />
                </AdminPanelLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute user={user}>
                <AdminPanelLayout>
                  <AdminDashboard />
                </AdminPanelLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute user={user}>
                <AdminPanelLayout>
                  <AdminDashboard />
                </AdminPanelLayout>
              </AdminProtectedRoute>
            }
          />

          {/* <Route path="/admin/users" element={<AdminProtectedRoute user={user}> <AdminPanelUser /> </AdminProtectedRoute> } /> */}

          <Route path="admin-login" Component={AdminLogin} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
