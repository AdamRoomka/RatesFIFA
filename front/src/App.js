import React, {useEffect, useState} from 'react'
import './App.css';
import Fifa from "./components/Fifa/Fifa"
import { getAllTeams } from './api/lib/FifaAPI';

function App() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    
    getAllTeams().then((res) => {
      console.log(res.data.data.teams);
      const fifadata = res.data.data.teams;
      setAll(fifadata);
    });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Fifa 
          all={all}
        />
      </header>
    </div>
  );
}

export default App;
