import React from 'react'
import './table.css'

function Fifa({all}) {
  return (
    <div>
      <table>
        <div>
          <tr><th>Group A</th></tr>
          {all.map((groupA) => groupA.group === "A" ? (<tr><td>{groupA.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group B</th></tr>
          {all.map((groupB) => groupB.group === "B" ? (<tr><td>{groupB.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group C</th></tr>
          {all.map((groupC) => groupC.group === "C" ? (<tr><td>{groupC.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group D</th></tr>
          {all.map((groupD) => groupD.group === "D" ? (<tr><td>{groupD.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group E</th></tr>
          {all.map((groupE) => groupE.group === "E" ? (<tr><td>{groupE.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group F</th></tr>
          {all.map((groupF) => groupF.group === "F" ? (<tr><td>{groupF.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group G</th></tr>
          {all.map((groupG) => groupG.group === "G" ? (<tr><td>{groupG.country}</td></tr>) : (<></>))}
        </div>
        <div>
          <tr><th>Group H</th></tr>
          {all.map((groupH) => groupH.group === "H" ? (<tr><td>{groupH.country}</td></tr>) : (<></>))}
        </div>
      </table>        
    </div>
)}

export default Fifa