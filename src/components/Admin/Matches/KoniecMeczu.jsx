import React from "react";

function KoniecMeczu({ team1, team2, score1, score2, date, time }) {
  return (
    <div>
      <div className="wyniki">
        <>
          <h4 className="flex text1">{team1.name}</h4>
        </>
        <div className="empty"></div>
        <div className="timeAd">{time}</div>
        <div className="dateAd">{date}</div>
        <h2 className="number1" type="number" id="first" placeholder="0">
          {score1}
        </h2>
        <h2 className="vs">:</h2>
        <h2 className="number2" type="number" placeholder="0">
          {score2}
        </h2>
        <>
          <h4 className="flex text2">{team2.name}</h4>
        </>
      </div>
    </div>
  );
}

export default KoniecMeczu;
