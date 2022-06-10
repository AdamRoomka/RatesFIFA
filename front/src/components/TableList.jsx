import React from 'react'

function TableList({data, type, payer, purpose, payment, statement, value}) {

  

  return (
    <>
      <tr>
        <td>{data === '' ? ('-'):(data)}</td>
        <td>{type === '' ? ('-'):(type)}</td>
        <td>{payer === '' || payer === null ? ('-'):(payer)}</td>
        {/* <td>{purpose === '' ? ('-'):(purpose)}</td> */}
        {/* <td>{payment === '' || payment === null ? ('-'):(payment)}</td> */}
        {/* <td>{statement === '' ? ('-'):(statement)}</td> */}
        <td>{value === '' || value === null ? ('-'):(value)}</td>
    </tr>
    </>
  )
}

export default TableList