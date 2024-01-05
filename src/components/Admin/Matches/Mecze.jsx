import React, { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import ListaMeczow from "./ListaMeczow";
import KoniecMeczu from "./KoniecMeczu";
import StworzMatch from "./StworzMatch";
import ErrorPage from "../../ErrorPages/ErrorPage";
import "./match.css";

function Mecze({ allTeams, matches, render, setRender, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
  };

  return role !== "admin" ? (
    <>
      <ErrorPage />
    </>
  ) : (
    <>
      <div className="d-flex justify-content-center">
        <button
          onClick={toggleAddPopup}
          className="btn bg-secondary text-light m-4 border-0"
        >
          <RiAddFill className="text-center me-3" />
          <span>Stworzyć mecz</span>
        </button>
      </div>
      {isOpen && (
        <StworzMatch
          handlepopupClose={toggleAddPopup}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          allTeams={allTeams}
          setRender={setRender}
          render={render}
        />
      )}
      <form className="fill">
        {matches.map((match) =>
          !match.completed ? (
            <ListaMeczow
              key={match._id}
              matchId={match._id}
              team1={match.team1}
              team2={match.team2}
              time={match.time}
              date={match.date}
              completed={match}
              allTeams={allTeams}
              render={render}
              setRender={setRender}
            />
          ) : (
            <KoniecMeczu
              key={match._id}
              matchId={match._id}
              team1={match.team1}
              team2={match.team2}
              score1={match.score1}
              score2={match.score2}
              time={match.time}
              date={match.date}
              completed={match}
              allTeams={allTeams}
            />
          )
        )}
      </form>
    </>
  );
}

export default Mecze;
