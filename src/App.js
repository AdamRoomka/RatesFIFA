import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Fifa from "./components/Fifa/Fifa";
import Mecze from './components/Admin/Mecze';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ErrorPage from './components/ErrorPages/ErrorPage';
import Navigation from './components/Navigation/Navigation';
import { getAllTeams } from './api/lib/FifaAPI';
import { getAllMatches } from './api/lib/MatchesAPI';
import { getAllUsers } from './api/lib/UsersAPI';

function App() {
  const [allTeams, setAllTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    getAllMatches(token).then((res) => {
      const matchdata = res.data.data.matches;
      setMatches(matchdata);
    });
    getAllTeams().then((res) => {
      const fifadata = res.data.data.teams;
      setAllTeams(fifadata);
    });
    getAllUsers(token).then((res) => {
      const userdata = res.data.data.users;
      setUser(userdata);
      const role = res.data.data.currentUserRole;
      setRole(role);
    });
    setLoading(false);
  }, [render]);

  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Fifa allTeams={allTeams} user={user} />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/admin" element={<Mecze allTeams={allTeams} matches={matches} setRender={setRender} render={render} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
