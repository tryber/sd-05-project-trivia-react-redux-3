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

  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
          <Button
            data-testid="btn-play-again"
            onClick={(ev) => { this.backToHome(ev); }}
          >
            Jogar novamente
          </Button>
        </header>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Feedback;
