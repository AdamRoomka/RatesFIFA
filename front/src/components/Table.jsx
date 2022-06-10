import React from 'react'
import TableList from './TableList'
import './table.css'

function Table(props) {
  return (
    <div style={{height:props.height, width:props.width, overflow:props.overflow,overflowX:props.overflowX }}>
        <table>
            <thead>
                <tr>
                    <th>Data:</th>
                    <th>Tipas</th>
                    <th>Gavėjas / mokėtojas</th>
                    {/* <th>Paskirtis</th> */}
                    {/* <th>Mokėjimo nr.</th> */}
                    {/* <th>Banko pažyma</th> */}
                    <th>Suma</th>
                </tr>
            </thead>
            <tbody>
            {props.all.map((data)=>
            <>
                <TableList
                key = {data._id}


                
                data = {data.data}
                type = {data.type}
                payer = {data.payer}
                purpose = {data.purpose}
                payment = {data.payment}
                statement = {data.statement}
                value = {data.value}
                />
            </>
            )}
            </tbody>
        </table>
    </div>
  )
}

export default Table