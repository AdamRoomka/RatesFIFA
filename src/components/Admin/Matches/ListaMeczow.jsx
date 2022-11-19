import React from 'react'

function ListaMeczow({team1, team2, date, time}) {
  return (
    <div>
        <div className='wyniki'>
            {/* {allTeams.map((teams) => 
              team1 === teams._id ? 
          ( */}
            <>
              <img className='flex image1 flagres' htmlFor="first" src={`https://countryflagsapi.com/png/${team1.code}`} alt={team1.code} />
              <h4 className='flex text1'>{team1.name}</h4>
            </>
          {/*  ) : (''))} */}

              <div className="empty"></div>
              <div className="timeAd">{time}</div>
              <div className="dateAd">{date}</div>
              <input className='number1' type="number" id='first'  placeholder='0' />
              <h2 className='vs'>:</h2>
              <input className='number2' type="number" placeholder='0' />

          {/* {allTeams.map((teams) => team2 === teams._id ? 
                ( */}
                  <>
                    <h4 className='flex text1'>{team2.name}</h4>
                    <img className='flex image1 flagres' htmlFor="first" src={`https://countryflagsapi.com/png/${team2.code}`} alt={team2.code} />
                  </>
                {/* ) : (''))} */}
                  
                  
              <button className='btnEdit'>Edytowanie</button>
              <button className='btnDelete'>Usuwanie</button>
              <input type="submit" className='button_zatwierdz pozycja' value="Zatwierdź" />
        </div>
    </div>
  )
}

export default ListaMeczow