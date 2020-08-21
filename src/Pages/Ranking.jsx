import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../components/Inputs';

class Ranking extends React.Component {
  backToHome(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push('/');
  }
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Button
          testId="btn-play-again"
          onClick={(ev) => {
            this.backToHome(ev);
          }}
        >
          Home{' '}
        </Button>
      </div>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Ranking;
