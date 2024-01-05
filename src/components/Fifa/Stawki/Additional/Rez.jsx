import React from "react";
import "../../../css/rez.css";
import Guess from "./Guess";

function Rez({
  name1,
  name2,
  score1,
  score2,
  code1,
  code2,
  data,
  guesses,
  completed,
}) {
  var pozycja = 1;
  return (
    <>
      <div className="col-12 d-flex justify-content-center">
        <div className="rez-grid p-3">
          <h4 className="team1Name">{name1}</h4>
          <h5 className="date">{data}</h5>
          <h4 className="team2Name">{name2}</h4>
          <div className="score text-center">
            {!completed ? (
              <h5 className="live">Mecz trwa</h5>
            ) : (
              <>
                <p>
                  {score1} - {score2}
                </p>
                <h5 className="text-danger">Mecz skończony</h5>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5 mt-2">
        <div className="tabela text-center">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Imię i nazwisko</th>
                <th>Rezultat</th>
                <th>Punkty</th>
              </tr>
            </thead>
            <tbody>
              {guesses &&
                guesses.map((guess, index) => (
                  <Guess
                    key={index}
                    pozycja={pozycja++}
                    points={guess.points}
                    score1={guess.score1}
                    score2={guess.score2}
                    userName={guess.userName}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Rez;
