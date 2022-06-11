import React, {useState} from 'react'
import './table.css'

function Fifa({all, matches}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
}
  return (
    <div>
      <table>
        <tbody>
          <tr><th>Group A</th></tr>
          {all.map((groupA) => groupA.group === "A" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupA.code}`} alt={groupA.code} className="flagSize" />{groupA.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group B</th></tr>
          {all.map((groupB) => groupB.group === "B" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupB.code}`} alt={groupB.code} className="flagSize" />{groupB.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group C</th></tr>
          {all.map((groupC) => groupC.group === "C" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupC.code}`} alt={groupC.code} className="flagSize" />{groupC.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group D</th></tr>
          {all.map((groupD) => groupD.group === "D" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupD.code}`} alt={groupD.code} className="flagSize" />{groupD.name}</td></tr>) : (<></>))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr><th>Group E</th></tr>
          {all.map((groupE) => groupE.group === "E" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupE.code}`} alt={groupE.code} className="flagSize" />{groupE.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group F</th></tr>
          {all.map((groupF) => groupF.group === "F" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupF.code}`} alt={groupF.code} className="flagSize" />{groupF.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group G</th></tr>
          {all.map((groupG) => groupG.group === "G" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupG.code}`} alt={groupG.code} className="flagSize" />{groupG.name}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group H</th></tr>
          {all.map((groupH) => groupH.group === "H" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupH.code}`} alt={groupH.code} className="flagSize" />{groupH.name}</td></tr>) : (<></>))}
        </tbody>
      </table>  
      <button
          onClick={toggleAddPopup}
          className='button_dodawania'>
          <span>Stawki</span>
      </button>
    {isOpen &&
      <form className='fill'>

        <label for="fname">Podaj swoje imię:</label><br />
        <input type="text" id="fname" name="firstname" />

        <h3>Podaj wyniki i zatwierdź:</h3>

        {matches.map((match) =>
        <div className='wyniki'>
        
          {all.map((teams) =>
          match.team1 === teams._id ? 
          (
            <>
              <img className='flex image1 flagres' for="first" src={`https://countryflagsapi.com/png/${teams.code}`} alt={teams.code} />
              <h4 className='flex text1'>{teams.name}</h4>
            </>
          ) : ('')
          )}
              <div className="empty"></div>
              <input className='number1' type="number" id='first'  placeholder='0' />
              <h2 className='vs'>:</h2>
              <input className='number2' type="number" placeholder='0' />

          {all.map((teams) =>
          match.team2 === teams._id ? 
          (
            <>
              <h4 className='flex text1'>{teams.name}</h4>
              <img className='flex image1 flagres' for="first" src={`https://countryflagsapi.com/png/${teams.code}`} alt={teams.code} />
            </>
          ) : ('')
          )}
          </div>
        )}


        <input type="submit" className='button_zatwierdz' value="Zatwierdź" />
        </form>
        }
    </div>
)}

export default Fifa