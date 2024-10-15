import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

// Helper function to check if a user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if the token is stored in localStorage
};

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <Router>
      {authenticated && <Navbar setAuthenticated={setAuthenticated} />}{" "}
      {/* Pass setAuthenticated */}
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={authenticated ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/invoices"
          element={authenticated ? <Invoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
