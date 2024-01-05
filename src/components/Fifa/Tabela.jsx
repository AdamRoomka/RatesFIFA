// Tabela.jsx
import React from "react";
import "../css/tabelaUserow.css";

function Tabela({ name, score, position, isOnline }) {
  return (
    <tr>
      <td id="null">{position}</td>
      <td id="pierwsza">
        {isOnline ? (
          <span className="online-dot"></span>
        ) : (
          <span className="offline-dot"></span>
        )}
        {name}
      </td>
      <td id="druga">{score}</td>
    </tr>
  );
}

export default Tabela;
