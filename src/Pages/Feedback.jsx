import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.goto = this.goto.bind(this);
  }
  
  goto(to = '/') {
    const { history } = this.props;
    history.push(to);
  }

  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
        </header>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={() => { this.goto(); }}
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={() => { this.goto('/ranking'); }}
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
