import React from "react";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Group_stage from "./Stawki/Group_stage";
import Group_stage_bets from "./Stawki/Group_stage_bets";
import Playoff from './Stawki/Playoff'
import Playoff_bets from './Stawki/Playoff_bets'
import { getAllMatchesGroup, getAllMatchesPlayoff } from "../../api/lib/MatchesAPI";

function Stawki({timer, setTimer}) {
  const [stage, setStage] = useState(true);
  const [matchesGr, setMatchesGr] = useState([]);
  const [matchesPO, setMatchesPo] = useState([]);
  const [loading, setloading] = useState();
  const [availablePO, setAvailablePo] = useState();

  useEffect(() => {
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    if (window.localStorage.getItem("token") == null) {
      window.location.assign("/Registracja");
    }
    getAllMatchesGroup(token).then((res) => {
      setloading(true);
      const matchdata = res.data.data.matches;
      setMatchesGr(matchdata);
    });
    getAllMatchesPlayoff(token).then((res) => {
      setAvailablePo(true);
      const matchdata = res.data.data.matches;
      setMatchesPo(matchdata);
    });
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
          <Group_stage_bets />
        ) : (
          matchesGr && 
          <Group_stage
            matchesGr={matchesGr}
          />
        )
        ) : (
          !availablePO ? (
            matchesGr && 
            <Playoff_bets
              matchesGr={matchesPO}
            />
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
