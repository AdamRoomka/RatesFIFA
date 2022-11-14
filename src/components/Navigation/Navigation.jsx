import React, { useEffect, useState } from "react";
// import { decodeToken } from "../api/lib/UsersApi";
import { Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../css/nav.css";

function Navigation({role}) {
  // const [currentUser, setcurrentUser] = useState([]);
  const [render, setRender] = useState(false);
  const [navigacja, setNavigation] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem("token") == null) {
      setNavigation(false);
    }
  }, [render]);
  function logOut() {
    window.localStorage.removeItem("token");
    // const Datas = new Date();
    // const year = Datas.getUTCFullYear();
    // var month = Datas.getUTCMonth()+1;
    // if (month < 10) {
    //   month = "0" + month;
    // }
    // var day = Datas.getUTCDate();
    // if (day < 10) {
    //   day = "0" + day;
    // }
    // var hour = Datas.getUTCHours() + 3;
    // if (hour < 10) {
    //   hour = "0" + hour;
    // }
    // var minute = Datas.getUTCMinutes();
    // if (minute < 10) {
    //   minute = "0" + minute;
    // }
    // const yyymmdd = `${year}-${month}-${day}`;
    // const hhmm = `${hour}:${minute}`;
    // const postToLogs = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: currentUser.name,
    //     text: "Log out",
    //     value: "Logged out from pages",
    //     date: yyymmdd,
    //     time: hhmm,
    //   }),
    // };
    // fetch("http://localhost:4000/api/v1/logs/addNewLog", postToLogs);
    window.location("/register");
    setRender(true);
  }
  return navigacja ? (
    <>
      <nav className="menu p-4">
        <ul className="d-flex justify-content-end fs-4">
          <li>
            <Link className="none me-4" to="/">
              Główna strona
            </Link>
          </li>
          <li>
            <Link className="none me-4" to="/stawki">
              Stawki
            </Link>
          </li>
          {role === "admin" ? (
            <li>
              <Dropdown as={ButtonGroup}>
                <Link to="/admin" className="none me-1 my-0 pb-2">
                  Admin
                </Link>
                <Dropdown.Toggle
                  split
                  variant="none"
                  className="none me-3 pb-2"
                />
                <Dropdown.Menu>
                  <Link className="none p-3 fs-5" to="/admin/matches">
                    Mecze
                  </Link>
                  {/* <Link className="none p-3 fs-5" to="/admin/history">
                    History
                  </Link> */}
                  <Link className="none p-3 fs-5" to="/admin/users">
                    Users
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/" className="none" onClick={logOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    ""
  );
}

export default Navigation;
