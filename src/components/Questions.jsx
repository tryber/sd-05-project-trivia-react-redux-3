import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import { Button } from './Inputs';
import { addScore } from '../services/localStorage';

import './Questions.css';
import changeColors from '../services/changeColors';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
    this.computeScore = this.computeScore.bind(this);
    this.time = 30;
    this.timer = {};
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    const { questionNumber } = this.state;
    getQuestions(token);
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time === 0) {
        this.setState({ questionNumber: questionNumber + 1 });
      }
    }, 1000);
  }

  componentDidUpdate() {
    this.time = 30;
  }

  computeScore({ difficulty }) {
    switch (difficulty) {
      case 'easy':
        addScore(10 * this.time);
        break;
      case 'medium':
        addScore(10 * this.time * 2);
        break;
      default:
        addScore(10 * this.time * 3);
        break;
    }
    changeColors();
  }

  renderAnswers() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
        questions[questionNumber].answers.map((answer, index) => (
          Object.keys(answer)[0] === 'incorrect' ?
            (
              <Button
                testId={`wrong-answer-${index}`}
                key={answer.incorrect}
                className="wrong-answer"
                onClick={() => { changeColors(); }}
              >
                {answer.incorrect}
              </Button>
            ) : (
              <Button
                testId="correct-answer"
                key={answer.correct}
                className="correct-answer"
                onClick={() => { this.computeScore(questions[questionNumber]); }}
              >
                {answer.correct}
              </Button>
            )
        ))
    );
  }

  render() {
    const { questions, history } = this.props;
    const { questionNumber } = this.state;
    if (questions.length) {
      return (
        <div>
          <div>
            <p data-testid="question-category">{questions[questionNumber].category}</p>
            <p data-testid="question-text">{questions[questionNumber].question}</p>
          </div>
          {this.renderAnswers()}
          <Button
            // disabled={} refazer a lógica
            testId="btn-next"
            onClick={() => {
              if (questionNumber < questions.length - 1) {
                return this.setState({ questionNumber: questionNumber + 1 });
              }
              return history.push('/feedback');
            }}
          >
            Próxima
          </Button>
        </div>
      );
    }
    return <div>Carregando...</div>;
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
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
