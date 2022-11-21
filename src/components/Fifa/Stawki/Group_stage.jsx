import * as React from "react";
import Rez from "./Additional/Rez";
import Match from "./Additional/Match";
import { useState } from "react";
import "../../css/table.css";
import { saveGuess } from "../../../api/lib/GuessApi";

// Stawki
function Group_stage({ matchesGr }) {
  const [success, setSuccess] = useState(false);
  const [guesses] = useState([]);

  const getScore = (matchId, score1, score2) => {
    var guess = {};
    guess.matchId = matchId;
    guess.score1 = score1;
    guess.score2 = score2;

    if (guesses.length === 0) {
      guesses.push(guess);
    } else {
      var found = false;
      guesses.forEach((el) => {
        if (el.matchId === matchId) {
          found = true;
          el.score1 = score1;
          el.score2 = score2;
        }
      });
      if (!found) {
        guesses.push(guess);
      }
    }
  };

  function onSubmit() {
    var tmp = guesses.map((el) => {
      if (
        el.matchId !== undefined &&
        el.score1 !== undefined &&
        el.score2 !== undefined
      ) {
        return el;
      }
    });
    var guessesData = {
      guesses: tmp,
    };
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    saveGuess(guessesData, token).then(() => {
      setSuccess(true);
    });
  }

  let date = new Date();
  date.setDate(date.getDate());
  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes()+5);
  let today = date.getTime();
  today = Math.floor(today / 1000);

  return (
    <div>
      <div className="fill" id="matches">
        {matchesGr &&
          matchesGr.map((match) =>
            today >= match.due ? (
              <>
                <div className="m-2">
                  <Rez
                    key={match._id}
                    name1={match.team1.name}
                    name2={match.team2.name}
                    score1={match.score1}
                    score2={match.score2}
                    code1={match.team1.code}
                    code2={match.team2.code}
                    guesses={match.guesses}
                    data={match.date}
                  />
                </div>
              </>
            ) : (
              <>
                <Match
                  name1={match.team1.name}
                  name2={match.team2.name}
                  code1={match.team1.code}
                  code2={match.team2.code}
                  date={match.date}
                  time={match.time}
                  matchId={match._id}
                  data={match}
                  passScore={getScore}
                  guess1={
                    match.currentUserGuess === undefined
                      ? ""
                      : match.currentUserGuess.score1
                  }
                  guess2={
                    match.currentUserGuess === undefined
                      ? ""
                      : match.currentUserGuess.score2
                  }
                />
              </>
            )
          )}
        <div className="d-flex">
          <input
            type="submit"
            className="button_zatwierdz"
            value="Zatwierdź"
            onClick={onSubmit}
          />
          {success && (
            <div className="d-flex align-items-center text-success">
              *rezultaty wysłane
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Group_stage;
