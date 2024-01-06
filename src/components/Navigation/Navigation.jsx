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
    <header>
      <div className="logo">Rates 2.1</div>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to="/profile">
              {token ? token.login : "User"} <CgProfile />
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/groupes">
              Groupes
            </Link>
          </li>
          {"role" === "admin" && (
            <li>
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link className="nav-link" to="/" onClick={logOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
