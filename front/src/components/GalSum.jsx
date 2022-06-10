import React, { useEffect, useState } from 'react'

function GalSum(props) {
  const [food, setFood] = useState({})
  
  useEffect(() =>{

    setFood(props.data.map((payment) => payment.payer.includes("MAXIMA")))
    
  }, [])

console.log(props.data.payer)

  return (
    <div>
      
    </div>
  )
}

export default GalSum