import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../css/nav.css";

function Navigation({ role, name }) {
  const [render, setRender] = useState(false);
  const [navigacja, setNavigation] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem("token") == null) {
      setNavigation(false);
    }
  }, [render]);

  function logOut() {
    window.localStorage.removeItem("token");
    window.location("/register");
    setRender(true);
  }

  let user = `${name}`;
  const names = user.split(` `);

  return navigacja ? (
    <>
      <nav className=" text-warning d-lg-none d-md-none d-sm-flex flex-column flex-wrap">
        <div class="pos-f-t m-3">
            <ul class="nav d-flex justify-content-center">
              <li className="m-3">
                <h3 className="none me-4">
                  {names[0]} <CgProfile />
                </h3>
              </li>
              <li className="m-3 fs-2">
                <Link className="none me-4" to="/">
                  Główna strona
                </Link>
              </li>
              <li className="m-3 fs-2">
                <Link className="none me-4" to="/stawki">
                  Stawki
                </Link>
              </li>
              {role === "admin" ? (
                <li className="m-3 fs-2">
                  <Dropdown as={ButtonGroup}>
                    <Link to="/admin" className="none me-1 fs-2 my-0 pb-2">
                      Admin
                    </Link>
                    <Dropdown.Toggle
                      split
                      variant="none"
                      className="none me-3 pb-2"
                    />
                    <Dropdown.Menu>
                      <Link className="none p-3 fs-2 fs-5" to="/admin/matches">
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
              <li className="m-3">
                <Link to="/" className="none fs-2" onClick={logOut}>
                  Log Out
                </Link>
              </li>
            </ul>
        </div>
      </nav>

      <nav className="menu p-4">
        <ul className=" d-lg-flex d-md-flex d-sm-none d-none justify-content-end fs-4">
          <li>
            <h3 className="none me-4">
              {names[0]} <CgProfile />
            </h3>
          </li>
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
