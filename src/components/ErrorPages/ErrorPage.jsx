import React from 'react';
import { Link } from "react-router-dom";
import './error.css';

function ErrorPage() {
  return (
    <div className='errTable'>
      <h1 className='errText'>Error!</h1>

      <img className='error' src="https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif" alt="error" />
      <Link to="/" className='errButton'>Wróć spowrotem</Link>
    </div>
  )
}

export default ErrorPage