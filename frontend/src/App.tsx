import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Footer from "./components/Home/Footer";

function App() {
  const { verify, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      verify();
    };
    verifyAuth();
  }, [verify]);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
