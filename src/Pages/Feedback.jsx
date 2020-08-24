import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { loadPlayerLocalStorage } from '../services/localStorage';
import { Button } from '../components/Inputs';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
    };
  }

  componentDidMount() {
    const state = loadPlayerLocalStorage.assertions
    this.setState({ assertions: {state} });
  }

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

  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
        </header>
        {this.state >= 3 ? (
          <h3 data-testid="feedback-text">Mandou bem!</h3>
        ) : (
          <h3 data-testid="feedback-text">Podia ser melhor...</h3>
        )}
        <Button
          testId="btn-play-again"
          onClick={(ev) => {
            this.backToHome(ev);
          }}
        >
          Jogar novamente
        </Button>
        <Button
          type="button"
          testId="btn-ranking"
          onClick={(ev) => {
            this.goToRanking(ev);
          }}
        >
          Ver Ranking
        </Button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  assertions: PropTypes.number.isRequired,
};

export default Feedback;
