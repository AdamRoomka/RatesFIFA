import React from "react";
import { useState } from "react";
import GroupStage from "./Stawki/Group_stage";
import Playoff from "./Stawki/Playoff";

function Stawki({ matchesGr, matchesPO, availablePO }) {
  const [stage, setStage] = useState(false);

  function playoff() {
    setStage(false);
  }
  function group_stage() {
    setStage(true);
  }

  return (
    <>
      <div>
        <h2 className="m-4 text-center">
          {stage ? "Faza grupowa" : "Drabinka"}
        </h2>
        <button className="btn btn-dark m-2" onClick={group_stage}>
          Faza grupowa
        </button>
        <button className="btn btn-dark m-2" onClick={playoff}>
          Drabinka
        </button>
        {stage
          ? matchesGr && <GroupStage matchesGr={matchesGr} />
          : matchesGr && <Playoff matchesGr={matchesPO} availablePO={availablePO} />}
      </div>
    </>
  );
}

export default Stawki;
