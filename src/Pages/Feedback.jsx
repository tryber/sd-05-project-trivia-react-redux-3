import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { loadPlayerLocalStorage } from '../services/localStorage';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: loadPlayerLocalStorage().assertions,
    };
  }

  goto(to = '/') {
    const { history } = this.props;
    history.push(to);
  }

  render() {
    const { assertions } = this.state;
    return (
      <div className="container-header">
        <header>
          <Header />
          <p data-testid='feedback-total-question'>{assertions}</p>
        </header>
        {assertions >= 3 ? (
          <h3 data-testid="feedback-text">Mandou bem!</h3>
        ) : (
          <h3 data-testid="feedback-text">Podia ser melhor...</h3>
        )}
        <button
          data-testid="btn-play-again"
          onClick={() => {
            this.goto('/');
          }}
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={() => {
            this.goto('/ranking');
          }}
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
