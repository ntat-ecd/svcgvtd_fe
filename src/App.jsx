import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const AppContent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      setAuthToken(null);
      navigate("/login");
    };

    return (
      <div className="bg-gray-100 min-h-screen">
        <Header authToken={authToken} onLogout={handleLogout}/>
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
