import React from "react";
import "../../../css/guess.css";

function Guess({ points, score1, score2, userName, pozycja }) {
  return (
    <tr>
      <td>{pozycja}</td>
      <td>{userName}</td>
      <td>
        {score1} - {score2}
      </td>
      {points <= -1 ? (
        <td className="text-danger">{points}</td>
      ) : points >= 1 ? (
        <td className="text-success">+{points}</td>
      ) : (
        <td className="text-warning">{points}</td>
      )}
    </tr>
  );
}

export default Guess;
