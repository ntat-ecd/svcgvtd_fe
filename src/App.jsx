import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import EventsPage from "./components/EventsPage";
import Header from "./components/Header";

function PrivateRoute({ children, authToken }) {
  console.log("PrivateRoute component rendered. Auth Token:", authToken);
  return authToken ? children : <Navigate to="/login" />;
}
function App() {
  console.log("App component rendered");
const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    setAuthToken(token);
  }
}, []);
return (
  <Router>
    <div className="bg-gray-100 min-h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
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
  </Router>
)}
export default App;
