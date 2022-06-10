import React from 'react'
import Flags from '../Flags/pl.svg'
import './table.css'

function Country({country, flag, group}) {
  return (
    <div className="A">
        <tr><th>Group A</th></tr>
        <tr><td>{country}</td></tr>
    </div>
  )
}

export default Country