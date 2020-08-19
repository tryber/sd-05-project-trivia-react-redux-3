import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { getTriviaQuestions, getProfilePicture } from './services/Api';

import Home from './components/Home';
import Game from './components/Game';

export default function App() {
  /* Teste da API */
  getTriviaQuestions('8475959b2ccbaff0be84996c7bf673c0aefa3ac9263f5269cf5daa9e5b411cd1')
    .then((res) => {
      console.log(res);
    });
  getProfilePicture('illuminatis@evilzuck.hel')
    .then((res) => {
      console.log(res);
    });
  /*  Fim do teste da API */
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/gameplay" component={Game} />
      </Switch>
    </BrowserRouter>
  );
}
