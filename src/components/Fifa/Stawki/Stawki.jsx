import React from "react";
import { Link } from "gatsby";
import { useEffect, useState } from "react";
import Group_stage from "./components/Fifa/Group_stage";
import Group_stage_bets from "./components/Fifa/Group_stage_bets";
import Playoff from './components/Fifa/Playoff'
import Playoff_bets from './components/Fifa/Playoff_bets'

function Stawki() {
  const [matches, setMatches] = useState([]);
  const [matchesPO, setMatchesPo] = useState([]);
  const [timer, setTimer] = useState([]);
  const [role, setRole] = useState([]);
  const [available, setAvailable] = useState();
  const [availablePO, setAvailablePo] = useState();
  const [stage, setStage] = useState(true);

  useEffect(() => {
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    if (window.localStorage.getItem("token") == null) {
      window.location.assign("/Registracja");
    }
  }, []);
  function logOut() {
    window.localStorage.removeItem("token");
    window.location.assign("/Registracja");
  }
  function playoff(){setStage(false)}
  function group_stage(){setStage(true)}

  return (
    <>
      <header className="bg-secondary">
        <div className="container">
          <div className="d-flex justify-content-between p-3">
            <div>
              <Link to="/" className="btn btn-warning text-light m-1 me-2">
                Główna strona
              </Link>
              <Link to="/Stawki" className="btn btn-warning text-light m-1 me-2">
                Stawki
              </Link>
              {role === "admin" &&
                <Link to="/Admin" className="btn btn-warning text-light m-1">
                  Admin
                </Link>
              }
            </div>
            <button className="btn btn-danger" onClick={logOut}>
              Wyloguj się
            </button>
          </div>
        </div>
      </header>
      <div>
        <h2 className="m-4 text-center">{stage ? "Faza grupowa" : "Drabinka"}</h2>
        <button className="btn btn-dark m-2" onClick={group_stage}>Faza grupowa</button>
        <button className="btn btn-dark m-2" onClick={playoff}>Drabinka</button>
        {stage ? (
          !available ? (
          matches && 
          <Group_stage_bets 
            matches={matches}
          />
        ) : (
          matches && 
          <Group_stage
            matches={matches}
          />
        )
        ) : (
          !availablePO ? (
            matches && 
            <Playoff_bets
              matches={matchesPO}
            />
          ) : (
            matches && 
            <Playoff
              matches={matchesPO}
            />
          )
        )}
      </div>
    </>
  );
}

export default Stawki;
