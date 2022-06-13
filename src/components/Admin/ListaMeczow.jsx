import React from 'react'

function ListaMeczow({team1, team2, all}) {
  return (
    <div>
        <div className='wyniki'>
            {all.map((teams) => 
              team1 === teams._id ? 
          (
            <>
              <img className='flex image1 flagres' htmlFor="first" src={`https://countryflagsapi.com/png/${teams.code}`} alt={teams.code} />
              <h4 className='flex text1'>{teams.name}</h4>
            </>
          ) : (''))}

              <div className="empty"></div>
              <input className='number1' type="number" id='first'  placeholder='0' />
              <h2 className='vs'>:</h2>
              <input className='number2' type="number" placeholder='0' />

          {all.map((teams) => team2 === teams._id ? 
                (
                  <>
                    <h4 className='flex text1'>{teams.name}</h4>
                    <img className='flex image1 flagres' htmlFor="first" src={`https://countryflagsapi.com/png/${teams.code}`} alt={teams.code} />
                  </>
                ) : (''))}
                  
                  
              <button className='btnEdit'>Edytowanie</button>
              <input type="submit" className='button_zatwierdz pozycja' value="Zatwierdź" />
        </div>
    </div>
  )
}

export default ListaMeczow