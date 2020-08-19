import React from 'react';
import { connect } from 'react-redux';

import { loadTokenLocalStorage, saveRankingLocalStorage, loadRankingLocalStorage, savePlayerLocalStorage, loadPlayerLocalStorage } from '../services/localStorage';

class Game extends React.Component {
  render() {
    return (
      <div>
        <h2>Tela do Jogo</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
});

export default connect(mapStateToProps)(Game);
