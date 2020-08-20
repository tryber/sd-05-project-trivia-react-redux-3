import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import GameHeader from './GameHeader';

class Game extends React.Component {
  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  render() {
    return (
      <div>
        <GameHeader />
        <button onClick={() => console.log(this.props.questions)}>teste</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
})

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  getQuestions: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
