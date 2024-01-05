import * as React from "react";
import Rez from "./Additional/Rez";

// Index
function Playoff_bets({ matchesGr }) {
  return (
    <div>
      <div className="container-fluid">
        <h3>Rezultaty wszystkich użytkowników:</h3>
        <div className="m-2">
          {matchesGr &&
            matchesGr.map((rez) => (
              <Rez
                key={rez._id}
                name1={rez.team1.name}
                name2={rez.team2.name}
                score1={rez.score1}
                score2={rez.score2}
                code1={rez.team1.code}
                code2={rez.team2.code}
                guesses={rez.guesses}
                data={rez.date}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Playoff_bets;
