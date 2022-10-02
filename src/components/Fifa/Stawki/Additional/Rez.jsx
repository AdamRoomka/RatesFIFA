import React from "react";
import "../../../css/rez.css";
import Guess from "./Guess";

function Rez({ name1, name2, score1, score2, code1, code2, data, guesses }) {
  var pozycja = 1;
  return (
    <>
      <div className="col-12 d-flex justify-content-center">
        <div className="rez-grid p-3">
          <img
            src={`https://countryflagsapi.com/png/${code1}`}
            alt={code1}
            className="w-25 flags"
          />
          <h4 className="team1Name">{name1}</h4>
          <h5 className="date">{data}</h5>
          <h4 className="team2Name">{name2}</h4>
          <h4 className="score">
            {score1} - {score2}
          </h4>
          <img
            src={`https://countryflagsapi.com/png/${code2}`}
            alt={code2}
            className="w-25 flags"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5 mt-2">
        <div className="tabela text-center">
          <tr>
            <th>#</th>
            <th>Imię i nazwisko</th>
            <th>Rezultat</th>
            <th>Punkty</th>
          </tr>

          {guesses &&
            guesses.map((guess) => (
              <Guess
                key={guess._id}
                pozycja={pozycja++}
                points={guess.points}
                score1={guess.score1}
                score2={guess.score2}
                userName={guess.userName}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Rez;
