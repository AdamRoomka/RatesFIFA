import React, { useEffect, useState } from 'react'
import './mecze.css';

function Mecze({all}) {
    
  return (
    <div>
        <form>

            <div className='margin'>
                <label className='Text1'> I Drużyna </label>
                <input className='Team1' type="text" />                    
                <label className='Text2'> II Drużyna </label>
                <input className='Team2' type="text" />
                <label className='Text3'> Data </label>
                <input className='data' type="text" />
            
            </div>

            <input type="submit" className='button_zatwierdz' value="Zatwierdź" />
            
        </form>
    </div>
  )
}

export default Mecze