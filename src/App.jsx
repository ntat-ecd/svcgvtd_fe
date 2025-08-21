import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import EventsPage from "./components/EventsPage";
import Header from "./components/Header";

function PrivateRoute({ children, authToken }) {
  return authToken ? children : <Navigate to="/login" replace />;
}
function App() {
  console.log("App component rendered");

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  const AppContent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      setAuthToken(null);
      navigate("/login");
    };

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const verifyToken = async () => {
          try {
            const response = await fetch(
              "http://localhost:3000/api/auth/verify",
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            );
            //If not valid
            if (!response.ok) {
              throw new Error("Token verification failed");
            }
            //If valid, set the auth token
            setAuthToken(token);
          } catch (error) {
            console.error("Token verification failed:", error);
            handleLogout();
          }
        };

        verifyToken();
      }
    }, []);

    return (
      <div className="bg-gray-100 min-h-screen">
        <Header authToken={authToken} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route
            path="/login"
            element={<LoginPage setAuthToken={setAuthToken} />}
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute authToken={authToken}>
                <AdminPage authToken={authToken} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    );
  };
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
