import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Fifa from "./components/Fifa/Fifa";
import Admin from "./components/Admin/Admin";
import Mecze from "./components/Admin/Matches/Mecze";
import Users from "./components/Admin/Usery/Users";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ErrorPage from "./components/ErrorPages/ErrorPage";
import Navigation from "./components/Navigation/Navigation";
import Stawki from "./components/Fifa/Stawki";
import {
  getAllMatches,
  getAllMatchesGroup,
  getAllMatchesPlayoff,
} from "./api/lib/MatchesAPI";
import { getAllTeams } from "./api/lib/FifaAPI";
import { getAllUsers } from "./api/lib/UsersApi";

function App() {
  const [navigation, setNavigation] = useState(true);
  const [allTeams, setAllTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesGr, setMatchesGr] = useState([]);
  const [matchesPO, setMatchesPo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availablePO, setAvailablePo] = useState(false);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [name, setName] = useState([]);
  const [render, setRender] = useState(false);

  let token = null;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token");
  }
  useEffect(() => {
    try {
    if (!token) {
      setNavigation(false);
    }
      if (token) {
        getAllUsers(token)
          .then((res) => {
            setUser(res.data.data.users);
            setRole(res.data.data.currentUserRole);
            setName(res.data.data.name);
          })
          .catch((error) => {
            console.error(error);
          });

        getAllMatchesGroup(token)
          .then((res) => {
            setMatchesGr(res.data.data.matches);
          })
          .catch((error) => {
            console.error(error);
          });

        getAllMatchesPlayoff(token)
          .then((res) => {
            setMatchesPo(res.data.data.matches);
            setAvailablePo(true);
          })
          .catch((error) => {
            console.error(error);
          });

        getAllMatches(token).then((res) => {
          setMatches(res.data.data.matches);
        });

        getAllTeams()
          .then((res) => {
            const fifadata = res.data.data.teams;
            setAllTeams(fifadata);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [render]);

  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Navigation role={role} name={name} navigation={navigation} />
          <Routes>
            <Route
              path="/"
              element={
                <Fifa
                  allTeams={allTeams}
                  loading={loading}
                  user={user}
                  token={token}
                />
              }
            />
            <Route
              path="/stawki"
              element={
                <Stawki
                  matchesGr={matchesGr}
                  matchesPO={matchesPO}
                  availablePO={availablePO}
                />
              }
            />
            <Route path="/*" element={<ErrorPage />} />
            <Route
              path="/admin"
              element={<Admin allTeams={allTeams} matches={matches} />}
            />
            <Route
              path="/admin/matches"
              element={
                <Mecze
                  allTeams={allTeams}
                  matches={matches}
                  setRender={setRender}
                  render={render}
                  role={role}
                />
              }
            />
            <Route
              path="/admin/users"
              element={
                <Users
                  setRender={setRender}
                  render={render}
                  users={user}
                  role={role}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
