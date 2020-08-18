import React from 'react';
import logo from './trivia.png';
import './App.css';

import { getProfilePicture } from './services/Api';

export default function App() {
  
  /* Teste da API */
  getProfilePicture('luis@gmail.com')
    .then((res) => {
      console.log(res)
    });
  /*  Fim do teste da API */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  );
}
