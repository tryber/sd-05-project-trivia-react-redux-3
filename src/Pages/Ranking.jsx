import React from 'react';
import PropTypes from 'prop-types';
import { loadRankingLocalStorage } from '../services/localStorage';
import unique from '../utils';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      rankList: loadRankingLocalStorage().sort(
        (a, b) => parseInt(b.score, 10) - parseInt(a.score, 10)
      ),
    };
  }

  backToHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { rankList } = this.state;
    return (
        <div className="rank-container">
          <h2 data-testid="ranking-title">Ranking</h2>
          <div className="rank-list">
            {rankList.map(({ name, picture, score }, index) => (
              <div className="rank-card" key={unique(name)}>
                <img
                  data-testid={`player-picture-${index}`}
                  alt="imagem do usuário"
                  src={picture}
                />
                <span data-testid={`player-name-${index}`}>{name}</span>
                <span data-testid={`player-score-${index}`}>{score}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="nes-btn"
            data-testid="btn-go-home"
            onClick={() => {
              this.backToHome();
            }}
          >
            Home
          </button>
        </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Ranking;
