import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Fifa from "./components/Fifa/Fifa"
import Mecze from './components/Mecze/Mecze';
import { getAllTeams } from './api/lib/FifaAPI';
import { getAllMatches } from './api/lib/MatchesAPI';

function App() {
  const [all, setAll] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getAllMatches().then((res) => {
      const matchdata = res.data.data.matches;
      console.log(matchdata);
      setMatches(matchdata);
    });

    getAllTeams().then((res) => {
      const fifadata = res.data.data.teams;
      setAll(fifadata);
    });


  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Fifa all={all} matches={matches} />} />
            {/* <Route path="/*" element={<ErrorPage />} /> */}
            {/* <Route path="/fifa" element={<Fifa all={all} />} /> */}
            <Route path="/admin" element={<Mecze all={all} />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/eventLog" element={<EventLogPage />} />
            <Route path="/users" element={<ListUsers />} /> */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;