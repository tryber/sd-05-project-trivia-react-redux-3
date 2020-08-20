import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      alternativas: [],
    };
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  renderAnswers() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div>
        {questions[questionNumber].answers.map((answer, index) => {
          if (Object.keys(answer)[0] === 'incorrect') {
            return (
              <button
                type="button"
                data-testid={`wrong-answer-${index}`}
                key={answer.incorrect}
              >
                {answer["incorrect"]}
              </button>
            );
          }
          return (
            <button
              type="button"
              data-testid="correct-answer"
              key={answer.correct}
            >
              {answer["correct"]}
            </button>
          );
        })}
      </div>
    );
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
          {this.renderAnswers()}
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
