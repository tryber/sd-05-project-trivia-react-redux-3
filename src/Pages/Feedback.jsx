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
      <div className="game">
        <Header />
        <div className="questions-container">
          <div
            rounded
            dark
            className="questions nes-container is-centered is-rounded"
          >
            <div data-testid="feedback-total-question" className="feedback-score">
              <div>{assertions}</div>
              <div className="nes-icon trophy"></div>
            </div>
            {assertions >= 3 ? (
              <h3 className="feedback-text" data-testid="feedback-text">Mandou bem!</h3>
            ) : (
              <h3 className="feedback-text" data-testid="feedback-text">Podia ser melhor...</h3>
            )}
            <button
              className="nes-btn is-error"
              data-testid="btn-play-again"
              onClick={() => {
                this.goto('/');
              }}
            >
              Jogar novamente
            </button>
            <hr/>
            <button
              className="nes-btn is-error"
              type="button"
              data-testid="btn-ranking"
              onClick={() => {
                this.goto('/ranking');
              }}
            >
              Ver Ranking
            </button>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
