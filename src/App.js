import React from 'react';
import logo from './trivia.png';
import './App.css';

import { getTriviaQuestions } from './services/Api';

export default function App() {
  /* Teste da API */
  getTriviaQuestions('8475959b2ccbaff0be84996c7bf673c0aefa3ac9263f5269cf5daa9e5b411cd1')
    .then((res) => {
      console.log(res);
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
