import React from 'react'
import './table.css'

function Fifa({all}) {
  return (
    <div>
      <table>
        <tr><th>Group A</th></tr>
        <tr>{all.map((groupA) => groupA.group === "A" ? (<td>{groupA.country}</td>) : (<></>))}</tr>
        <tr><th>Group B</th></tr>
        <tr>{all.map((groupB) => groupB.group === "B" ? (<td>{groupB.country}</td>) : (<></>))}</tr>
        <tr><th>Group C</th></tr>
        <tr>{all.map((groupC) => groupC.group === "C" ? (<td>{groupC.country}</td>) : (<></>))}</tr>
        <tr><th>Group D</th></tr>
        <tr>{all.map((groupD) => groupD.group === "D" ? (<td>{groupD.country}</td>) : (<></>))}</tr>
        <tr><th>Group E</th></tr>
        <tr>{all.map((groupE) => groupE.group === "E" ? (<td>{groupE.country}</td>) : (<></>))}</tr>
        <tr><th>Group F</th></tr>
        <tr>{all.map((groupF) => groupF.group === "F" ? (<td>{groupF.country}</td>) : (<></>))}</tr>
        <tr><th>Group G</th></tr>
        <tr>{all.map((groupG) => groupG.group === "G" ? (<td>{groupG.country}</td>) : (<></>))}</tr>
        <tr><th>Group H</th></tr>
        <tr>{all.map((groupH) => groupH.group === "H" ? (<td>{groupH.country}</td>) : (<></>))}</tr>
      </table>        
    </div>
)}

export default Fifa