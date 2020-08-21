import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  backToHome(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={(ev) => { this.backToHome(ev); }}
          >
            Jogar novamente
          </button>
        </header>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
