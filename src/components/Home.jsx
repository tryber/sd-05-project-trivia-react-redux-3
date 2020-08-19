import React from 'react';
import logo from '../trivia.png';
import ButtonJogar from './ButtonJogar';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <ButtonJogar />
        </header>
      </div>
    );
  }
}

export default Home;
