import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Fifa from "./components/Fifa/Fifa"
import Mecze from './components/Admin/Mecze';
import ErrorPage from './components/ErrorPages/ErrorPage'
import { getAllTeams } from './api/lib/FifaAPI';
import { getAllMatches } from './api/lib/MatchesAPI';

function App() {
  const [all, setAll] = useState([]);
  const [matches, setMatches] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    getAllMatches().then((res) => {
      const matchdata = res.data.data.matches;
      setMatches(matchdata);
    });

    getAllTeams().then((res) => {
      const fifadata = res.data.data.teams;
      setAll(fifadata);
    });


  }, [render]);


  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Fifa all={all} matches={matches} />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/admin" element={<Mecze all={all} matches={matches} setRender={setRender} render={render} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
