import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Game from './components/Game';
import Settings from './components/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/gameplay" component={Game} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}
