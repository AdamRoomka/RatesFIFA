import React, {useState} from 'react'
import './table.css'

function Fifa({all}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
}
  return (
    <div>
      <table>
        <tbody>
          <tr><th>Group A</th></tr>
          {all.map((groupA) => groupA.group === "A" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupA.flag}`} alt={groupA.flag} className="flagSize" />{groupA.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group B</th></tr>
          {all.map((groupB) => groupB.group === "B" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupB.flag}`} alt={groupB.flag} className="flagSize" />{groupB.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group C</th></tr>
          {all.map((groupC) => groupC.group === "C" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupC.flag}`} alt={groupC.flag} className="flagSize" />{groupC.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group D</th></tr>
          {all.map((groupD) => groupD.group === "D" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupD.flag}`} alt={groupD.flag} className="flagSize" />{groupD.country}</td></tr>) : (<></>))}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr><th>Group E</th></tr>
          {all.map((groupE) => groupE.group === "E" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupE.flag}`} alt={groupE.flag} className="flagSize" />{groupE.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group F</th></tr>
          {all.map((groupF) => groupF.group === "F" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupF.flag}`} alt={groupF.flag} className="flagSize" />{groupF.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group G</th></tr>
          {all.map((groupG) => groupG.group === "G" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupG.flag}`} alt={groupG.flag} className="flagSize" />{groupG.country}</td></tr>) : (<></>))}
        </tbody>
        <tbody>
          <tr><th>Group H</th></tr>
          {all.map((groupH) => groupH.group === "H" ? (<tr><td><img src={`https://countryflagsapi.com/png/${groupH.flag}`} alt={groupH.flag} className="flagSize" />{groupH.country}</td></tr>) : (<></>))}
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

        
          <div className='wyniki'>
              <h4 className='flex text1'>Senegal</h4>
              <img className='flex image1 flagres' for="first" src={`https://countryflagsapi.com/png/sn`} alt="senegal" />
              
              <input className='number1' type="number" id='first'  placeholder='0' />
              <h2 className='vs'>:</h2>
              <input className='number2' type="number" placeholder='0' />

              <img className='flex image2 flagres' src={`https://countryflagsapi.com/png/nl`} alt="Holandia" />
              <h4 className='flex text2'>Holandia</h4>
          </div>
          <div className='wyniki'>
              <h4 className='flex text1'>Anglia</h4>
              <img className='flex image1 flagres' for="first" src={`https://countryflagsapi.com/png/gb-eng`} alt="Anglia" />
              
              <input className='number1' type="number" id='first'  placeholder='0' />
              <h2 className='vs'>:</h2>
              <input className='number2' type="number" placeholder='0' />

              <img className='flex image2 flagres' src={`https://countryflagsapi.com/png/ir`} alt="Iran" />
              <h4 className='flex text2'>Iran</h4>
          </div>
        <input type="submit" className='button_zatwierdz' value="Zatwierdź" />
        </form>
        }
    </div>
)}

export default Fifa