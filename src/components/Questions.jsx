import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';

import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
    this.changeColors = this.changeColors.bind(this);
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  changeColors() {
    const wrongAnswers = document.querySelectorAll('.wrong-answer');
    const correctAnswer = document.querySelector('.correct-answer');
    correctAnswer.classList.add('green');
    for (let i = 0; i < wrongAnswers.length; i += 1) {
      wrongAnswers[i].classList.add('red');
    };
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
                className="wrong-answer"
                key={answer.incorrect}
                onClick={() => this.changeColors()}
              >
                {answer.incorrect}
              </button>
            );
          }
          return (
            <button
              type="button"
              data-testid="correct-answer"
              key={answer.correct}
              className="correct-answer"
              onClick={() => this.changeColors()}
            >
              {answer.correct}
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

Questions.propTypes = {
  getQuestions: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
