import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import JobSearch from "./pages/JobSearch";

function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="job-search"
          element={
            <PrivateRoute>
              <JobSearch />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;