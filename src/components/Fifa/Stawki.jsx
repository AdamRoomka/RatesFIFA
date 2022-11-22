import React from "react";
import { useEffect, useState } from "react";
import Group_stage from "./Stawki/Group_stage";
import LoandigPage from "./Stawki/LoandigPage";
import Playoff from './Stawki/Playoff'

function Stawki({matchesGr, matchesPO, loading, availablePO}) {
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
  function playoff(){setStage(false)}
  function group_stage(){setStage(true)}
  
  return (
    <>
      <div>
        <h2 className="m-4 text-center">{stage ? "Faza grupowa" : "Drabinka"}</h2>
        <button className="btn btn-dark m-2" onClick={group_stage}>Faza grupowa</button>
        <button className="btn btn-dark m-2" onClick={playoff}>Drabinka</button>
        {stage ? (
          !loading ? (
          matchesGr && 
          <LoandigPage />
        ) : (
          matchesGr && 
          <Group_stage
            matchesGr={matchesGr}
          />
        )
        ) : (
          !availablePO ? (
            matchesGr && 
            <LoandigPage />
          ) : (
            matchesGr && 
            <Playoff
              matchesGr={matchesPO}
            />
          )
        )}
      </div>
    </>
  );
}

export default Stawki;
