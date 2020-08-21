import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Settings from './components/Settings';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/gameplay" component={Game} />
        <Route path="/settings" component={Settings} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/ranking" component={Ranking} />
      </Switch>
    </BrowserRouter>
  );
}
