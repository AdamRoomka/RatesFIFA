import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Fifa from "./components/Fifa/Fifa";
import Admin from "./components/Admin/Admin";
import Mecze from "./components/Admin/Matches/Mecze";
import Usery from "./components/Admin/Usery/Users";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ErrorPage from "./components/ErrorPages/ErrorPage";
import Navigation from "./components/Navigation/Navigation";
import Stawki from "./components/Fifa/Stawki";
import { getAllMatches, getAllMatchesGroup, getAllMatchesPlayoff } from "./api/lib/MatchesAPI";
import { getAllTeams } from "./api/lib/FifaAPI";
import { getAllUsers } from "./api/lib/UsersApi";

function App() {
  const [allTeams, setAllTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesGr, setMatchesGr] = useState([]);
  const [matchesPO, setMatchesPo] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState();
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState();
  const [availablePO, setAvailablePo] = useState();
  const [timer, setTimer] = useState([]);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [render, setRender] = useState(false);


  useEffect(() => {
    let token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    getAllUsers(token).then((res) => {
      const userdata = res.data.data.users;
      setUser(userdata);
      setLoadingUsers(true);
      const role = res.data.data.currentUserRole;
      setRole(role);
    });
    getAllMatches(token).then((res) => {
      const matchdata = res.data.data.matches;
      setMatches(matchdata);
    });
    getAllMatchesGroup(token).then((res) => {
      const matchdata = res.data.data.matches;
      setMatchesGr(matchdata);
      setLoadingMatches(true);
    });
    getAllMatchesPlayoff(token).then((res) => {
      const matchdata = res.data.data.matches;
      setMatchesPo(matchdata);
      setAvailablePo(true);
    });
    getAllTeams().then((res) => {
      const fifadata = res.data.data.teams;
      setAllTeams(fifadata);
      setLoadingTeams(true)
    });
  }, [render]);

  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Navigation role={role} />
          <Routes>
            <Route path="/" element={<Fifa allTeams={allTeams} loadingUser={loadingUsers} loadingTeams={loadingTeams} user={user} />} />
            <Route path="/stawki" element={<Stawki matchesGr={matchesGr} matchesPO={matchesPO} loading={loadingMatches} availablePO={availablePO} />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/admin" element={<Admin allTeams={allTeams} matches={matches} setRender={setRender} render={render} />} />
            <Route path="/admin/matches" element={<Mecze allTeams={allTeams} matches={matches} setRender={setRender} render={render} />} />
            <Route path="/admin/users" element={<Usery allTeams={allTeams} matches={matches} setRender={setRender} render={render} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
