import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/SignUp";
import Messages from "./pages/Messages";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

const App = () => {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
