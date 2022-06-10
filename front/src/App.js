import React, {useEffect, useState} from 'react'
import './App.css';
import Fifa from "./components/Fifa/Fifa"
import { getAllFifa } from './api/lib/FifaAPI';

function App() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    
    getAllFifa().then((res) => {
      const fifadata = res.data.data.fifa;
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
