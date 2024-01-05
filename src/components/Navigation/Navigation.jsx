// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "../css/nav.css";

function Navigation({ token }) {
  function logOut() {
    window.localStorage.removeItem("token");
    window.location.assign("/register");
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="nav-list">
            <li className="nav-item">
              <h3 className="profile">
                {token ? token.login : "user"} <CgProfile />
              </h3>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Główna strona
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stawki">
                Stawki
              </Link>
            </li>
            {"role" === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={logOut}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
