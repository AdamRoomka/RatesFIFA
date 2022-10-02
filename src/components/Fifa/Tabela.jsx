import React from 'react'
import "../css/tabelaUserow.css"

function Tabela({name, score, position}) {
  return (
    <>
        <tr>
            <td id='null'>{position}</td>
            <td id='pierwsza'>{name}</td>
            <td id='druga'>{score}</td>
        </tr>
    </>
  )
}

export default Tabela