import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { endMatchRes, deleteMatches } from "../../../api/lib/MatchesAPI";

function ListaMeczow({ team1, team2, matchId, date, time, setRender, render }) {
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const handleUpdate = (e, matchId, score1, score2) => {
    e.preventDefault();
    if (score1 === "" || score2 === "") return;

    Swal.fire({
      title: "Sprawdź czy prawidłowo wpisany końcowy rezultat?",
      text: `${team1.name}  ${score1} : ${score2}  ${team2.name}`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cofnij",
      confirmButtonText: "Potwierdź",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Wasz mecz został skończony i obliczone są rezultaty!",
          icon: "success",
          confirmButtonText: "Ok!",
        });

        let scores = {
          score1: score1,
          score2: score2,
          completed: true,
        };

        endMatchRes(matchId, scores);
        setRender(render);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };
  const handleDelete = (e, matchId) => {
    e.preventDefault();
    Swal.fire({
      title: "Czy naprawdę chcesz usunąć mecz?",
      text: `${team1.name} - ${team2.name}`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cofnij",
      confirmButtonText: "Potwierdź",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Wasz mecz został usunięty!",
          icon: "success",
          confirmButtonText: "Ok!",
        });

        deleteMatches(matchId);
        setRender(render);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };
  return (
    <div>
      <div className="wyniki">
        <img
          className="flex image1 flagres"
          htmlFor="first"
          src={`https://countryflagsapi.com/png/${team1.code}`}
          alt={team1.code}
        />
        <h4 className="flex text1">{team1.name}</h4>
        <div className="empty"></div>
        <div className="timeAd">{time}</div>
        <div className="dateAd">{date}</div>
        <input
          className="number1 numer"
          type="number"
          id="first"
          onChange={(e) => setScore1(e.target.value)}
          placeholder="0"
        />
        <h2 className="vs">:</h2>
        <input
          className="number2 numer"
          type="number"
          onChange={(e) => setScore2(e.target.value)}
          placeholder="0"
        />
        <h4 className="flex text2">{team2.name}</h4>
        <img
          className="flex image1 flagres"
          htmlFor="first"
          src={`https://countryflagsapi.com/png/${team2.code}`}
          alt={team2.code}
        />
        <button className="btnEdit">Edytowanie</button>
        <button className="btnDelete" onClick={(e) => handleDelete(e, matchId)}>
          Usuwanie
        </button>
        <input
          type="submit"
          className="button_zatwierdz pozycja"
          value="Zatwierdź"
          onClick={(e) => handleUpdate(e, matchId, score1, score2)}
        />
      </div>
    </div>
  );
}

export default ListaMeczow;
