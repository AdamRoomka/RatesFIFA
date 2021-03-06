import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './match.css';
import { saveMatch } from "../../api/lib/MatchesAPI";
import ListaMeczow from './ListaMeczow';
function Mecze({all, matches, render, setRender}) {

  const [id1, setFlag1] = useState('')
  const [id2, setFlag2] = useState('')
  const [time, setTime] = useState('')

  let flag1, flag2;

    all.map((flag) => flag._id === id1 ? (flag1 = flag.code) : ('') || flag._id === id2 ? (flag2 = flag.code) : (''))

    const {
      register,
      handleSubmit
  } = useForm();

  const onSubmit = async (data) => {
        const postToMatches = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/api/v1/rates/matches/', postToMatches)

        await saveMatch(data).then(() => { setRender(!render) })
}



  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='margin'>
                {flag1 == null ? ('') :
                  (<img src={`https://countryflagsapi.com/png/${flag1}`} className='id1'/>)
                }
                {flag2 == null ? ('') :
                  (<img src={`https://countryflagsapi.com/png/${flag2}`} className='id2'/>)
                }
                <label htmlFor="team1" className='Text1'> I Drużyna </label>
                <select
                {...register('team1')}
                onChange={(e) => setFlag1(e.target.value)} id="team1" name="team1" className="Team1" required>
                  <option value=''> ---Wybierz--- </option>
                  {all.map((teams) => 
                  <option key={teams._id} value={teams._id}> {teams.name}</option>)}
                </select>
                <label className='Text2'> II Drużyna </label>
                <select 
                {...register('team2')}
                onChange={(e) => setFlag2(e.target.value)} id="team2" name="team2" className="Team2" required>
                  <option value=''> ---Wybierz--- </option>
                  {all.map((teams) => <option key={teams._id} value={teams._id}>{teams.name}</option>)}
                </select>
                <label className='Text3'> Data </label>
                <input 
                  {...register('time')}
                  className='data' 
                  type="date" 
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
            </div>

            <input type="submit" className='button_zatwierdz' value="Zatwierdź" />
            
        </form>
        <form className='fill'>

          {matches.map((match) => 

            <ListaMeczow 
              key={match._id}
              team1={match.team1}
              team2={match.team2}
              all={all}
            />

          )}

        </form>
    </>
  )
}

export default Mecze