import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/SignUp";

const App = () => {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Inside Layout) */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;