import React, { useRef, useState } from "react";
import Rez from "./Additional/Rez";
import Match from "./Additional/Match";
import "../../css/table.css";
import { saveGuess } from "../../../api/lib/GuessApi";

function Group_stage({ matchesGr }) {
  const btnRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const getScore = (matchId, score1, score2) => {
    const guess = {
      matchId,
      score1,
      score2,
    };

    const existingGuess = guesses.find((el) => el.matchId === matchId);
    if (existingGuess) {
      existingGuess.score1 = score1;
      existingGuess.score2 = score2;
    } else {
      setGuesses((prevGuesses) => [...prevGuesses, guess]);
    }
  };

  const onSubmit = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }

    const tmp = guesses.filter(
      (el) =>
        el.matchId !== undefined &&
        el.score1 !== undefined &&
        el.score2 !== undefined
    );

    const guessesData = {
      guesses: tmp,
    };

    const token = window.localStorage.getItem("token");

    saveGuess(guessesData, token).then(() => {
      setSuccess(true);
      btnRef.current.removeAttribute("disabled");
    });
  };

  const date = new Date();
  date.setDate(date.getDate());
  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes() + 5);
  const today = Math.floor(date.getTime() / 1000);

  return (
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
            ref={btnRef}
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
