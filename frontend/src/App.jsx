import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPage from "./AuthPage";
import GeneratePage from "./GeneratePage";
import ManageUrls from "./ManageUrls";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const is_admin = localStorage.getItem("is_admin");

    if (is_admin === "1") {
      setIsAdmin(true);
    }
    if (name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    alert("Logout success!");
    localStorage.removeItem("id_user");
    localStorage.removeItem("name");
    localStorage.removeItem("is_admin");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/auth");
  };

  return (
    <>
      <div className="navbar">
        <ul>
          {isLoggedIn ? (
            <li>
              <Link>{userName}</Link>{" "}
            </li>
          ) : (
            <li></li>
          )}
          {isLoggedIn && isAdmin && (
            <li>
              <Link to="/manage-urls">Manage URL</Link>
            </li>
          )}
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/">Generate</Link>
              </li>

              <li>
                <Link to="/auth" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<GeneratePage />} />
          <Route
            path="/auth"
            element={
              <AuthPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            }
          />
          <Route path="/manage-urls" element={<ManageUrls />} />{" "}
        </Routes>
      </div>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
