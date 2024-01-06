import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
// import Fifa from "./components/Fifa/Fifa";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Navigation from "./components/Navigation/Navigation";
import { socket } from "./socket";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
        if (decodedToken) {
          setToken(decodedToken);
          socket.emit("userOnline", { userId: `${decodedToken.user_id}` });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else if (
      window.location.pathname === "/register" ||
      window.location.pathname === "/login"
    ) {
      return;
    }
    return () => {};
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Fifa />} /> */}
          {/*  <Route path="/stawki" element={<Stawki />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/matches"
            element={<Mecze setRender={setRender} render={render} />}
          />
          <Route
            path="/admin/users"
            element={<Users setRender={setRender} render={render} />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
