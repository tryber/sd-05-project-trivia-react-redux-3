import React from 'react';
import logo from '../trivia.png';
import Login from './Login';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <Login />
        </header>
      </div>
    );
  }
}

export default Home;
