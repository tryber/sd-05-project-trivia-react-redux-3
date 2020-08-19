import React from 'react';
import { connect } from 'react-redux';

import { loadTokenLocalStorage, saveRankingLocalStorage, loadRankingLocalStorage, savePlayerLocalStorage, loadPlayerLocalStorage } from '../services/localStorage';

class Game extends React.Component {
  teste() {
    saveRankingLocalStorage({
      name: 'nome-da-pessoa',
      score: 10,
      picture: 'url-da-foto',
    });
  }

  teste2() {
    saveRankingLocalStorage({
      name: 'nome-da-pessoa2',
      score: 10,
      picture: 'url-da-foto2',
    });
  }

  teste3() {
    savePlayerLocalStorage('playername', 'assertions', 'score', 'email');
    console.log(this.props.token);
    console.log(loadTokenLocalStorage());
    console.log(loadRankingLocalStorage());
    console.log(loadPlayerLocalStorage());
  }

  render() {
    return (
      <div>
        <h2>Tela do Jogo</h2>
        <button
          type="button"
          onClick={() => this.teste()}
        >
          Token
        </button>
        <button onClick={() => this.teste2()}>x</button>
        <button onClick={() => this.teste3()}>x</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
});

export default connect(mapStateToProps)(Game);
