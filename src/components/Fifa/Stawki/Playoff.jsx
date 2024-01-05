import React, { useState } from "react";
import Match from "./Additional/Match";
import Rez from "./Additional/Rez";
import { saveGuess } from "../../../api/lib/GuessApi";
import "../../css/table.css";

function Playoff({ matchesGr, availablePO }) {
  const [success, setSuccess] = useState(false);
  const guesses = [];

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

  const onSubmit = () => {
    var tmp = guesses.map((el) => {
      if (
        el.matchId !== undefined &&
        el.score1 !== undefined &&
        el.score2 !== undefined
      ) {
        return el;
      }
      return null;
    });
    var guessesData = {
      guesses: tmp.filter(Boolean),
    };
    var token = null;
    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("token");
    }
    saveGuess(guessesData, token).then(() => {
      setSuccess(true);
    });
  };

  let date = new Date();
  date.setDate(date.getDate());
  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes() + 5);
  let today = date.getTime();
  today = Math.floor(today / 1000);

  return !availablePO ? (
    <div className="fill text-center" id="matches">
      Loading..
    </div>
  ) : (
    <div>
      <div className="fill" id="matches">
        {matchesGr &&
          matchesGr.map((match) =>
            today >= match.due ? (
              <div className="m-2" key={match._id}>
                <Rez
                  key={match._id}
                  name1={match.team1.name}
                  name2={match.team2.name}
                  score1={match.score1}
                  score2={match.score2}
                  guesses={match.guesses}
                  data={match.date}
                  completed={match.completed}
                />
              </div>
            ) : (
              <Match
                key={match._id}
                name1={match.team1.name}
                name2={match.team2.name}
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

export default Playoff;
