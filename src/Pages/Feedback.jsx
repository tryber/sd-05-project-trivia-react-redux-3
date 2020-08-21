import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import { Button } from '../components/Inputs';

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

  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
        </header>
          <Button
            testId="btn-play-again"
            onClick={(ev) => { this.backToHome(ev); }}
          >
            Jogar novamente
          </Button>
          <Button
            type="button"
            testId="btn-ranking"
            onClick={(ev) => { this.goToRanking(ev); }}
          >
            Ver Ranking
          </Button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
