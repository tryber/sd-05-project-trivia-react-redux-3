import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  render() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    if (questions.length) {
      return (
        <div>
          <button onClick={() => console.log(this.props.questions)}>teste</button>
          <div>
            <p data-testid="question-category">{questions[questionNumber].category}</p>
            <p data-testid="question-text">{questions[questionNumber].question}</p>
          </div>
        </div>
      );
    } return (
      <div>Carregando...</div>
    );
  }
}


const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  token: state.getToken.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Header.propTypes = {
  getQuestions: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
