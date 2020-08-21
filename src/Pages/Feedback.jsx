import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import { Button } from '../components/Inputs';

import { loadPlayerLocalStorage } from '../services/localStorage';

class Feedback extends React.Component {
  backToHome(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  goToRanking(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  }

  renderButtonJogarNovamente() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={(ev) => { this.backToHome(ev); }}
      >
        Jogar novamente
      </button>
    );
  }

  renderButtonRank() {
    return (
      <Button
        type="button"
        testId="btn-ranking"
        onClick={(ev) => { this.goToRanking(ev); }}
      >
        Ver Ranking
      </Button>
    );
  }

  render() {
    return (
      <div className="container-header">
        <Header />
        {this.renderButtonJogarNovamente()}
        {this.renderButtonRank()}
        <div>
          <span>Placar Final: </span>
          <span data-testid="feedback-total-score">{loadPlayerLocalStorage().score}</span>
          <span>Acertos: </span>
          <span data-testid="feedback-total-question">{loadPlayerLocalStorage().assertions}</span>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
