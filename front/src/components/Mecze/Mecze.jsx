import React, { useState } from 'react'
import './match.css'

function Mecze({all}) {

  const [id1, setFlag1] = useState('')
  const [id2, setFlag2] = useState('')

  let flag1, flag2;    

    all.map((flag) => flag._id === id1 ? (flag1 = flag.code) : ('') || flag._id === id2 ? (flag2 = flag.code) : (''))



  return (
    <div>
      
        <form>

            <div className='margin'>
                {flag1 == null ? ('') :
                  (<img src={`https://countryflagsapi.com/png/${flag1}`} className='id1'/>)
                }
                {flag2 == null ? ('') :
                  (<img src={`https://countryflagsapi.com/png/${flag2}`} className='id2'/>)
                }
                <label for="team1" className='Text1'> I Drużyna </label>
                <select onChange={(e) => setFlag1(e.target.value)} id="team1" name="team1" className="Team1" required>
                  <option value=''> ---Wybierz--- </option>
                  {all.map((teams) => 
                  <option value={teams._id}> {teams.name}</option>)}
                </select>
                <label className='Text2'> II Drużyna </label>
                <select onChange={(e) => setFlag2(e.target.value)} id="team2" name="team2" className="Team2" required>
                  <option value=''> ---Wybierz--- </option>
                  {all.map((teams) => <option value={teams._id}>{teams.name}</option>)}
                </select>
                <label className='Text3'> Data </label>
                <input className='data' type="date" required/>
            </div>

            <input type="submit" className='button_zatwierdz' value="Zatwierdź" />
            
        </form>
    </div>
  )
}

export default Mecze